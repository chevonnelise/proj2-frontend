import React from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

export const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-title">
            <img src={logo} alt="logo"/>
        </div>
        <div className="navbar-links">
            <Link to="/">Shop</Link>
            <Link to="/purchased-items">Purchases</Link>
            <Link to="/checkout"><FontAwesomeIcon icon={faShoppingCart}/></Link>
            {/* <Link to="/auth"></Link> */}
        </div>
    </div>
  )
}

