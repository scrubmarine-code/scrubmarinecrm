/**
 * ============================================
 * API ROUTE: /api/form-fields
 * Returns active form fields from database
 * ============================================
 */

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('form_fields')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching form fields:', error);
      return NextResponse.json(
        // Return default fields if database error
        [
          { id: '1', field_name: 'first_name', field_label: 'First Name', field_type: 'text', is_required: true, display_order: 1 },
          { id: '2', field_name: 'last_name', field_label: 'Last Name', field_type: 'text', is_required: true, display_order: 2 },
          { id: '3', field_name: 'email', field_label: 'Email', field_type: 'email', is_required: true, display_order: 3 },
          { id: '4', field_name: 'phone', field_label: 'Phone Number', field_type: 'tel', is_required: false, display_order: 4 },
        ]
      );
    }

    return NextResponse.json(data || []);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json([]);
  }
}
