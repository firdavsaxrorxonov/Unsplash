import React from 'react'
import { Link } from 'react-router-dom'
const navLinks = [
  {
    path: "/",
    text: "Home"
  },
  {
    path: "/devImages",
    text: "DevPics"
  },
]


function NavLinks() {
  return (
    <>
      {
        navLinks.map((link) => {
          return <li key={link.path}>
            <Link to={link.path}>{link.text}</Link>
          </li>
        })
      }
    </>
  )
}

export default NavLinks