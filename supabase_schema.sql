-- Run this in your Supabase SQL Editor to create the leads table
CREATE TABLE leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  second_phone TEXT,
  email TEXT,
  deposit_amount NUMERIC NOT NULL DEFAULT 0,
  manager TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Optional, but good practice)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access for now (since we don't have auth yet)
CREATE POLICY "Allow anonymous read/write" ON leads
  FOR ALL USING (true) WITH CHECK (true);
