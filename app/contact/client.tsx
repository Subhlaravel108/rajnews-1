"use client"
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Phone, Mail, Send, Facebook, Twitter, Instagram, Youtube, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CONTACT_INFO } from '@/lib/constants';
import { submitContactForm } from '@/lib/api';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Frontend validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    } else if (formData.email.trim().length > 255) {
      newErrors.email = 'Email must be less than 255 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Remove spaces, dashes, and parentheses for validation
      const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
      if (!/^[0-9]{10}$/.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      } else if (cleanPhone.length > 15) {
        newErrors.phone = 'Phone number must be less than 15 digits';
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    } else if (formData.subject.trim().length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }

    // Clear submit status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Frontend validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Backend validation and API call
      const result = await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/[\s\-\(\)]/g, ''), // Clean phone number
        subject: formData.subject.trim(),
        message: formData.message.trim()
      });

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        // Reset form
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setErrors({});
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 10000);
      } else {
        // Handle backend validation errors
        if (result.errors && Object.keys(result.errors).length > 0) {
          setErrors(result.errors as FormErrors);
        }
        setSubmitStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#172C64] to-[#0A1A40] text-white py-12 md:py-16">
        <div className="news-container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-lg md:text-xl text-white/90">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="news-container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you.</p>
              
              {/* Success/Error Message */}
              {submitStatus.type && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">{submitStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-white ${
                        errors.name 
                          ? 'border-red-500 focus-visible:ring-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-white ${
                        errors.email 
                          ? 'border-red-500 focus-visible:ring-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-white ${
                      errors.phone 
                        ? 'border-red-500 focus-visible:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="9876543210"
                    disabled={isSubmitting}
                    maxLength={15}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full bg-white ${
                      errors.subject 
                        ? 'border-red-500 focus-visible:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="What is this regarding?"
                    disabled={isSubmitting}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      {errors.subject}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    disabled={isSubmitting}
                    className={`w-full bg-white rounded-md border px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm resize-none ${
                      errors.message 
                        ? 'border-red-500 focus-visible:ring-red-500' 
                        : 'border-gray-300 focus-visible:ring-[#172C64]'
                    }`}
                    placeholder="Your message here..."
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message ? (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    ) : (
                      <span></span>
                    )}
                    <p className="text-xs text-gray-500">
                      {formData.message.length}/2000 characters
                    </p>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#F05C03] to-[#F0C24C] hover:from-[#F0C24C] hover:to-[#F05C03] text-white font-semibold px-8 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#F05C03] to-[#F0C24C] p-3 rounded-xl">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600 text-sm">
                      <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:text-[#F05C03] transition-colors">
                        {CONTACT_INFO.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#172C64] to-[#0A1A40] p-3 rounded-xl">
                    <Mail className="w-5 h-5 text-[#F0C24C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600 text-sm">
                      <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#F05C03] transition-colors break-all">
                        {CONTACT_INFO.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-[#F8F4E9] to-white rounded-2xl shadow-lg p-6 border border-[#172C64]/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-[#172C64] text-white rounded-xl hover:bg-[#F05C03] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-[#172C64] text-white rounded-xl hover:bg-[#F05C03] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-[#172C64] text-white rounded-xl hover:bg-[#F05C03] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-[#172C64] text-white rounded-xl hover:bg-[#F05C03] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {/* <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#172C64] to-[#0A1A40] p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">Find Us</h3>
              <p className="text-white/80 mt-1">Visit our office in Jaipur</p>
            </div>
            <div className="h-64 md:h-96 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-[#172C64] mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">123 News Street, Jaipur</p>
                  <p className="text-gray-500 text-sm mt-1">Map integration can be added here</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
      </div>
    </Layout>
  );
};

export default ContactPage;

