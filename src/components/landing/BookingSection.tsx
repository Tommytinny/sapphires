import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const BookingSection = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    twitterHandle: '',
    communityLink: '',
    package: '',
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const packages = [
    { value: '1 Day (12 hours) - $80', label: '1 Day (12 hours) - $80' },
    { value: '2 Days (24 hours) - (negotiable)', label: '2 Days (24 hours) - (negotiable)' },
    { value: '3 Days (36 hours) - (negotiable)', label: '3 Days (36 hours) - (negotiable)' },
    { value: '4 Days (48 hours) - (negotiable)', label: '4 Days (48 hours) - (negotiable)' },
    { value: '5 Days (60 hours) - (negotiable)', label: '5 Days (60 hours) - (negotiable)' },
    { value: '1 Week (168 hours) - (negotiable)', label: '1 Week (168 hours) - (negotiable)' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      // Insert booking into Supabase
      {/*const { error } = await supabase
        .from('bookings')
        .insert([{
          project_name: formData.projectName,
          twitter_handle: formData.twitterHandle,
          community_link: formData.communityLink,
          package: formData.package,
          contact: formData.contact,
          status: 'pending',
          created_at: new Date().toISOString(),
        }]);

      if (error) {
        console.error('Booking insert error:', error);
        setSubmitError('Failed to save booking. Please try again.');
        setIsSubmitting(false);
        return;
      }*/}

      // Call API endpoint to send email to admin

      /*const { data, error } = await supabase.functions.invoke('send-booking', {
        body: { projectName: formData.projectName,
      twitterHandle: formData.twitterHandle,
      communityLink: formData.communityLink,
      packages: formData.package,
      contact: formData.contact, },
      });

      if (error) {
        console.error('Submission error:', error);
        setSubmitError('An unexpected error occurred. Please try again.');
      } else {
        setSubmitMessage('Booking submitted successfully! Admin will contact you soon.');
        setFormData({ projectName: '', twitterHandle: '', communityLink: '', package: '', contact: '' });
      }*/
      const res = await fetch(
  import.meta.env.VITE_SUPABASE_FUNCTION_URL,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      projectName: formData.projectName,
      twitterHandle: formData.twitterHandle,
      communityLink: formData.communityLink,
      package: formData.package,
      contact: formData.contact,
    }),
  }
);

      if (!res.ok) {
        console.warn('Email notification failed (booking saved)', await res.text());
        setSubmitMessage('Booking saved! Admin will review and contact you.');
      } else {
        setSubmitMessage('Booking submitted successfully! Admin will contact you soon.');
        setFormData({ projectName: '', twitterHandle: '', communityLink: '', package: '', contact: '' });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-16 md:py-24 bg-gradient-to-br from-white via-blue-50 to-slate-100 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-unbounded">
             <span className="text-gray-600">Book Your <span style={{ color: '#117cb4' }}>Raid Session</span></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-unbounded">
            Ready to boost your project's visibility? Fill out the form below and we'll get your raid session started within minutes.
          </p>
        </div>

        <div className="relative">
          <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2 font-unbounded">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                    style={{ '--tw-ring-color': '#117cb4' } as React.CSSProperties}
                    onFocus={(e) => {e.currentTarget.style.borderColor = '#117cb4'}}
                    onBlur={(e) => {e.currentTarget.style.borderColor = '#d1d5db'}}
                    placeholder="Enter your project name"
                  />
                </div>

                <div>
                  <label htmlFor="twitterHandle" className="block text-sm font-medium text-gray-700 mb-2 font-unbounded">
                    Twitter Handle *
                  </label>
                  <input
                    type="text"
                    id="twitterHandle"
                    name="twitterHandle"
                    value={formData.twitterHandle}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                    style={{ '--tw-ring-color': '#117cb4' } as React.CSSProperties}
                    onFocus={(e) => {e.currentTarget.style.borderColor = '#117cb4'}}
                    onBlur={(e) => {e.currentTarget.style.borderColor = '#d1d5db'}}
                    placeholder="@yourtwitterhandle"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="communityLink" className="block text-sm font-medium text-gray-700 mb-2 font-unbounded">
                  Tweet Link / Community Link *
                </label>
                <input
                  type="url"
                  id="communityLink"
                  name="communityLink"
                  value={formData.communityLink}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                  style={{ '--tw-ring-color': '#117cb4' } as React.CSSProperties}
                  onFocus={(e) => {e.currentTarget.style.borderColor = '#117cb4'}}
                  onBlur={(e) => {e.currentTarget.style.borderColor = '#d1d5db'}}
                  placeholder="https://twitter.com/... or https://t.me/..."
                />
              </div>

              <div>
                <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-2 font-unbounded">
                  Package Selection *
                </label>
                <select
                  id="package"
                  name="package"
                  value={formData.package}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none transition-all"
                  style={{ '--tw-ring-color': '#117cb4' } as React.CSSProperties}
                  onFocus={(e) => {e.currentTarget.style.borderColor = '#117cb4'}}
                  onBlur={(e) => {e.currentTarget.style.borderColor = '#d1d5db'}}
                >
                  <option value="">Select a package</option>
                  {packages.map(pkg => (
                    <option key={pkg.value} value={pkg.value}>
                      {pkg.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2 font-unbounded">
                  Telegram / Email Contact *
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                  style={{ '--tw-ring-color': '#117cb4' } as React.CSSProperties}
                  onFocus={(e) => {e.currentTarget.style.borderColor = '#117cb4'}}
                  onBlur={(e) => {e.currentTarget.style.borderColor = '#d1d5db'}}
                  placeholder="@telegramusername or email@example.com"
                />
              </div>

              {submitMessage && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  {submitMessage}
                </div>
              )}
              {submitError && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {submitError}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 font-unbounded font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#117cb4',
                    color: '#c5e0fa'
                  }}
                  onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#0d5a8f'}}
                  onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = '#117cb4'}}
                >
                  {isSubmitting ? 'Submitting...' : 'Book a Raid Session'}
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
