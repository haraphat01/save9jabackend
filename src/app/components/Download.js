import React from 'react';
import Image from 'next/image';
import login from '../../../public/login.jpg';
import dashboard from '../../../public/dashboard.jpg';
import profile from '../../../public/profile.jpg';

const Download = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white" id="download">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Download SafeAlert Today</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join millions of users worldwide who trust SafeAlert for their personal safety
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href="https://play.google.com/store"
            className="w-full md:w-auto bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3"
          >
            {/* Google Play Store Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
              <path fill="#ffffff" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.6 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
            </svg>
            <div className="text-left">
              <div className="text-sm">Get it on</div>
              <div className="text-lg font-bold">Google Play</div>
            </div>
          </a>
          <a
            href="https://apps.apple.com"
            className="w-full md:w-auto bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3"
          >
            {/* Apple App Store Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-6 h-6">
              <path fill="#ffffff" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <div className="text-left">
              <div className="text-sm">Download on the</div>
              <div className="text-lg font-bold">App Store</div>
            </div>
          </a>
        </div>
        <div className="mt-16 text-center">
          <p className="text-slate-300 mb-4">Available across all devices</p>
          <div className="flex justify-center gap-8">
            <div className="w-[140px] h-[280px] rounded-xl shadow-lg overflow-hidden relative">
              <Image 
                src={login} 
                alt="App Screenshot 1" 
                fill 
                style={{objectFit: 'cover'}} 
              />
            </div>
            <div className="hidden md:block w-[140px] h-[280px] rounded-xl shadow-lg overflow-hidden relative">
              <Image 
                src={dashboard} 
                alt="App Screenshot 2" 
                fill 
                style={{objectFit: 'cover'}} 
              />
            </div>
            <div className="hidden lg:block w-[140px] h-[280px] rounded-xl shadow-lg overflow-hidden relative">
              <Image 
                src={profile} 
                alt="App Screenshot 3" 
                fill 
                style={{objectFit: 'cover'}} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;