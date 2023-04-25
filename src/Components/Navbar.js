import React, {useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Stylesheets/Navbar.css'
const Navbar = ({user}) => {
  const location = useLocation();
  useEffect(() => {
  
  }, [location.pathname]);
  return (
    <nav className='navbar'>
      <ul className='navul'>
        <li className={window.location.pathname === "/" ? "active-li" : ""}>
          <Link to="/" className={window.location.pathname === "/" ? "active-link" : ""}>Home</Link>
        </li>
        {
          (user && user.hasOwnProperty('customerId')) &&
          <li className={window.location.pathname === "/" ? "active-li" : ""}>
          <Link to="/bills" className={window.location.pathname === "/bills" ? "active-link" : ""}>Bills & Payments History</Link>
          </li>
        }
        
        <li className={window.location.pathname === "/" ? "active-li" : ""}>
          <Link to="/about" className={window.location.pathname === "/about" ? "active-link" : ""}>About Us</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar