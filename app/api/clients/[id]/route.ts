/**
 * ============================================
 * API ROUTE: /api/clients/[id]
 * DELETE: Remove a client from the database
 * ============================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { deleteClient } from '@/lib/supabase';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const success = await deleteClient(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete client' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
