import React from 'react';
import Image from 'next/image';
import { Shield, ArrowRight, AlertTriangle, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 to-black/80 z-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ 
          backgroundImage: "url('/hero-image.jpg')",
          animation: "slowly-move 20s ease-in-out infinite alternate"
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left Column - Text Content */}
          <div className="flex-1 text-white pt-8 lg:pt-0">
            <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield size={20} className="text-green-400 mr-2" />
              <span className="text-green-200 text-sm">Nigeria&apos;s #1 Safety App</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Personal
              <span className="block text-green-400">Safety Guardian</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              In today's world, your safety can't wait. SafeAlert provides instant emergency response, real-time tracking, and direct police contact – all in one powerful app. Because when seconds count, you need a reliable safety net.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">60%</div>
                <div className="text-gray-300 text-sm">Faster Emergency Response</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-gray-300 text-sm">Active Monitoring</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">98%</div>
                <div className="text-gray-300 text-sm">User Satisfaction</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#download" 
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl text-lg font-semibold transition-all duration-300 group"
              >
                Download Now
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#emergency" 
                className="inline-flex items-center justify-center px-8 py-4 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-white rounded-xl text-lg font-semibold transition-all duration-300"
              >
                <AlertTriangle size={20} className="mr-2" />
                Emergency Call
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { value: '1M+', label: 'Active Users' },
                { value: '24/7', label: 'Support Available' },
                { value: '98%', label: 'Response Rate' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - App Preview */}
          <div className="flex-1 relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
              <Image 
                src="/api/placeholder/300/600" 
                alt="SafeSchool App Interface" 
                width={300}
                height={600}
                className="rounded-3xl shadow-2xl border-8 border-black/80"
              />
              
              {/* Feature Highlights */}
              <div className="absolute -left-16 top-1/4 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <AlertTriangle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">SOS Alert</div>
                    <div className="text-sm text-gray-600">One-tap emergency</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-16 top-2/4 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin size={24} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Live Tracking</div>
                    <div className="text-sm text-gray-600">Real-time location</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
