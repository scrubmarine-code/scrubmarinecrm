/**
 * ============================================
 * SUPABASE CLIENT
 * This connects our app to the Supabase database
 * ============================================
 * 
 * HOW IT WORKS:
 * - createClient() makes a connection to Supabase
 * - We use this to read/write data
 * - Environment variables store the secret keys
 */

import { createClient } from '@supabase/supabase-js';
import { Client, Settings, FormField } from './types';

// Get Supabase credentials from environment variables
// These are set in .env.local (NEVER commit that file!)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================
// DATABASE FUNCTIONS
// These make it easy to work with the database
// ============================================

/**
 * Get all clients from the database
 * Used in: Admin dashboard to show customer list
 */
export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false }); // Newest first

  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }

  return data || [];
}

/**
 * Add a new client to the database
 * Used in: Main form when customer submits
 */
export async function addClient(client: {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('clients')
    .insert([client]);

  if (error) {
    console.error('Error adding client:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Delete a client from the database
 * Used in: Admin dashboard
 */
export async function deleteClient(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting client:', error);
    return false;
  }

  return true;
}

/**
 * Get CRM settings (logo, colors, etc.)
 * Used in: Main page to show branding
 */
export async function getSettings(): Promise<Settings | null> {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }

  return data;
}

/**
 * Update CRM settings
 * Used in: Admin dashboard when admin changes logo/colors
 */
export async function updateSettings(settings: Partial<Settings>): Promise<boolean> {
  const { error } = await supabase
    .from('settings')
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq('id', 1);

  if (error) {
    console.error('Error updating settings:', error);
    return false;
  }

  return true;
}

/**
 * Get all form fields
 * Used in: Main page to build the form dynamically
 */
export async function getFormFields(): Promise<FormField[]> {
  const { data, error } = await supabase
    .from('form_fields')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching form fields:', error);
    return [];
  }

  return data || [];
}
