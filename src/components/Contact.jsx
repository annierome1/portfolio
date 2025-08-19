import React, { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container px-5 py-10 mx-auto flex justify-center items-center flex-wrap">
        <div className="flex flex-col w-full md:py-8 mt-8 md:mt-0 text-center">
          <h2 className="text-purple-100 sm:text-4xl text-3xl mb-1 font-medium title-font">
            Contact Me
          </h2>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-2xl mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            
            <div className="mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows="6"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-900/50 border border-green-500 rounded-lg text-green-300">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-300">
                Failed to send message. Please try again or contact me directly via email.
              </div>
            )}
          </form>

          {/* Social Links */}
          <div className="mt-12 flex justify-center space-x-4">
            <a href="https://github.com/annierome1" className="text-purple-100 hover:text-purple-300 transition-colors duration-200">
              <AiFillGithub size="2em" />
            </a>
            <a href="https://www.linkedin.com/in/annie-rome-835644209/" className="text-purple-100 hover:text-purple-300 transition-colors duration-200">
              <FaLinkedinIn size="2em" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
