-- 赞顿学堂：强制登录码首次绑定专项
-- 用法：复制整份 SQL 到 Supabase SQL Editor 执行。
--
-- 执行后效果：
-- 1. 前端必须调用 verify_access_code(input_code, input_system_type)。
-- 2. 登录码第一次进入哪个专项，就绑定哪个专项。
-- 3. 之后同一个码只能进入已绑定专项。
-- 4. 旧的一参数 verify_access_code(input_code) 会被禁用，防止前端 fallback 绕过专项绑定。

create extension if not exists pgcrypto with schema extensions;

alter table public.access_codes
add column if not exists bound_system_type text;

alter table public.access_codes
add column if not exists bound_at timestamptz;

create or replace function public.verify_access_code(
  input_code text,
  input_system_type text
)
returns table (
  access_code_id uuid,
  label text,
  bound_system_type text
)
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if input_system_type is null or length(trim(input_system_type)) = 0 then
    raise exception 'SYSTEM_TYPE_REQUIRED';
  end if;

  return query
  update public.access_codes
  set
    last_login_at = now(),
    bound_system_type = coalesce(access_codes.bound_system_type, input_system_type),
    bound_at = coalesce(access_codes.bound_at, now())
  where code_hash = encode(digest(input_code, 'sha256'), 'hex')
    and enabled = true
    and (
      access_codes.bound_system_type is null
      or access_codes.bound_system_type = input_system_type
    )
  returning id, access_codes.label, access_codes.bound_system_type;
end;
$$;

-- 禁用旧的一参数登录函数，避免前端 fallback 到旧函数后绕过专项绑定。
create or replace function public.verify_access_code(input_code text)
returns table (
  access_code_id uuid,
  label text
)
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  raise exception 'SYSTEM_TYPE_REQUIRED';
end;
$$;

create or replace function public.get_learning_progress(
  input_code text,
  input_system_type text
)
returns table (
  system_type text,
  lesson_id text,
  progress jsonb,
  completed boolean,
  score integer,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  code_id uuid;
begin
  if input_system_type is null or length(trim(input_system_type)) = 0 then
    raise exception 'SYSTEM_TYPE_REQUIRED';
  end if;

  select id into code_id
  from public.access_codes
  where code_hash = encode(digest(input_code, 'sha256'), 'hex')
    and enabled = true
    and (
      bound_system_type is null
      or bound_system_type = input_system_type
    );

  if code_id is null then
    raise exception 'INVALID_ACCESS_CODE_OR_SYSTEM';
  end if;

  return query
  select p.system_type, p.lesson_id, p.progress, p.completed, p.score, p.updated_at
  from public.learning_progress p
  where p.access_code_id = code_id
    and p.system_type = input_system_type
  order by p.updated_at desc;
end;
$$;

create or replace function public.save_learning_progress(
  input_code text,
  input_system_type text,
  input_lesson_id text,
  input_progress jsonb,
  input_completed boolean default false,
  input_score integer default null
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  code_id uuid;
begin
  if input_system_type is null or length(trim(input_system_type)) = 0 then
    raise exception 'SYSTEM_TYPE_REQUIRED';
  end if;

  select id into code_id
  from public.access_codes
  where code_hash = encode(digest(input_code, 'sha256'), 'hex')
    and enabled = true
    and (
      bound_system_type is null
      or bound_system_type = input_system_type
    );

  if code_id is null then
    raise exception 'INVALID_ACCESS_CODE_OR_SYSTEM';
  end if;

  insert into public.learning_progress (
    access_code_id,
    system_type,
    lesson_id,
    progress,
    completed,
    score,
    updated_at
  )
  values (
    code_id,
    input_system_type,
    input_lesson_id,
    coalesce(input_progress, '{}'::jsonb),
    coalesce(input_completed, false),
    input_score,
    now()
  )
  on conflict (access_code_id, system_type, lesson_id)
  do update set
    progress = excluded.progress,
    completed = excluded.completed,
    score = excluded.score,
    updated_at = now();
end;
$$;

grant execute on function public.verify_access_code(text, text) to anon, authenticated;
grant execute on function public.verify_access_code(text) to anon, authenticated;
grant execute on function public.get_learning_progress(text, text) to anon, authenticated;
grant execute on function public.save_learning_progress(text, text, text, jsonb, boolean, integer) to anon, authenticated;

-- 通知 Supabase/PostgREST 重新加载函数缓存。
notify pgrst, 'reload schema';
