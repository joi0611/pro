-- 修复 Supabase RPC 函数找不到 digest() 的问题
-- 用法：复制整份 SQL 到 Supabase SQL Editor 执行。

create extension if not exists pgcrypto with schema extensions;

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
  return query
  update public.access_codes
  set last_login_at = now()
  where code_hash = encode(digest(input_code, 'sha256'), 'hex')
    and enabled = true
  returning id, access_codes.label;
end;
$$;

create or replace function public.get_learning_progress(
  input_code text,
  input_system_type text default null
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
  select id into code_id
  from public.access_codes
  where code_hash = encode(digest(input_code, 'sha256'), 'hex')
    and enabled = true;

  if code_id is null then
    raise exception 'INVALID_ACCESS_CODE';
  end if;

  return query
  select p.system_type, p.lesson_id, p.progress, p.completed, p.score, p.updated_at
  from public.learning_progress p
  where p.access_code_id = code_id
    and (input_system_type is null or p.system_type = input_system_type)
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
  select id into code_id
  from public.access_codes
  where code_hash = encode(digest(input_code, 'sha256'), 'hex')
    and enabled = true;

  if code_id is null then
    raise exception 'INVALID_ACCESS_CODE';
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

grant execute on function public.verify_access_code(text) to anon, authenticated;
grant execute on function public.get_learning_progress(text, text) to anon, authenticated;
grant execute on function public.save_learning_progress(text, text, text, jsonb, boolean, integer) to anon, authenticated;
