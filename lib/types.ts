/**
 * ============================================
 * TYPESCRIPT TYPES
 * These define the shape of our data
 * ============================================
 */

// A client/customer who submitted the form
export interface Client {
  id: string;           // Unique ID (UUID)
  first_name: string;   // Customer's first name
  last_name: string;    // Customer's last name
  email: string;        // Customer's email address
  phone: string | null; // Customer's phone (optional)
  created_at: string;   // When they submitted (ISO date)
  updated_at: string;   // Last update time
}

// Settings that control the CRM appearance
export interface Settings {
  id: number;           // Always 1 (only one settings row)
  logo_url: string;     // URL to the logo image
  company_name: string; // Company name displayed
  tagline: string;      // Tagline under company name
  primary_color: string; // Brand color (hex code)
  updated_at: string;   // Last update time
}

// Form field definition - controls what fields appear on the form
export interface FormField {
  id: string;           // Unique ID
  field_name: string;   // Machine name (e.g., 'first_name')
  field_label: string;  // Human label (e.g., 'First Name')
  field_type: string;   // Input type: 'text', 'email', 'tel', etc.
  is_required: boolean; // Must user fill this?
  display_order: number; // Order on the form
  is_active: boolean;   // Show this field?
  created_at: string;   // When field was added
}

// Data submitted from the customer form
export interface ClientSubmission {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}
