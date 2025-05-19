import React from 'react';
import { AlertTriangle, MapPin, Shield, Mic, Battery, ActivitySquare, Mail, Clock, Phone, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon size={24} className="text-green-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">{title}</h3>
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
      description: "Share your live location and address with emergency contacts during critical situations, ensuring help reaches you quickly."
    },
    {
      icon: Mic,
      title: "Environmental Recording",
      description: "Automatically records audio from your surroundings when SOS is activated, providing crucial context for emergency responders."
    },
    {
      icon: Battery,
      title: "Battery Status Monitoring",
      description: "Tracks and shares your device's battery level with emergency contacts, helping them know if your device might power down."
    },
    {
      icon: ActivitySquare,
      title: "Movement Detection",
      description: "Detects and reports if you're running, walking, or have fallen, giving emergency contacts better situational awareness."
    },
    {
      icon: Mail,
      title: "Email Notifications",
      description: "Sends comprehensive emergency information via email to all your designated emergency contacts instantly."
    },
    {
      icon: Shield,
      title: "Quick Police Reporting",
      description: "Report incidents directly to the nearest Police Public Relations Officer (PPRO) with verified contact information."
    },
    {
      icon: Clock,
      title: "Automatic Check-ins",
      description: "Set timed check-ins that automatically alert your contacts if you don't respond within a specified timeframe."
    },
    {
      icon: Phone,
      title: "Emergency Calling",
      description: "Quickly call emergency services while simultaneously alerting your emergency contacts with your situation details."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-6">
            <Shield size={20} className="text-green-600 mr-2" />
            <span className="text-green-800 text-sm font-medium">Why Choose SafeAlert</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why You Need SafeAlert
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            In today's unpredictable world, having a reliable safety solution isn't just an option – it's a necessity. SafeAlert provides comprehensive protection for you and your loved ones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Immediate Response</h3>
            <p className="text-gray-600 leading-relaxed">
              When seconds count, SafeAlert ensures help arrives faster. Our system connects you directly with emergency services and your trusted contacts in real-time.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Peace of Mind</h3>
            <p className="text-gray-600 leading-relaxed">
              Know that help is always just a tap away. Whether you're traveling, working late, or in an unfamiliar area, SafeAlert keeps you protected 24/7.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4">
              <Users size={24} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Safety</h3>
            <p className="text-gray-600 leading-relaxed">
              Keep your loved ones safe with real-time location sharing and instant alerts. Perfect for parents, caregivers, and anyone who wants to stay connected.
            </p>
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2 mb-6">
            <Shield size={20} className="text-blue-600 mr-2" />
            <span className="text-blue-800 text-sm font-medium">Comprehensive Protection</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Safety Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            SafeAlert provides essential features designed to keep you and your loved ones safe in emergency situations.
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