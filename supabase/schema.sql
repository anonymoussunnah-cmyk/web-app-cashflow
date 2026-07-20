-- Terra Machining — Cashflow app database schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL > New query).

-- =========================================================================
-- invoices: stores outgoing invoices (receivables)
-- =========================================================================
create table if not exists public.invoices (
  id            uuid primary key default gen_random_uuid(),
  invoice_no    text not null unique,
  customer      text not null,
  amount        numeric(15,2) not null default 0,
  date_sent     date not null,
  due_date      date not null,
  status        text not null default 'Unpaid'
                check (status in ('Unpaid', 'Paid', 'Partial', 'Overdue')),
  created_at    timestamptz not null default now()
);

-- Helpful index for sorting by sent date
create index if not exists invoices_date_sent_idx on public.invoices (date_sent desc);

-- =========================================================================
-- Enable Row Level Security and allow anonymous access (demo).
-- NOTE: tighten these policies before going to production.
-- =========================================================================
alter table public.invoices enable row level security;

drop policy if exists "Invoices are readable by everyone" on public.invoices;
create policy "Invoices are readable by everyone"
  on public.invoices for select
  using (true);

drop policy if exists "Invoices are insertable by everyone" on public.invoices;
create policy "Invoices are insertable by everyone"
  on public.invoices for insert
  with check (true);

-- =========================================================================
-- Seed sample data (optional)
-- =========================================================================
insert into public.invoices (invoice_no, customer, amount, date_sent, due_date, status)
values
  ('INV-2023-089', 'PT. Sumber Teknik',    3500000, '2023-09-15', '2023-10-15', 'Overdue'),
  ('INV-2023-092', 'CV. Maju Bersama',    12000000, '2023-10-02', '2023-11-01', 'Unpaid'),
  ('INV-2023-094', 'Bintang Makmur',      25000000, '2023-10-10', '2023-11-09', 'Partial'),
  ('INV-2023-085', 'Karya Sentosa Mulia',  8200000, '2023-09-05', '2023-10-05', 'Paid')
on conflict (invoice_no) do nothing;

-- =========================================================================
-- purchases: stores outgoing expenses (COGS, tools, supplier debt)
-- =========================================================================
create table if not exists public.purchases (
  id            uuid primary key default gen_random_uuid(),
  purchase_no   text not null unique,
  category      text not null,
  supplier      text not null,
  item_desc     text,
  amount        numeric(15,2) not null default 0,
  payment_type  text not null default 'Tunai (Cash)',
  due_date      date not null,
  status        text not null default 'Unpaid'
                check (status in ('Unpaid', 'Paid', 'Partial')),
  created_at    timestamptz not null default now()
);

create index if not exists purchases_due_date_idx on public.purchases (due_date asc);

alter table public.purchases enable row level security;

drop policy if exists "Purchases are readable by everyone" on public.purchases;
create policy "Purchases are readable by everyone"
  on public.purchases for select
  using (true);

drop policy if exists "Purchases are insertable by everyone" on public.purchases;
create policy "Purchases are insertable by everyone"
  on public.purchases for insert
  with check (true);

-- Seed sample upcoming dues (optional)
insert into public.purchases (purchase_no, category, supplier, item_desc, amount, payment_type, due_date, status)
values
  ('PRC-2023-1029', 'Material (Baja, Aluminium, etc)', 'PT Baja Makmur', 'Baja ST41', 4500000, 'Tempo 14 Hari', '2023-11-12', 'Unpaid'),
  ('PRC-2023-1030', 'Tools (Pahat Bubut, Endmill)', 'Toko Teknik Sentosa', 'Endmill & Pahat', 1250000, 'Tempo 14 Hari', '2023-11-18', 'Unpaid')
on conflict (purchase_no) do nothing;

-- =========================================================================
-- expenses: stores small daily operational cash outflows (not supplier debt)
-- =========================================================================
create table if not exists public.expenses (
  id          uuid primary key default gen_random_uuid(),
  category    text not null,
  amount      numeric(15,2) not null default 0,
  note        text,
  expense_date date not null default current_date,
  created_at  timestamptz not null default now()
);

create index if not exists expenses_date_idx on public.expenses (expense_date desc);

alter table public.expenses enable row level security;

drop policy if exists "Expenses are readable by everyone" on public.expenses;
create policy "Expenses are readable by everyone"
  on public.expenses for select
  using (true);

drop policy if exists "Expenses are insertable by everyone" on public.expenses;
create policy "Expenses are insertable by everyone"
  on public.expenses for insert
  with check (true);

-- =========================================================================
-- partners: stores customers and suppliers master data
-- =========================================================================
create table if not exists public.partners (
  id        uuid primary key default gen_random_uuid(),
  name      text not null,
  type      text not null default 'Customer'
            check (type in ('Customer', 'Supplier')),
  contact   text,
  terms     text not null default 'Cash',
  created_at timestamptz not null default now()
);

create index if not exists partners_name_idx on public.partners (name);

alter table public.partners enable row level security;

drop policy if exists "Partners are readable by everyone" on public.partners;
create policy "Partners are readable by everyone"
  on public.partners for select
  using (true);

drop policy if exists "Partners are insertable by everyone" on public.partners;
create policy "Partners are insertable by everyone"
  on public.partners for insert
  with check (true);

-- Seed sample partners (optional)
insert into public.partners (name, type, contact, terms)
values
  ('PT. Maju Jaya', 'Supplier', 'Budi (0812...)', 'Net 30'),
  ('CV. Teknik Abadi', 'Customer', 'Agus (0856...)', 'Cash'),
  ('Krakatau Steel', 'Supplier', 'Sales (021...)', 'Net 60')
on conflict do nothing;
