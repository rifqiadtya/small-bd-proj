-- Run this in the Supabase SQL Editor

-- MEMORIES TABLE (for Annisa's personal memory)
CREATE TABLE memories (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read memories"
  ON memories FOR SELECT USING (true);

CREATE POLICY "Anyone can insert memories"
  ON memories FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update memories"
  ON memories FOR UPDATE USING (true) WITH CHECK (true);
