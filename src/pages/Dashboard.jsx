import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxRFill } from "react-icons/ri";
import {  Palette, Eye, Users } from "lucide-react"
import {
  FaPlus,FaRuler, FaEye, FaTwitter, FaFacebookF, FaInstagram, FaSignOutAlt, FaUserCircle, FaHandshake,FaHeart} from 'react-icons/fa';

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.name?.split('') || '';

  const totalMeasurements = 247;
  const activeStyles = 12;
  const thisMonthCount = 34;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[gray-50] text-black">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-[#E1EFE6] px-6 md:p-5">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
              <FaHandshake className="text-3xl text-black" />
            </div>
            <p className="text-gray-600 mt-1">Here's what you can do today</p>
          </div>

          <div className="flex items-center gap-3">
            <FaUserCircle className="text-3xl text-gray-600" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-800 font-semibold cursor-pointer"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>   
    
       {/* Main content */}      
      <div className="flex-1 p-6 md:p-10 ">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create */}
          <div className="rounded-lg p-6 border border-gray-300 transition-all duration-300 hover:shadow-lg hover:cursor-pointer hover:border-transparent">
            <div className=" mb-3 mt-6 flex items-center justify-between ">
              <FaRuler className="h-6 w-6 text-blue-600 "/>
              <div>
                <h5 className="text-lg font-bold mb-1">Add Measurement</h5>
                <p className="text-sm">Record new customer measurements</p>
              </div>
              <FaPlus className="h-5 w-5 text-gray-400" />
            </div>
            <div className='items-center justify-center mt-6'>
              <button
                onClick={() => navigate('/customers')}
                className=" mt-4 w-full bg-black justify-center items-center text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-950 transition"
              >
                <div>
                  <FaPlus className="inline-block mr-4 mb-1" />
                  New Measurement                
                </div>

              </button>              
            </div>

          </div>

          {/* View Styles */}
          <div
            className="rounded-lg p-6 border border-gray-300 transition-all duration-300 hover:shadow-lg hover:cursor-pointer hover:border-transparent"
          >
            <div className="mb-3 mt-6 flex items-center justify-between">
              <Palette className="h-6 w-6 text-blue-600" />
              <div>
                <h5 className="text-lg font-bold mb-1">View Styles</h5>
                <p className="text-sm">Available Styles</p>
              </div>
              <Eye className="h-5 w-5 text-gray-400" />
            </div>
            <div className="items-center justify-center mt-6">
              <button
                onClick={() => navigate('/styles')}
                className="mt-4 w-full bg-gray-300 justify-center items-center text-black px-4 py-2 rounded cursor-pointer hover:bg-gray-950 hover:text-white transition"
              >
                <div>
                  <FaEye className="inline-block mr-4 mb-1" />
                  Browse Styles
                </div>
              </button>
            </div>
          </div>


          {/* View History */}
          <div className="rounded-lg p-6 border border-gray-300 transition-all duration-300 hover:shadow-lg hover:cursor-pointer hover:border-transparent">
            <div className=" mb-3 mt-6 flex items-center justify-between">
              <Users className="h-6 w-6 text-blue-600"/>
              <div>
                <h5 className="text-lg font-bold mb-1">Saved Customers</h5>
                <p className="text-sm">View and manage customer profiles</p>
              </div>
              <Eye className="h-5 w-5 text-gray-400" />
            </div>
            <div className='items-center justify-center mt-6'>
              <button
                onClick={() => navigate('/SavedCustomers')}
                className=" mt-4 w-full bg-gray-300 justify-center items-center text-black px-4 py-2 rounded cursor-pointer hover:bg-gray-950 hover:text-white transition"
              >
                <div>
                  <Users className="inline-block mr-4 mb-1" />
                  View Customers
                </div>
    
              </button>              
            </div>

          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white shadow-sm p-5 rounded-lg text-center">
            <p className="text-gray-500">Total Measurements</p>
            <h3 className="text-3xl font-bold">{totalMeasurements}</h3>
          </div>

          <div className="bg-white shadow-sm p-5 rounded-lg text-center">
            <p className="text-gray-500">Active Styles</p>
            <h3 className="text-3xl font-bold">{activeStyles}</h3>
          </div>

          <div className="bg-white shadow-sm p-5 rounded-lg text-center">
            <p className="text-gray-500">This Month</p>
            <h3 className="text-3xl font-bold">{thisMonthCount}</h3>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#E1EFE6] border-t border-gray-200 mt-12">
        <div className="px-6 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fashion Measurement App</h3>
              <p className="text-gray-600 text-sm mb-4">
                Professional measurement and customer management system for tailors and fashion designers.
              </p>
              <div className="flex space-x-4 text-gray-600">
                <a href="#" className="hover:text-blue-500 text-xl">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-blue-700 text-xl">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-blue-600 text-xl">
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Add Measurement</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Browse Styles</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Customer List</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Fashion Measurement App. All rights reserved.</p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0 text-sm text-gray-500">
              <span>Made with</span>
              <span className="text-red-500"><FaHeart/></span>
              <span>for fashion designers worldwide</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
