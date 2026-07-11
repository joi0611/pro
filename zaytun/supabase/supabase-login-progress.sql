-- 赞顿学堂 Supabase 登录码与学习进度基础表
-- 用法：复制整份 SQL 到 Supabase Dashboard > SQL Editor 执行。
-- 注意：数据库保存的是登录码 sha256 哈希，不保存明文登录码。

create extension if not exists pgcrypto;

create table if not exists public.access_codes (
  id uuid primary key default gen_random_uuid(),
  code_hash text not null unique,
  label text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  access_code_id uuid not null references public.access_codes(id) on delete cascade,
  system_type text not null,
  lesson_id text not null,
  progress jsonb not null default '{}'::jsonb,
  completed boolean not null default false,
  score integer,
  updated_at timestamptz not null default now(),
  unique (access_code_id, system_type, lesson_id)
);

alter table public.access_codes enable row level security;
alter table public.learning_progress enable row level security;

revoke all on public.access_codes from anon, authenticated;
revoke all on public.learning_progress from anon, authenticated;

create or replace function public.verify_access_code(input_code text)
returns table (
  access_code_id uuid,
  label text
)
language plpgsql
security definer
set search_path = public
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
set search_path = public
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
set search_path = public
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

with codes(code, label) as (
  values
    ('Za7qN2mK', '学生001'),
    ('rT5vP9xA', '学生002'),
    ('L3mQa8Zp', '学生003'),
    ('bN6yK2sV', '学生004'),
    ('H8pR4nQe', '学生005'),
    ('tX2aM7cL', '学生006'),
    ('W5kD9vSb', '学生007'),
    ('qF7zN3hY', '学生008'),
    ('M2rJ6pTa', '学生009'),
    ('cV9Lx4Qn', '学生010'),
    ('Y6sB2mKd', '学生011'),
    ('gP4tZ8vR', '学生012'),
    ('N7aQ3xLc', '学生013'),
    ('uK5M9pFw', '学生014'),
    ('D3vY6nRa', '学生015'),
    ('sH8qL2cT', '学生016'),
    ('P9mX4zVb', '学生017'),
    ('eR2K7aNq', '学生018'),
    ('J5cT8wLp', '学生019'),
    ('vZ6B3mQx', '学生020'),
    ('A8nF2rKy', '学生021'),
    ('hL4P9tVc', '学生022'),
    ('Q3xM7sBd', '学生023'),
    ('kY5R2nZa', '学生024'),
    ('T6vC9pLm', '学生025'),
    ('mD8qH4xN', '学生026'),
    ('B2zK7aRs', '学生027'),
    ('pW5L3tQy', '学生028'),
    ('X9cN6mVa', '学生029'),
    ('rA4Y8pKs', '学生030'),
    ('G7mT2vLq', '学生031'),
    ('nQ5Z9xCb', '学生032'),
    ('V3pR6aMd', '学生033'),
    ('dK8L2sYt', '学生034'),
    ('S4xB7nQp', '学生035'),
    ('zM6T9vRa', '学生036'),
    ('C2qP5kLx', '学生037'),
    ('wY8N3mVd', '学生038'),
    ('R7aL4zKp', '学生039'),
    ('fT9Q2xBn', '学生040'),
    ('K5vM8sYc', '学生041'),
    ('yP3D6nRa', '学生042'),
    ('L9xC4qVt', '学生043'),
    ('bR2K8mNs', '学生044'),
    ('Z5tY7pLq', '学生045'),
    ('qN4A9vCx', '学生046'),
    ('M8sD3kRt', '学生047'),
    ('cL6P2xYa', '学生048'),
    ('W9nQ5mVb', '学生049'),
    ('uX7R4tKp', '学生050')
)
insert into public.access_codes (code_hash, label)
select encode(digest(code, 'sha256'), 'hex'), label
from codes
on conflict (code_hash) do update set
  label = excluded.label,
  enabled = true;
