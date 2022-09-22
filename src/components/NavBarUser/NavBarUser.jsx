import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBarUser.css";

import { logout, addNewCart } from "../../redux/action";
import logo from "../../assets/vive argentina.png";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../Cart/Cart";

function NavBarUser() {
  const infoUser = useSelector((state) => state.userBasicInfo);
  const dispatch = useDispatch();
  const userLogout = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.user.id;
    let itemsFromStore = JSON.parse(localStorage.getItem("items"));
    dispatch(addNewCart(userId, itemsFromStore));
    localStorage.removeItem("items");

    dispatch(logout());

  };
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

  const defaultProfilePicture =
    "https://lh3.googleusercontent.com/a-/AFdZucos_7TuriZhUv-v4dTAbmhxctPDsQZ3X9Gln9C8=s96-c";

  return (
    <Fragment>
      <nav className="nav">
        <a href="/home" className="nav__brand">
          <img src={logo} alt="logo" name="vive argentina" />
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
            <a href="/contact_us" className="nav__link">
              CONTACT
            </a>
          </li>
          <li
            className="nav__item"
            class="nav-item dropdown"
            style={{
              textTransform: "uppercase",
              color: "#C49D48",
              fontSize: "1.3rem",
            }}
          >
            <div class="dropdown" style={{ textAlign: "center" }}>
              <button
                class="btn btn-secondary dropdown"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundImage: `url(${infoUser?.photo !== null
                    ? infoUser.photo
                    : defaultProfilePicture
                    })`,
                  backgroundColor: "transparent",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderColor: "#c49d48e3",
                  borderRadius: "10vh",
                }}
              ></button>
              {infoUser.first_name}

              <ul class="dropdown-menu">
                {infoUser.administrator ?
                  <li >
                    <a
                      class="dropdown-item"
                      href="/profile"
                      style={{ color: "#c49d48e3", fontSize: "15px" }}
                    >
                      MY PROFILE
                    </a>
                    <li>

                      <Link to="/admin">
                        <button
                          class="dropdown-item"
                          type="button"
                          style={{ color: "#C49D48", fontSize: "15px" }}
                        >
                          DASHBOARD
                        </button>
                      </Link>
                      <Link to="/home">
                        <button
                          class="dropdown-item"
                          type="button"
                          style={{ color: "#C49D48", fontSize: "15px" }}
                          onClick={() => userLogout()}
                        >
                          LOGOUT
                        </button>
                      </Link>
                    </li>
                  </li>
                  :
                  <li >
                    <a
                      class="dropdown-item"
                      href="/profile"
                      style={{ color: "#c49d48e3", fontSize: "15px" }}
                    >
                      MY PROFILE
                    </a>
                    <li>
                      <Link to="/home">
                        <button
                          class="dropdown-item"
                          type="button"
                          style={{ color: "#C49D48", fontSize: "15px" }}
                          onClick={() => userLogout()}
                        >
                          LOGOUT
                        </button>
                      </Link>
                    </li>
                  </li>
                }
              </ul>

            </div>
          </li>

          <li className="nav__item" class="nav-item active">
            <a
              class="nav-link"
              href="/profile#mytrips"
              style={{
                borderColor: "#C49D48",
                color: "#C49D48",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              MY TRIPS
            </a>
          </li>

          <li className="nav__item">
            <a
              class="btn btn-outline-secondary btn-lg"
              style={{ borderColor: "#c49d48e3", borderRadius: "2vh" }}
              href="/home#reviews"
            >
              <i class="bi bi-pencil"></i>
            </a>
          </li>
          <li className="nav__item">
            <a
              class="btn btn-outline-secondary btn-lg"
              style={{ borderColor: "#c49d48e3", borderRadius: "2vh" }}
              href="/profile#myfavs"
            >
              <i class="bi bi-heart"></i>
            </a>
          </li>
          <li className="nav__item">
            <Cart />
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
