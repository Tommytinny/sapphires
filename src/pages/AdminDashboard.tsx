import React, { useState, useEffect } from 'react';
import { useRaids, RaidSession } from '../contexts/RaidContext';
import { Helmet } from 'react-helmet-async';
import RaidForm from '../components/RaidForm';
import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
  const { raids, addRaid, updateRaid, deleteRaid, loading: contextLoading } = useRaids();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingFormData, setEditingFormData] = useState<Omit<RaidSession, 'id'> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'completed'>('all');
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingError, setBookingError] = useState('');

  const formatDateTimeForInput = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16);
    } catch {
      return '';
    }
  };

  const handleFormSubmit = async (formData: Omit<RaidSession, 'id'>) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (editingId !== null) {
        await updateRaid(editingId, formData);
        setSuccessMessage('Raid session updated successfully!');
        setEditingId(null);
      } else {
        await addRaid(formData);
        setSuccessMessage('Raid session created successfully!');
      }
      closeForm();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to save raid session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setEditingFormData(null);
  };

  const handleEdit = (raid: RaidSession) => {
    setErrorMessage('');
    setSuccessMessage('');
    setEditingFormData({
      project_name: raid.project_name,
      status: raid.status,
      progress: raid.progress,
      likes: raid.likes,
      retweets: raid.retweets,
      comments: raid.comments,
      engagements: raid.engagements,
      started_at: formatDateTimeForInput(raid.started_at),
      estimated_end: formatDateTimeForInput(raid.estimated_end),
      twitter_link: raid.twitter_link || '',
      duration: raid.duration || '1 hour',
      package: raid.package || '12hrs',
      chain_id: raid.chain_id,
      token_address: raid.token_address,
    });
    setEditingId(raid.id);
    setIsFormOpen(true);
  };

  const handleOpenNewRaidForm = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setEditingFormData(null);
    setEditingId(null);
    setIsFormOpen(true);
  };

  // Redirect to login if no active session
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        if (!data?.session) {
          window.location.href = '/admin/login';
        } else {
          setCheckingAuth(false);
        }
      } catch (err) {
        console.error('Auth check error', err);
        if (mounted) setCheckingAuth(false);
      }
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) window.location.href = '/admin/login';
      else setCheckingAuth(false);
    });

    return () => {
      mounted = false;
      // unsubscribe listener
      // @ts-ignore
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      await supabase.auth.signOut();
      window.location.href = '/admin/login';
    } catch (err) {
      console.error('Logout error', err);
      setErrorMessage('Failed to log out. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this raid session?')) {
      setIsSubmitting(true);
      setErrorMessage('');
      try {
        await deleteRaid(id);
        setSuccessMessage('Raid session deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting raid:', error);
        setErrorMessage('Failed to delete raid session. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-700';
      case 'completed':
        return 'bg-blue-500/20 text-blue-700';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-700';
      default:
        return 'bg-gray-200/50 text-gray-600';
    }
  };

  // Filter -> Pagination logic
  const filteredRaids = raids.filter(r => {
    const q = searchQuery.trim().toLowerCase();
    const matchesName = q === '' || r.project_name.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesName && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredRaids.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRaids = filteredRaids.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) {
        console.error('Update booking error:', error);
        setErrorMessage('Failed to update booking status');
      } else {
        setSuccessMessage('Booking status updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        // Refresh bookings
        const { data } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });
        setBookings(data || []);
      }
    } catch (err) {
      console.error('Booking update error:', err);
      setErrorMessage('Failed to update booking status');
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      setBookingsLoading(true);
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Bookings fetch error:', error);
          setBookingError('Failed to load bookings');
        } else {
          setBookings(data || []);
        }
      } catch (err) {
        console.error('Booking fetch error:', err);
        setBookingError('Failed to load bookings');
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        fetchBookings();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-slate-100">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-[#117cb4] border-r-[#117cb4] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - SAPPHIRES</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-700 mb-2">Admin Dashboard</h1>
            <p className="text-gray-500">Manage and monitor active raid sessions</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/40 border border-gray-300 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {raids.filter(r => r.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Raids</div>
            </div>
            <div className="bg-white/40 border border-gray-300 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {raids.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white/40 border border-gray-300 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {raids.filter(r => r.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white/40 border border-gray-300 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-700">
                {raids.reduce((sum, r) => sum + r.engagements, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Engagements</div>
            </div>
          </div>

          {/* Bookings Notification Section */}
          {!bookingsLoading && bookings.length > 0 && (
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  📋 Booking Requests ({bookings.filter(b => b.status === 'pending').length})
                </h2>
                <span className="text-sm text-blue-600 font-medium">
                  {bookings.filter(b => b.status === 'pending').length} pending
                </span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {bookings.map(booking => (
                  <div key={booking.id} className="bg-white rounded-lg p-4 border border-blue-100 flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{booking.project_name}</p>
                      <p className="text-sm text-gray-600">
                        📱 {booking.twitter_handle} • 📦 {booking.package}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Contact: {booking.contact}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Link: <a href={booking.community_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {booking.community_link.substring(0, 50)}...
                        </a>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        booking.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateBookingStatus(booking.id, 'contacted')}
                          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Mark Contacted
                        </button>
                      )}
                      {booking.status !== 'completed' && (
                        <button
                          onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                          className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                          Done
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Raid Button + Logout + Filters */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenNewRaidForm}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-[#117cb4] hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + New Raid Session
              </button>
              <button
                onClick={handleLogout}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Logout
              </button>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project name..."
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Raid Form Modal */}
          {isFormOpen && (
            <RaidForm
              initialData={editingFormData}
              onSubmit={handleFormSubmit}
              onClose={closeForm}
              isSubmitting={isSubmitting}
              isEditing={editingId !== null}
            />
          )}

          {/* Raids Table */}
          <div className="bg-white/50 border border-gray-300 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/70 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Progress</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Likes</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">RTs</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Comments</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {/* Loading Indicator */}
                  {contextLoading ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center">
                        <div className="flex justify-center items-center">
                          <div className="relative w-8 h-8">
                            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-transparent border-t-[#117cb4] border-r-[#117cb4] rounded-full animate-spin"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : raids.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                        No raids created yet. Create one to get started!
                      </td>
                    </tr>
                  ) : (
                    paginatedRaids.map(raid => (
                      <tr key={raid.id} className="hover:bg-white/60 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-700">{raid.project_name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              raid.status
                            )}`}
                          >
                            {raid.status.charAt(0).toUpperCase() + raid.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-300 rounded-full h-2">
                              <div
                                className="bg-[#117cb4] h-2 rounded-full transition-all"
                                style={{ width: `${raid.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-700">{Math.floor(raid.progress)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{(raid.likes / 1000).toFixed(1)}K</td>
                        <td className="px-6 py-4 text-gray-700">{(raid.retweets / 1000).toFixed(1)}K</td>
                        <td className="px-6 py-4 text-gray-700">{(raid.comments / 1000).toFixed(1)}K</td>
                        <td className="px-6 py-4 text-gray-700 font-semibold">
                          {(raid.engagements / 1000).toFixed(1)}K
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(raid)}
                              disabled={isSubmitting}
                              className="px-3 py-1 rounded text-xs bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(raid.id)}
                              disabled={isSubmitting}
                              className="px-3 py-1 rounded text-xs bg-red-500/20 text-red-700 hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
          </div>
          {/* Pagination Controls */}
            {raids.length > 0 && (
              <div className="flex justify-end items-center gap-4 px-6 py-4 ">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-[#117cb4] text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
