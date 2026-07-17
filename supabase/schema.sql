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
