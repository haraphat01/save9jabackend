import React from "react";
import { Shield, AlertTriangle, FileText, CheckCircle } from "lucide-react";

const TermsOfService = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2 mb-6">
          <FileText size={20} className="text-blue-600 mr-2" />
          <span className="text-blue-800 text-sm font-medium">Legal Information</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600">Effective Date: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Shield size={24} className="text-green-500" />
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600 leading-relaxed">
            By using SafeAlert, you agree to these terms. If you do not agree, do not use the service.
            These terms constitute a legally binding agreement between you and SafeAlert.
          </p>
        </section>

        {/* Use of Service */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle size={24} className="text-yellow-500" />
            2. Use of Service
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              SafeAlert is provided for personal safety. Users must not misuse the service for false emergencies.
            </p>
            <ul className="space-y-3">
              {[
                "Use the service only for genuine emergency situations",
                "Provide accurate information when reporting incidents",
                "Maintain the security of your account",
                "Respect the privacy of other users"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Shield size={24} className="text-red-500" />
            3. Limitation of Liability
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We are not responsible for any failure of emergency communication due to technical issues or misuse.
            While we strive to provide reliable service, we cannot guarantee uninterrupted access or immediate response
            in all situations.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-gray-50 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions?</h3>
          <p className="text-gray-600">
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:support@SafeAlert.com" className="text-green-600 hover:text-green-500">
              support@SafeAlert.com
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
);

export default TermsOfService;
