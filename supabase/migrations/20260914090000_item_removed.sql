-- Soft-remove user items. Row stays so events keep item_id.
-- Seed suggestions stay; park with later. No wipe.

alter table public.items add column if not exists removed boolean not null default false;
