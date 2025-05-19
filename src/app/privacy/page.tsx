import React from "react";
import { Shield, Lock, Database, Mail, Eye, Key } from "lucide-react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-6">
          <Lock size={20} className="text-green-600 mr-2" />
          <span className="text-green-800 text-sm font-medium">Privacy & Security</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Shield size={24} className="text-green-500" />
            Our Commitment to Privacy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            SafeAlert is committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, and safeguard your information to provide you with the best possible safety service.
          </p>
        </section>

        {/* Information Collection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Database size={24} className="text-blue-500" />
            Information We Collect
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              We collect personal data to provide our SOS emergency services effectively:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Mail, title: "Contact Information", desc: "Email, phone number, and emergency contacts" },
                { icon: Eye, title: "Location Data", desc: "Real-time location for emergency response" },
                { icon: Key, title: "Account Details", desc: "User preferences and settings" },
                { icon: Shield, title: "Device Information", desc: "Device type and operating system" }
              ].map((item, index) => (
                <li key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon size={20} className="text-green-500" />
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Data Usage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Shield size={24} className="text-purple-500" />
            How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your information is used solely for emergency response purposes and will not be shared with
            third parties without your consent. We use your data to:
          </p>
          <ul className="space-y-3">
            {[
              "Provide immediate emergency response",
              "Send alerts to your emergency contacts",
              "Improve our safety services",
              "Maintain account security"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Lock size={24} className="text-red-500" />
            Security Measures
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We implement robust security measures to protect your data:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "End-to-end encryption",
              "Secure data storage",
              "Regular security audits",
              "Access controls"
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield size={16} className="text-green-600" />
                </div>
                <span className="text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gray-50 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions About Privacy?</h3>
          <p className="text-gray-600">
            If you have any questions about our Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@SafeAlert.com" className="text-green-600 hover:text-green-500">
              privacy@SafeAlert.com
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
