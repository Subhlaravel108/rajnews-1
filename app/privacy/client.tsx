"use client"
import Layout from '@/components/layout/Layout';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#172C64] to-[#0A1A40] text-white py-6 md:py-8">
          <div className="news-container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-10 h-10 md:w-12 md:h-12 text-[#F0C24C]" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
              </div>
              {/* <p className="text-lg md:text-xl text-white/90">
                Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p> */}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="news-container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border border-gray-100 space-y-8">
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  At Rajasthan News, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-[#172C64]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                    <p>We may collect personal information that you voluntarily provide to us when you:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Register for an account</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Contact us through our contact form</li>
                      <li>Participate in surveys or contests</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                    <p>When you visit our website, we automatically collect certain information about your device, including:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>IP address</li>
                      <li>Browser type and version</li>
                      <li>Pages you visit</li>
                      <li>Time and date of your visit</li>
                      <li>Referring website addresses</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-[#172C64]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How We Use Your Information</h2>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Send you newsletters and updates (with your consent)</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Monitor and analyze usage patterns and trends</li>
                    <li>Detect, prevent, and address technical issues</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              {/* Data Security */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-[#172C64]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Data Security</h2>
                </div>
                <p className="text-gray-700">
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
                </p>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Cookies</h2>
                <p className="text-gray-700 mb-2">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
                <p className="text-gray-700">
                  However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
                <p className="text-gray-700">
                  We may use third-party services for analytics, advertising, and other purposes. These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <p className="text-gray-700 mb-2">You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              {/* Changes to This Policy */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-700">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>


            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPage;






