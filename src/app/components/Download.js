import React from 'react';

const Download = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-green-600 to-green-800 text-white" id="download">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Download Safe9ja Today</h2>
          <p className="text-xl text-green-100 mb-8">
            Join millions of Nigerians who trust Safe9ja for their personal safety
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a 
            href="https://play.google.com/store" 
            className="w-full md:w-auto bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3"
          >
            <img src="/api/placeholder/24/24" alt="Google Play" className="w-6 h-6" />
            <div className="text-left">
              <div className="text-sm">Get it on</div>
              <div className="text-lg font-bold">Google Play</div>
            </div>
          </a>

          <a 
            href="https://apps.apple.com" 
            className="w-full md:w-auto bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3"
          >
            <img src="/api/placeholder/24/24" alt="App Store" className="w-6 h-6" />
            <div className="text-left">
              <div className="text-sm">Download on the</div>
              <div className="text-lg font-bold">App Store</div>
            </div>
          </a>
        </div>

        <div className="mt-16 text-center">
          <p className="text-green-100 mb-4">Available across all devices</p>
          <div className="flex justify-center gap-8">
            <img src="/api/placeholder/280/560" alt="App Screenshot 1" className="w-[140px] h-[280px] rounded-xl shadow-lg" />
            <img src="/api/placeholder/280/560" alt="App Screenshot 2" className="hidden md:block w-[140px] h-[280px] rounded-xl shadow-lg" />
            <img src="/api/placeholder/280/560" alt="App Screenshot 3" className="hidden lg:block w-[140px] h-[280px] rounded-xl shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;