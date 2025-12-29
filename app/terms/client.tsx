"use client"
import Layout from '@/components/layout/Layout';
import { FileText, AlertCircle, BookOpen, Scale } from 'lucide-react';

const TermsPage = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#172C64] to-[#0A1A40] text-white py-6 md:py-8">
          <div className="news-container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-10 h-10 md:w-12 md:h-12 text-[#F0C24C]" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Terms of Service</h1>
              </div>
            
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="news-container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border border-gray-100 space-y-8">
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Please read these Terms of Service carefully before using Rajasthan News. By accessing or using our website, you agree to be bound by these terms.
                </p>
              </div>

              {/* Acceptance of Terms */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-[#172C64]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Acceptance of Terms</h2>
                </div>
                <p className="text-gray-700">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              {/* Use License */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-[#172C64]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Use License</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Permission is granted to temporarily download one copy of the materials on Rajasthan News for personal, non-commercial transitory viewing only.</p>
                  <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
                  <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Rajasthan News at any time.</p>
                </div>
              </div>

              {/* User Accounts */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">User Accounts</h2>
                <div className="space-y-2 text-gray-700">
                  <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                  <p>You are responsible for safeguarding the password and for all activities that occur under your account.</p>
                  <p>You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.</p>
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Content</h2>
                <div className="space-y-2 text-gray-700">
                  <p>Our website allows you to post, link, store, share, and otherwise make available certain information, text, graphics, or other material. You are responsible for the content that you post on or through the service.</p>
                  <p>You agree that the content you post:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Is accurate and not misleading</li>
                    <li>Does not violate any laws or regulations</li>
                    <li>Does not infringe on the rights of others</li>
                    <li>Is not offensive, defamatory, or harmful</li>
                  </ul>
                </div>
              </div>

              {/* Prohibited Uses */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-[#F05C03]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Prohibited Uses</h2>
                </div>
                <p className="text-gray-700 mb-2">You may not use our website:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>In any way that violates any applicable national or international law or regulation</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                  <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
                  <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                <p className="text-gray-700">
                  The service and its original content, features, and functionality are and will remain the exclusive property of Rajasthan News and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                </p>
              </div>

              {/* Disclaimer */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Disclaimer</h2>
                <p className="text-gray-700 mb-2">
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, Rajasthan News:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Excludes all representations, warranties, and conditions relating to our website and the use of this website</li>
                  <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700">
                  In no event shall Rajasthan News, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                </p>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
              </div>

           

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TermsPage;






