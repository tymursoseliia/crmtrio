-- Выполни этот скрипт в SQL Editor в Supabase, чтобы обновить таблицу

-- 1. Удаляем старую колонку единой суммы
ALTER TABLE leads DROP COLUMN IF EXISTS deposit_amount;

-- 2. Добавляем новые колонки для каждой категории платежа
ALTER TABLE leads 
  ADD COLUMN IF NOT EXISTS amount_car NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS amount_customs NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS amount_scrap NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS amount_duty NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS amount_pledge NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS amount_other NUMERIC NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS whose_lead TEXT;
