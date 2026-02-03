-- ============================================
-- SCRUBMARINE CRM Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension for unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: clients
-- Stores all customer information submitted through the form
-- ============================================
CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);

-- Add index for date-based queries (recent submissions)
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);

-- ============================================
-- TABLE: settings
-- Stores configurable CRM settings (logo, branding, etc.)
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Only one row allowed
    logo_url TEXT DEFAULT '/logo.png',
    company_name TEXT DEFAULT 'SCRUBMARINE.CA',
    tagline TEXT DEFAULT 'HULL CLEANING • DIVING SERVICES',
    primary_color TEXT DEFAULT '#e53935',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (id, logo_url, company_name, tagline, primary_color)
VALUES (1, '/logo.png', 'SCRUBMARINE.CA', 'HULL CLEANING • DIVING SERVICES', '#e53935')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TABLE: form_fields
-- Tracks form fields for extensibility
-- When you add new fields to the form, log them here
-- ============================================
CREATE TABLE IF NOT EXISTS form_fields (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    field_name TEXT NOT NULL UNIQUE,
    field_label TEXT NOT NULL,
    field_type TEXT NOT NULL, -- 'text', 'email', 'tel', etc.
    is_required BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default form fields
INSERT INTO form_fields (field_name, field_label, field_type, is_required, display_order)
VALUES 
    ('first_name', 'First Name', 'text', true, 1),
    ('last_name', 'Last Name', 'text', true, 2),
    ('email', 'Email', 'email', true, 3),
    ('phone', 'Phone Number', 'tel', false, 4)
ON CONFLICT (field_name) DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- These control who can read/write data
-- ============================================

-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_fields ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert new clients (public form)
CREATE POLICY "Allow public to insert clients" ON clients
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Policy: Only authenticated users can read clients (admin)
CREATE POLICY "Allow authenticated to read clients" ON clients
    FOR SELECT TO authenticated
    USING (true);

-- Policy: Only authenticated users can update/delete clients
CREATE POLICY "Allow authenticated to update clients" ON clients
    FOR UPDATE TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated to delete clients" ON clients
    FOR DELETE TO authenticated
    USING (true);

-- Policy: Anyone can read settings (public logo, branding)
CREATE POLICY "Allow public to read settings" ON settings
    FOR SELECT TO anon, authenticated
    USING (true);

-- Policy: Only authenticated users can update settings
CREATE POLICY "Allow authenticated to update settings" ON settings
    FOR UPDATE TO authenticated
    USING (true);

-- Policy: Anyone can read form fields (public form needs to know fields)
CREATE POLICY "Allow public to read form fields" ON form_fields
    FOR SELECT TO anon, authenticated
    USING (true);

-- Policy: Only authenticated users can modify form fields
CREATE POLICY "Allow authenticated to modify form fields" ON form_fields
    FOR ALL TO authenticated
    USING (true);
