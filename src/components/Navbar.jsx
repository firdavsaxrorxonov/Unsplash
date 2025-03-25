import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 🔄 useNavigate qo‘shildi
import { FaHeart } from "react-icons/fa6";
import { FaSun, FaMoon } from "react-icons/fa";
import NavLinks from './NavLinks';
import { useGlobalContext } from '../hooks/useGlobalContext';

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

function Navbar() {
  const [theme, setTheme] = useState(themeFromLocalStorage());
  const { likedImages } = useGlobalContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'synthwave' ? 'lemonade' : 'synthwave';
    setTheme(newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isAuthenticated");
    setUsername("");
    navigate("/login");
  };

  return (
    <header className='bg-base-200'>
      <div className='navbar max-w-[1600px] mx-auto px-5'>
        <div className="navbar-start">
          {username ? (
            <div className="relative flex items-center gap-2">
              <div
                className="hidden md:flex items-center gap-2 cursor-pointer relative"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg transition-all
                  ${theme === 'synthwave' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'} hover:opacity-80`}
                >
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className={`${theme === 'synthwave' ? 'text-white' : 'text-gray-800'} font-medium hover:opacity-80`}>
                  {username}
                </span>

                {isDropdownOpen && (
                  <ul className='absolute top-12 left-0 bg-base-100 rounded-box shadow-md w-40 p-2 px-5 z-10'>
                    <li>
                      <button onClick={handleLogout} className="w-full text-left text-red-500 hover:text-red-700 font-medium">
                        Log Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              <div
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  backgroundColor: theme === 'synthwave' ? '#374151' : '#D1D5DB',
                  color: theme === 'synthwave' ? '#FFFFFF' : '#374151',
                }}
              >
                {username.charAt(0).toUpperCase()}
              </div>

              {isDropdownOpen && (
                <ul className='absolute top-12 left-0 bg-base-100 rounded-box shadow-md w-40 p-2 px-5 z-10 md:hidden'>
                  <NavLinks />
                  <li>
                    <button onClick={handleLogout} className="w-full text-left text-red-500 hover:text-red-700 font-medium">
                      Log Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to='/'>
              <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            </Link>
          )}
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal rounded-box">
            <NavLinks />
          </ul>
        </div>

        <div className="navbar-end flex gap-3 items-center">
          <Link to='/liked'>
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-secondary">{likedImages.length}</span>
              <FaHeart className='w-6 h-6' />
            </div>
          </Link>

          <label className="swap swap-rotate">
            <input type="checkbox" checked={theme === 'synthwave'} onChange={toggleTheme} />
            <FaSun className='swap-off h-6 w-7 fill-current' />
            <FaMoon className='swap-on h-6 w-7 fill-current' />
          </label>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
