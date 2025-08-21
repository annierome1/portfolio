import React, { useState } from 'react';

export default function FormSubmit({
  to,
  subject,
  formType = 'contact',    // 'contact' | 'inquiry' | 'general'
  buttonText = 'Submit',
  children,
  className = '',
  buttonClassName = ''
}) {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log('📬 Sending payload:', { to, subject, formType, data });

    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, formType, data }),
      });
      const text = await res.text();

      if (!res.ok) {
        console.error('❌ API error:', text);
        setStatus('error');
        return;            // **don't throw**—just bail out
      }

      console.log('✅ API success:', text);
      setStatus('success');
      e.target.reset();
    } catch (err) {
      console.error('🚨 Fetch failed:', err);
      setStatus('error');
    }
  };

  const formClass = `space-y-6 ${className}`.trim();

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      {children}

      <button 
        type="submit" 
        disabled={status === 'sending'}
        className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          buttonClassName || 'bg-[#e5dbf5] hover:bg-[#e5dbf5]/90 text-[#192234] hover:scale-105 shadow-lg hover:shadow-xl'
        } ${
          status === 'sending' ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {status === 'sending'
          ? 'Sending…'
          : status === 'success'
          ? 'Sent!'
          : status === 'error'
          ? 'Try Again'
          : buttonText}
      </button>
    </form>
  );
}
