import React from 'react';
import { AlertTriangle, MapPin, Shield } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
      <Icon size={24} className="text-green-600" />
    </div>
    <h3 className="text-xl font-semibold text-green-600 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: "Instant SOS Alerts",
      description: "Send immediate emergency alerts with your precise location to trusted contacts and local authorities with just one tap."
    },
    {
      icon: MapPin,
      title: "Real-Time Location Tracking",
      description: "Share your live location with emergency contacts during critical situations, ensuring help reaches you quickly."
    },
    {
      icon: Shield,
      title: "Quick Police Reporting",
      description: "Report incidents directly to the nearest Police Public Relations Officer (PPRO) with verified contact information."
    }
  ];

  return (
    <section className="py-24 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Protecting What Matters Most
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save9ja provides essential features designed to keep you and your loved ones safe in emergency situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;