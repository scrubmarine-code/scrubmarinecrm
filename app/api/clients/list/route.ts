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
    const clients = await getClients();
    return NextResponse.json(clients);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}
