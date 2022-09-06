import React, { Fragment, useState } from "react";
import "./NavBarUser.css";

import { logout } from "../../redux/action";

import logo from "../../assets/vive argentina.png";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../Cart/Cart";

function NavBarUser() {
  const infoUser = useSelector((state) => state.userBasicInfo)
  const dispatch= useDispatch()
  const userLogout = () => {
    dispatch(logout());
  }
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
          <img src={logo} alt="logo" name='vive argentina' />
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
          <li class="nav-item dropdown">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "transparent", borderColor: "#c49d48e3", borderRadius: "2vh", fontSize: "1rem" }}>
                {infoUser.first_name}
              </button>
              <ul class="dropdown-menu">

                <li>
                  <a class="dropdown-item" href="/profile" style={{ color: "#c49d48e3", fontSize: "1rem" }}>MY PROFILE</a>
                  </li>
                {/* <button class="dropdown-item" type="button" onClick={() => userLogout()}>LOGOUT</button> */}
              </ul>
            </div>
          </li>

          <li>
            <button style={{ backgroundColor: "transparent", borderColor: "#c49d48e3", borderRadius: "2vh" }}><i class="bi bi-heart"></i></button>
          </li>
          <li>
            <Cart />
            {/* <button style={{ backgroundColor: "transparent", borderColor: "#c49d48e3", borderRadius: "2vh" }}><i class="bi bi-cart"></i></button> */}
          </li>
          <li>
            <button class="dropdown-item" type="button" onClick={() => userLogout()}>LOGOUT</button>

          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#" style={{ borderColor: "#C49D48", color: "#C49D48", fontSize: "1.8rem" }}>MY TRIPS</a>
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

export default NavBarUser;
