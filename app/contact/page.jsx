'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://formspree.io/f/xeevkqkr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-3">Contact Us</h1>
          <p className="text-gray-400">
            Questions, feedback, content corrections, or partnership inquiries — we are here.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
            <p className="text-4xl mb-3">✅</p>
            <h2 className="text-white font-bold text-xl mb-2">Message Received!</h2>
            <p className="text-gray-400 text-sm">
              Thank you for reaching out. We will get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject <span className="text-red-400">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full bg-[#0a1022] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors text-sm"
              >
                <option value="">Select a subject</option>
                <option value="content-error">Content Error / Correction</option>
                <option value="feedback">General Feedback</option>
                <option value="feature">Feature Request</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition-colors text-sm resize-none"
                placeholder="Write your message here..."
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-bold py-3 rounded-xl text-sm transition-colors"
            >
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
