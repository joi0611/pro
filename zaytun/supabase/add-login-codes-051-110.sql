-- Zjianaytun Academy: add 60 Supabase login codes, 051-110.
-- Usage: copy this whole file into Supabase Dashboard > SQL Editor, then Run.
-- These codes are stored as SHA-256 hashes in public.access_codes.

create extension if not exists pgcrypto with schema extensions;

with codes(code, label) as (
  values
    ('qVS9D3Ta', '学生051'),
    ('niB7dCZ2', '学生052'),
    ('dQPNYCr6', '学生053'),
    ('tuSN2w54', '学生054'),
    ('t6hfVxwR', '学生055'),
    ('h9F4TvX5', '学生056'),
    ('88YWEMkR', '学生057'),
    ('g6baGRaH', '学生058'),
    ('XKGz2uKa', '学生059'),
    ('jFXS4GBK', '学生060'),
    ('qPcBh3SK', '学生061'),
    ('L4RDmACa', '学生062'),
    ('rJzdhg5a', '学生063'),
    ('HLmMhi8o', '学生064'),
    ('xg33LEWL', '学生065'),
    ('BSSwC56P', '学生066'),
    ('t7sjoqtX', '学生067'),
    ('o54GsukM', '学生068'),
    ('s9qHxDwr', '学生069'),
    ('2imGzPwN', '学生070'),
    ('qqo9PGLQ', '学生071'),
    ('Nhi2QzET', '学生072'),
    ('drq7HccW', '学生073'),
    ('u9ZSuxW8', '学生074'),
    ('F74knVGJ', '学生075'),
    ('5LonFp4c', '学生076'),
    ('2HVUCTeD', '学生077'),
    ('9HbHUfPh', '学生078'),
    ('v57QHnPC', '学生079'),
    ('8cZNXAoM', '学生080'),
    ('zDPat7c4', '学生081'),
    ('KR6SPZNh', '学生082'),
    ('c5CRGEPT', '学生083'),
    ('bH8aJLZD', '学生084'),
    ('MjX4TRzB', '学生085'),
    ('B4GPoaq7', '学生086'),
    ('8TzNQ3uF', '学生087'),
    ('y4pbj46W', '学生088'),
    ('JaGfgd4t', '学生089'),
    ('uxrQF5DH', '学生090'),
    ('9TgBMHFK', '学生091'),
    ('qcQBq6Vz', '学生092'),
    ('GT8AHynH', '学生093'),
    ('Bvt7nLeH', '学生094'),
    ('YwLL9Bac', '学生095'),
    ('YoXMs4fb', '学生096'),
    ('G4Cdkw9S', '学生097'),
    ('JqM9LfCY', '学生098'),
    ('qqVcj4TY', '学生099'),
    ('2E8QcPRF', '学生100'),
    ('E2v2vpzb', '学生101'),
    ('8UFeneC6', '学生102'),
    ('Jguayg3b', '学生103'),
    ('L5yTUZXd', '学生104'),
    ('W7v6B4Vd', '学生105'),
    ('m7nkVeL8', '学生106'),
    ('wFTA7Gmh', '学生107'),
    ('xyEH3su2', '学生108'),
    ('dR7NVSG4', '学生109'),
    ('ggW6ZRMQ', '学生110')
)
insert into public.access_codes (code_hash, label, enabled)
select encode(digest(code, 'sha256'), 'hex'), label, true
from codes
on conflict (code_hash) do update set
  label = excluded.label,
  enabled = true;
