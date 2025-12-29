"use client"
import Layout from '@/components/layout/Layout';
import { AlertTriangle, Info, Shield } from 'lucide-react';

const DisclaimerPage = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#172C64] to-[#0A1A40] text-white py-6 md:py-8">
          <div className="news-container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-[#F0C24C]" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Disclaimer</h1>
              </div>
              
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="news-container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border border-gray-100 space-y-8">
              
              {/* General Disclaimer */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-6 h-6 text-[#172C64]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">General Disclaimer</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, Rajasthan News excludes all representations, warranties, conditions, and terms relating to our website and the use of this website.
                  </p>
                  <p>
                    While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose.
                  </p>
                </div>
              </div>

              {/* News Content Disclaimer */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-[#172C64]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">News Content Disclaimer</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Rajasthan News strives to provide accurate and timely news coverage. However, we cannot guarantee the accuracy, completeness, or timeliness of all information published on our website.
                  </p>
                  <p>
                    News stories may contain opinions, analysis, and commentary that reflect the views of the authors and not necessarily those of Rajasthan News as an organization.
                  </p>
                  <p>
                    Breaking news and developing stories are subject to change as more information becomes available. We encourage readers to verify information through multiple sources.
                  </p>
                </div>
              </div>

              {/* Third-Party Content */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Third-Party Content</h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with Rajasthan News. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                  </p>
                  <p>
                    The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                  </p>
                  <p>
                    We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                  </p>
                </div>
              </div>

              {/* Accuracy of Information */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Accuracy of Information</h2>
                <p className="text-gray-700">
                  While we use reasonable efforts to include accurate and up-to-date information on this website, errors or omissions may occur. Rajasthan News does not warrant or make any representations regarding the use, validity, accuracy, or reliability of, or the results of the use of, or otherwise respecting, the materials on this website or any sites linked to this site.
                </p>
              </div>

              {/* Financial Information */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Financial Information Disclaimer</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-gray-800 font-semibold mb-2">Important Notice</p>
                  <p className="text-gray-700">
                    Any financial information, stock market data, or investment advice published on this website is for informational purposes only and should not be considered as financial advice. Always consult with a qualified financial advisor before making any investment decisions.
                  </p>
                </div>
                <p className="text-gray-700">
                  We are not responsible for any financial losses that may occur from decisions made based on information provided on our website.
                </p>
              </div>

              {/* Medical Information */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Medical Information Disclaimer</h2>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <p className="text-gray-800 font-semibold mb-2">Medical Advice Warning</p>
                  <p className="text-gray-700">
                    Any health or medical information on this website is provided for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                  </p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 mb-2">
                  In no event will Rajasthan News be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits, arising out of, or in connection with, the use of this website.
                </p>
                <p className="text-gray-700">
                  Every effort is made to keep the website up and running smoothly. However, Rajasthan News takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
                </p>
              </div>

              {/* User Responsibility */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">User Responsibility</h2>
                <p className="text-gray-700 mb-2">
                  It is your responsibility to evaluate the accuracy, completeness, and usefulness of any opinions, advice, services, or other information provided. All information on this website is provided "as is" with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information.
                </p>
              </div>

              {/* Changes to Disclaimer */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Changes to This Disclaimer</h2>
                <p className="text-gray-700">
                  We reserve the right to update, change, or replace any part of this Disclaimer by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website following the posting of any changes to this Disclaimer constitutes acceptance of those changes.
                </p>
              </div>

              

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DisclaimerPage;






