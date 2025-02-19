import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Safe9ja</h3>
            <p className="text-gray-400">Empowering Nigerians with immediate emergency response solutions.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#download" className="text-gray-400 hover:text-white transition">Download</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span>Emergency: 112</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span>support@Safe9ja.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Safe9ja. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;