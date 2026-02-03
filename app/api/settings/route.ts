/**
 * ============================================
 * API ROUTE: /api/settings
 * Handles getting and updating CRM settings
 * ============================================
 * 
 * GET /api/settings
 * - Returns current settings (logo, colors, etc.)
 * 
 * PATCH /api/settings
 * - Updates settings (requires admin auth)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/supabase';

// GET: Fetch current settings
export async function GET() {
  try {
    const settings = await getSettings();

    if (!settings) {
      // Return default settings if none found
      return NextResponse.json({
        logo_url: '/logo.png',
        company_name: 'SCRUBMARINE.CA',
        tagline: 'HULL CLEANING • DIVING SERVICES',
        primary_color: '#e53935',
      });
    }

    return NextResponse.json(settings);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PATCH: Update settings (admin only)
export async function PATCH(request: NextRequest) {
  try {
    // Check admin password (simple auth)
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Update settings
    const success = await updateSettings({
      logo_url: body.logo_url,
      company_name: body.company_name,
      tagline: body.tagline,
      primary_color: body.primary_color,
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update settings' },
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
