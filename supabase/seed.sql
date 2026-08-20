-- =============================================================================
-- SEED — departments and query categories
--
-- CONTENT GOVERNANCE: this file contains ONLY structural taxonomy. Department
-- names are the official portfolio names named in the specifications; category
-- names are routing labels for the query form.
--
-- There is no achievement, statistic, date, scheme, quote or outcome anywhere
-- in this file, and there will not be one until verified research is supplied
-- (spec §36, docs/PHASE-0-AUDIT.md §H-7).
-- =============================================================================

-- The four public pillars get portals. The remaining portfolios are modelled
-- so they are never falsely omitted (master prompt §37) but carry no portal.
insert into departments (slug, name_en, name_ta, public_pillar, reference_code, sort_order)
values
  ('school-education',       'School Education',       'பள்ளிக் கல்வி',                       true,  'EDU', 1),
  ('tamil-development',      'Tamil Development',      'தமிழ் வளர்ச்சி',                      true,  'TML', 2),
  ('information-publicity',  'Information & Publicity','தகவல் மற்றும் விளம்பரம்',              true,  'INF', 3),
  ('mla-egmore',             'MLA · Egmore',           'சட்டமன்ற உறுப்பினர் · எழும்பூர்',      true,  'MLA', 4),
  ('archaeology',            'Archaeology',            'தொல்லியல்',                          false, 'ARC', 5),
  ('film-technology',        'Film Technology',        'திரைப்படத் தொழில்நுட்பம்',            false, 'FLM', 6),
  ('newsprint-control',      'Newsprint Control',      'செய்தித்தாள் கட்டுப்பாடு',            false, 'NPC', 7),
  ('stationery-printing',    'Stationery and Printing','எழுதுபொருள் மற்றும் அச்சிடுதல்',       false, 'STP', 8),
  ('government-press',       'Government Press',       'அரசு அச்சகம்',                        false, 'GPR', 9)
on conflict (slug) do nothing;

-- Query categories. Routing labels only — they describe what a citizen is
-- writing about, not what has been delivered.
insert into query_categories (department_id, slug, name_en, name_ta, sort_order)
select d.id, c.slug, c.name_en, c.name_ta, c.sort_order
from departments d
join (values
  ('school-education', 'admission',        'Admission',                  'சேர்க்கை',                      1),
  ('school-education', 'infrastructure',   'School infrastructure',      'பள்ளி உள்கட்டமைப்பு',           2),
  ('school-education', 'teaching-staff',   'Teaching staff',             'ஆசிரியர் பணியாளர்கள்',          3),
  ('school-education', 'student-welfare',  'Student welfare',            'மாணவர் நலன்',                   4),
  ('school-education', 'other',            'Other',                      'மற்றவை',                        9),

  ('tamil-development', 'language-use',    'Official language use',      'ஆட்சி மொழிப் பயன்பாடு',         1),
  ('tamil-development', 'publications',    'Publications and books',     'வெளியீடுகள் மற்றும் நூல்கள்',    2),
  ('tamil-development', 'research',        'Research and scholarship',   'ஆராய்ச்சி மற்றும் புலமை',        3),
  ('tamil-development', 'cultural',        'Cultural programmes',        'பண்பாட்டு நிகழ்ச்சிகள்',         4),
  ('tamil-development', 'other',           'Other',                      'மற்றவை',                        9),

  ('information-publicity', 'info-request','Information request',        'தகவல் கோரிக்கை',                1),
  ('information-publicity', 'media-access','Media accreditation',        'ஊடக அங்கீகாரம்',                2),
  ('information-publicity', 'correction',  'Correction request',         'திருத்தக் கோரிக்கை',            3),
  ('information-publicity', 'other',       'Other',                      'மற்றவை',                        9),

  ('mla-egmore', 'civic-works',            'Roads, water and civic works','சாலை, நீர் மற்றும் பொதுப் பணிகள்',1),
  ('mla-egmore', 'sanitation',             'Sanitation',                 'துப்புரவு',                     2),
  ('mla-egmore', 'street-lighting',        'Street lighting',            'தெரு விளக்கு',                  3),
  ('mla-egmore', 'certificates',           'Certificates and documents', 'சான்றிதழ்கள் மற்றும் ஆவணங்கள்',  4),
  ('mla-egmore', 'welfare',                'Welfare assistance',         'நல உதவி',                       5),
  ('mla-egmore', 'other',                  'Other',                      'மற்றவை',                        9)
) as c(dept_slug, slug, name_en, name_ta, sort_order)
  on c.dept_slug = d.slug
on conflict (department_id, slug) do nothing;

-- Site settings: structural defaults only.
insert into site_settings (key, value_json)
values
  ('locales', '["en","ta"]'::jsonb),
  ('default_locale', '"en"'::jsonb),
  ('query_attachment_max_bytes', '10485760'::jsonb)
on conflict (key) do nothing;
