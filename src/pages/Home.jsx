import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="relative min-h-[70vh] sm:min-h-screen">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full z-20 px-4 sm:px-8 py-4 bg-transparent backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">FMA</h1>

            {/* Hamburger Icon for mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden text-white text-2xl focus:outline-none"
            >
              ☰
            </button>

            {/* Desktop Menu */}
            <ul className="hidden sm:flex space-x-4">
              <li>
                <Link to="/styles" className="text-cyan-400 hover:text-white px-4 py-2">
                  Styles
                </Link>
              </li>
              <li>
                <Link to="/customers" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-white hover:underline px-4 py-2">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-white hover:underline px-4 py-2">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <ul className="flex flex-col sm:hidden mt-4 space-y-2">
              <li>
                <Link
                  to="/styles"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-cyan-400 hover:text-white bg-gray-800 rounded"
                >
                  Styles
                </Link>
              </li>
              <li>
                <Link
                  to="/customers"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-white hover:underline bg-gray-800 rounded"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-white hover:underline bg-gray-800 rounded"
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </nav>

        {/* Hero Image */}
        <div className="h-full w-full">
          <img
            src="/assets/heroimg.png"
            alt="Fashion Design"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>
    </div>
  );
}
