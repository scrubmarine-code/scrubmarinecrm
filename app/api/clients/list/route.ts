/**
 * ============================================
 * API ROUTE: /api/clients/list
 * Returns all clients (for admin dashboard)
 * ============================================
 */

import { NextResponse } from 'next/server';
import { getClients } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('Fetching clients from database...');
    const clients = await getClients();
    console.log(`Found ${clients.length} clients`);
    return NextResponse.json(clients);
  } catch (error) {
    console.error('API Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients', details: String(error) },
      { status: 500 }
    );
  }
}
