import React, { Fragment, useState } from "react";
import "./NavBar.css";

import Login from '../User/Login'
import Register from '../User/Register'
import logo from "../../assets/vive argentina.png";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <Fragment>
      <nav className="nav">
      <a href="/home" className="nav__brand">
        <img src={logo} alt="logo" name= 'vive argentina'/>
      </a>
      <ul className={active}>
        <li className="nav__item">
          <a href="/home" className="nav__link">
            HOME
          </a>
        </li>
        <li className="nav__item">
          <a href="/cities" className="nav__link">
            CITIES
          </a>
        </li>
        <li className="nav__item">
          <a href="/packages" className="nav__link">
            PACKAGES
          </a>
        </li>
        <li className="nav__item">
          <a href="experiences" className="nav__link">
            EXPERIENCES
          </a>
        </li>
        <li className="nav__item">
          <a href="contact_us" className="nav__link">
            CONTACT US
          </a>
        </li>
        <li>
        <Register/>  
        </li>
        <li>
        <Login/>
        </li>

      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
    </Fragment>
  );
}

export default Navbar;
