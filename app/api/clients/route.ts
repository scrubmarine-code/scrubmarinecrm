/**
 * ============================================
 * API ROUTE: /api/clients
 * Handles creating new clients (form submissions)
 * ============================================
 * 
 * POST /api/clients
 * - Receives form data from the customer
 * - Saves to Supabase database
 * - Returns success/error response
 */

import { NextRequest, NextResponse } from 'next/server';
import { addClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const body = await request.json();

    // Validate required fields
    if (!body.first_name || !body.last_name || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields: first_name, last_name, email' },
        { status: 400 }
      );
    }

    // Add the client to the database
    const result = await addClient({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone || null,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to save client' },
        { status: 500 }
      );
    }

    // Success! Return the saved client data
    return NextResponse.json(
      { success: true, message: 'Client added successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
