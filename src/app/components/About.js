import React from 'react';
import { Shield, Users, Phone, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '1M+', label: 'Active Users' },
    { icon: Clock, value: '24/7', label: 'Support' },
    { icon: Shield, value: '98%', label: 'Success Rate' },
    { icon: Phone, value: '100+', label: 'Police Stations' }
  ];

  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">
            About SafeAlert
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            SafeAlert is committed to revolutionizing personal safety worldwide. Our mission is to provide everyone with quick access to emergency services and a reliable connection to local law enforcement, making communities safer across the globe.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map(({ icon: Icon, value, label }, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Icon size={24} className="text-slate-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
              <div className="text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;