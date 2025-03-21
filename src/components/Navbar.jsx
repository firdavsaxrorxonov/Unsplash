import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FcStackOfPhotos } from "react-icons/fc";
import { FaHeart } from "react-icons/fa6";
import { FaSun, FaMoon } from "react-icons/fa";
import NavLinks from './NavLinks'
import { useGlobalContext } from '../hooks/useGlobalContext';

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "winter"
}

function Navbar() {
  const [theme, setTheme] = useState(themeFromLocalStorage());
  const { likedImages } = useGlobalContext()


  const toggleTheme = () => {
    const newTheme = theme === 'lemonade' ? 'synthwave' : 'lemonade';
    setTheme(newTheme);
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className='bg-base-200'>
      <div className='navbar max-w-[1600px] mx-auto px-5'>
        <div className="navbar-start">
          <Link to='/' className='hidden md:flex'>
            <FcStackOfPhotos className='w-10 h-10' />
          </Link>
          <div className="dropdown md:hidden">
            <div tabIndex={0} role='button'>
              <FcStackOfPhotos className='w-10 h-10' />
            </div>
            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <ul className="menu hidden md:flex menu-horizontal rounded-box">
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
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" checked={theme === 'synthwave'} onChange={toggleTheme} />

            {/* sun icon */}
            <FaSun className='swap-off h-6 w-7 fill-current' />

            {/* moon icon */}
            <FaMoon className='swap-on h-6 w-7 fill-current' />
          </label>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
