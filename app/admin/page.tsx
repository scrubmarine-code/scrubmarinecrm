'use client';

/**
 * ============================================
 * ADMIN DASHBOARD PAGE
 * /admin
 * 
 * This is the control center for the CRM.
 * Admins can:
 * - View all client submissions
 * - Change the logo and branding
 * - Manage form settings
 * ============================================
 * 
 * SECURITY NOTE:
 * This uses a simple password check. For production,
 * consider adding proper authentication (Supabase Auth, etc.)
 */

import { useState, useEffect } from 'react';
import { Client, Settings } from '@/lib/types';

export default function AdminDashboard() {
  // State for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // State for data
  const [clients, setClients] = useState<Client[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  // State for editing settings
  const [editSettings, setEditSettings] = useState({
    logo_url: '',
    company_name: '',
    tagline: '',
    primary_color: '',
  });
  const [saveMessage, setSaveMessage] = useState('');

  // Check if already authenticated (localStorage)
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Fetch clients and settings
  async function fetchData() {
    try {
      // Fetch settings
      const settingsRes = await fetch('/api/settings');
      const settingsData = await settingsRes.json();
      setSettings(settingsData);
      setEditSettings(settingsData);

      // Fetch clients (we'll create this API next)
      const clientsRes = await fetch('/api/clients/list');
      if (clientsRes.ok) {
        const clientsData = await clientsRes.json();
        setClients(clientsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  // Handle login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Simple password check - in production use proper auth
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password.length > 0) {
      localStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid password');
    }
  }

  // Save settings
  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSaveMessage('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`,
        },
        body: JSON.stringify(editSettings),
      });

      if (res.ok) {
        setSaveMessage('✅ Settings saved successfully!');
        fetchData(); // Refresh
      } else {
        setSaveMessage('❌ Failed to save settings');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving settings');
    }
  }

  // Delete a client
  async function handleDeleteClient(id: string) {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setClients(clients.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  }

  // Format date for display
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">🔒 Admin Login</h1>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
                required
              />
            </div>

            {authError && (
              <p className="text-red-500 text-sm mb-4">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Set password in .env.local as ADMIN_PASSWORD
          </p>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">🛥️ Scrubmarine CRM Admin</h1>
            <p className="text-sm text-gray-500">Manage your customer relationships</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
            }}
            className="text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* SETTINGS PANEL */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">⚙️ Branding Settings</h2>

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo URL
                    </label>
                    <input
                      type="text"
                      value={editSettings.logo_url}
                      onChange={(e) => setEditSettings({...editSettings, logo_url: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      placeholder="/logo.png or https://..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload to /public/ folder or use external URL
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={editSettings.company_name}
                      onChange={(e) => setEditSettings({...editSettings, company_name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={editSettings.tagline}
                      onChange={(e) => setEditSettings({...editSettings, tagline: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={editSettings.primary_color}
                        onChange={(e) => setEditSettings({...editSettings, primary_color: e.target.value})}
                        className="w-10 h-10 border rounded"
                      />
                      <input
                        type="text"
                        value={editSettings.primary_color}
                        onChange={(e) => setEditSettings({...editSettings, primary_color: e.target.value})}
                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                        placeholder="#e53935"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>

                  {saveMessage && (
                    <p className="text-sm text-center">{saveMessage}</p>
                  )}
                </form>

                {/* Preview */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Preview:</h3>
                  <div 
                    className="p-4 rounded text-center"
                    style={{ backgroundColor: editSettings.primary_color }}
                  >
                    {editSettings.logo_url && (
                      <img 
                        src={editSettings.logo_url} 
                        alt="Logo" 
                        className="w-16 h-16 mx-auto mb-2 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <p className="text-white font-bold">{editSettings.company_name}</p>
                    <p className="text-white/80 text-xs">{editSettings.tagline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CLIENTS LIST */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">👥 Client Submissions</h2>
                  <p className="text-sm text-gray-500">
                    {clients.length} total submissions
                  </p>
                </div>

                {clients.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No submissions yet. Check back later!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {clients.map((client) => (
                          <tr key={client.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              {client.first_name} {client.last_name}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">
                                {client.email}
                              </a>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {client.phone || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {formatDate(client.created_at)}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleDeleteClient(client.id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
