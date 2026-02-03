'use client';

/**
 * ============================================
 * MAIN LANDING PAGE
 * /
 * 
 * This is the customer-facing form page.
 * Features:
 * - Square logo image (configurable via admin)
 * - Dynamic form fields from database
 * - Saves submissions to Supabase
 * - Progress bar for multi-step feel
 * ============================================
 */

import { useState, useEffect } from 'react';
import { Settings, FormField } from '@/lib/types';

export default function Home() {
  // State for settings and form fields
  const [settings, setSettings] = useState<Settings>({
    id: 1,
    logo_url: '/logo.png',
    company_name: 'SCRUBMARINE.CA',
    tagline: 'HULL CLEANING • DIVING SERVICES',
    primary_color: '#e53935',
    updated_at: new Date().toISOString(),
  });

  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);

  // State for form data
  const [formData, setFormData] = useState<Record<string, string>>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  // State for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch settings and form fields on load
  useEffect(() => {
    async function fetchData() {
      try {
        // Get branding settings
        const settingsRes = await fetch('/api/settings');
        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          setSettings(settingsData);
        }

        // Get form fields (for future extensibility)
        const fieldsRes = await fetch('/api/form-fields');
        if (fieldsRes.ok) {
          const fieldsData = await fieldsRes.json();
          setFormFields(fieldsData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle form input changes
  function handleInputChange(fieldName: string, value: string) {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setSubmitMessage('Thank you! We will contact you soon.');
        // Clear form
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
        });
      } else {
        setSubmitSuccess(false);
        setSubmitMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  // Show success message after submission
  if (submitSuccess) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div 
          className="w-32 h-32 mb-6 flex items-center justify-center rounded-lg"
          style={{ backgroundColor: settings.primary_color }}
        >
          <img 
            src={settings.logo_url} 
            alt={settings.company_name}
            className="w-20 h-20 object-contain"
            onError={(e) => {
              // Show fallback SVG if image fails
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              (e.currentTarget.parentElement as HTMLElement).innerHTML = `
                <svg width="48" height="48" viewBox="0 0 64 64" fill="white">
                  <path d="M32 8L24 24H16L8 36H56L48 24H40L32 8Z"/>
                  <path d="M8 36V40C8 48 16 56 32 56C48 56 56 48 56 40V36H8Z"/>
                </svg>
              `;
            }}
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: settings.primary_color }}>
            ✅ Success!
          </h2>
          <p className="text-gray-600 mb-6">{submitMessage}</p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="px-6 py-2 rounded-md text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: settings.primary_color }}
          >
            Submit Another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      {/* SQUARE LOGO IMAGE - Configurable via Admin Dashboard */}
      <div 
        className="w-48 h-48 mb-8 flex items-center justify-center rounded-lg shadow-lg"
        style={{ backgroundColor: settings.primary_color }}
      >
        <img 
          src={settings.logo_url} 
          alt={settings.company_name}
          className="w-36 h-36 object-contain"
          onError={(e) => {
            // Fallback to SVG boat icon if image fails
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = e.currentTarget.parentElement as HTMLElement;
            parent.innerHTML = `
              <svg width="80" height="80" viewBox="0 0 64 64" fill="white">
                <path d="M32 8L24 24H16L8 36H56L48 24H40L32 8Z"/>
                <path d="M8 36V40C8 48 16 56 32 56C48 56 56 48 56 40V36H8Z"/>
              </svg>
              <div style="margin-top: 8px; color: white; font-size: 10px; text-align: center;">
                ${settings.company_name}
              </div>
            `;
          }}
        />
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="h-2 rounded-full w-1/5 transition-all"
              style={{ backgroundColor: settings.primary_color }}
            ></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="John"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50 outline-none transition-all text-gray-900 placeholder-gray-400"
                style={{ '--tw-ring-color': settings.primary_color } as React.CSSProperties}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50 outline-none transition-all text-gray-900 placeholder-gray-400"
                style={{ '--tw-ring-color': settings.primary_color } as React.CSSProperties}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50 outline-none transition-all text-gray-900 placeholder-gray-400"
                style={{ '--tw-ring-color': settings.primary_color } as React.CSSProperties}
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50 outline-none transition-all text-gray-900 placeholder-gray-400"
                style={{ '--tw-ring-color': settings.primary_color } as React.CSSProperties}
              />
            </div>

            {/* Error Message */}
            {submitMessage && !submitSuccess && (
              <div className="text-red-500 text-sm">{submitMessage}</div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-md font-medium text-white hover:opacity-90 transition-all focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                style={{ backgroundColor: settings.primary_color }}
              >
                {isSubmitting ? 'Submitting...' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
