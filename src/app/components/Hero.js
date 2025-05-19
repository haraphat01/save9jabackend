import React from 'react';
import Image from 'next/image';
import { Shield, ArrowRight, AlertTriangle, MapPin, Star, Users, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-black/80 to-black/90 z-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ 
          backgroundImage: "url('/hero-image.jpg')",
          animation: "slowly-move 20s ease-in-out infinite alternate"
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left Column - Text Content */}
          <div className="flex-1 text-white pt-8 lg:pt-0">
            <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 hover:bg-green-500/30 transition-all duration-300">
              <Shield size={20} className="text-green-400 mr-2" />
              <span className="text-green-200 text-sm">Nigeria&apos;s #1 Safety App</span>
              <div className="ml-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              Your Personal
              <span className="block text-green-400 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                Safety Guardian
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              In today's world, your safety can't wait. SafeAlert provides instant emergency response, real-time tracking, and direct police contact – all in one powerful app. Because when seconds count, you need a reliable safety net.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { value: '60%', label: 'Faster Emergency Response', color: 'from-red-500/20 to-red-600/20' },
                { value: '24/7', label: 'Active Monitoring', color: 'from-blue-500/20 to-blue-600/20' },
                { value: '98%', label: 'User Satisfaction', color: 'from-green-500/20 to-green-600/20' }
              ].map((stat, index) => (
                <div key={index} className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-300`}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#download" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              >
                Download Now
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#emergency" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 backdrop-blur-sm text-white rounded-xl text-lg font-semibold transition-all duration-300"
              >
                <AlertTriangle size={20} className="mr-2 group-hover:animate-pulse" />
                Emergency Call
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { value: '1M+', label: 'Active Users', icon: Users },
                { value: '24/7', label: 'Support Available', icon: Clock },
                { value: '98%', label: 'Response Rate', icon: Shield }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon size={20} className="text-green-400" />
                    <div className="text-2xl font-bold text-green-400">{stat.value}</div>
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - App Preview */}
          <div className="flex-1 relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
                <Image 
                  src="/api/placeholder/300/600" 
                  alt="SafeSchool App Interface" 
                  width={300}
                  height={600}
                  className="relative rounded-3xl shadow-2xl border-8 border-black/80"
                />
              </div>
              
              {/* Feature Highlights */}
              <div className="absolute -left-16 top-1/4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                    <AlertTriangle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">SOS Alert</div>
                    <div className="text-sm text-gray-600">One-tap emergency</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-16 top-2/4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                    <MapPin size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Live Tracking</div>
                    <div className="text-sm text-gray-600">Real-time location</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-r from-green-500/30 via-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
