import React, { Fragment, useState } from "react";
import styles from "./NavBar.css";
import Login2 from "../User/Login2/Login2"
import Login from "../User/Login";
import logo from "../../assets/vive argentina.png";
import Cart from "../Cart/Cart"
import SignUp from "../User/SignUp/SignUp";
import {useHistory} from "react-router-dom";
import Swal from "sweetalert2";


function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const history = useHistory()
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  function handleBtnClick() {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user) {
      window.location.href='/profile#myfavs'
    } else {
      return Swal.fire({
        title: "Please log in to see your favorites",
        imageUrl: 'https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png',
        imageWidth: 350,
        imageHeight: 300,
        confirmButtonColor: "#C49D48",
        imageAlt: "Custom image",
        showClass: {
          popup: "animate_animated animate_flipInY",
        },
      });
    }
  }

  return (
    <Fragment>
      <nav className="nav">
        <a href="/home" className="nav__brand" >
          <img src={logo} alt="logo" name='vive argentina' />
        </a>
        <ul className={active}>
          <li className="nav__item">
            <a href="/home" className="nav__link">HOME</a>
          </li>
          <li className="nav__item">
            <a href="/cities" className="nav__link">CITIES</a>
          </li>
          <li className="nav__item">
            <a href="/packages" className="nav__link">PACKAGES</a>
          </li>
          <li className="nav__item">
            <a href="/experiences" className="nav__link">EXPERIENCES</a>
          </li>
          <li className="nav__item">
            <a href="/contact_us" className="nav__link">CONTACT</a>
          </li>
          <li>
            <SignUp/>
          </li>
          <li>
            <Login2 />
          </li>
          <li>
            <a
              class="btn btn-outline-secondary btn-lg"
              style={{ borderColor: "#c49d48e3", borderRadius: "2vh" }}
              href="/home#reviews"
            >
              <i class="bi bi-pencil"></i>
            </a>
          </li>
          <li>
            <button
              class="btn btn-outline-secondary btn-lg"
              style={{ borderColor: "#c49d48e3", borderRadius: "2vh" }}
              onClick={handleBtnClick}
              // href="/profile#myfavs"
            >
              <i class="bi bi-heart"></i>
            </button>
          </li>
          <li>
            <Cart/>

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
