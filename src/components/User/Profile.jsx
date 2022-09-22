import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import perfil_user from "../../assets/perfil_user.png";
import MyTrips from "../User/MyTrips";
import MyFavs from "../User/MyFavs";
import NavBarUser from "../NavBarUser/NavBarUser"
import { getUserById, getLsUser } from "./../../redux/action.js";
import ChangePassword from "../User/ChangePassword";
import styles from '../User/User.module.css'

// Ruta agregada en App. js --> Route path="/userprofile"
// Agrego un Link de Prueba en NavBar.jsx para entrar a Profile y probar el state de User Info
export default function Profile() {
  const userById = useSelector((state) => state.userById);
  const dispatch = useDispatch();
  const defaultProfilePicture =
  "https://lh3.googleusercontent.com/a-/AFdZucos_7TuriZhUv-v4dTAbmhxctPDsQZ3X9Gln9C8=s96-c";

  let userFromStorage = JSON.parse(localStorage.getItem("user"));

  const [changePassword, setChangePassword] = useState(false);
  

  useEffect(() => {
    dispatch(getLsUser())
    userFromStorage = JSON.parse(localStorage.getItem("user"));
    let userId = userFromStorage.user.id;
    dispatch(getUserById(userId));
  }, []);

  const toggleCP = () => {
    setChangePassword(changePassword ? false : true);
  };

  return (
    <Fragment>
      <section
        className="vh-100"
        style={{
          backgroundImage:
            "url(" + "https://wallpaperaccess.com/full/5775649.jpg" + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={`container-fluid ${styles.navuserprofile}`}>
          <NavBarUser />
        </div>
        <div className="container py-5 h-50">

          <div className="row d-flex justify-content-center align-items-center h-90">
            <div className="col col-lg-7 mb-4 mb-lg-0">
              <div
                className="card mb-3"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.15)",
                }}
              >
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                      borderColor: "#C49D48",
                      background:
                        "linear-gradient(to top,  #ffffff 0%,#C49D48 100%)",
                    }}
                  >
                    <img
                      src={
                        userFromStorage.user.photo
                          ? userFromStorage.user.photo
                          : defaultProfilePicture
                      }
                      alt="user photo"
                      className="img-fluid my-5"
                      style={{ borderRadius: "50px", width: "80px" }}
                    />
                    <h5
                      style={{
                        fontSize: "20px",
                        color: "black",
                        textTransform: "uppercase",
                        marginBottom: "10px",
                      }}
                    >
                      {userFromStorage.user.first_name}
                    </h5>
                    <h5
                      style={{
                        fontSize: "20px",
                        color: "black",
                        textTransform: "uppercase",
                        marginBottom: "20px",
                      }}
                    >
                      {userFromStorage.user.last_name}
                    </h5>
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6
                        style={{ fontSize: "15px", textTransform: "uppercase" }}
                      >
                        My Info
                      </h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6
                            style={{
                              fontSize: "10px",
                              textTransform: "uppercase",
                            }}
                          >
                            Email
                          </h6>
                          <p
                            className="text-muted"
                            style={{ fontSize: "15px", fontFamily: "Roboto" }}
                          >
                            {userFromStorage.user.email}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6
                            style={{
                              fontSize: "10px",
                              textTransform: "uppercase",
                            }}
                          >
                            Phone
                          </h6>
                          <p
                            style={{ fontSize: "15px", fontFamily: "Roboto" }}
                            className="text-muted"
                          >
                            123 456 789
                          </p>
                        </div>
                      </div>

                      <hr className="mt-0 mb-4" />

                      <div className="column-2">
                        
                          {""}
                          <a href="#mytrips" class="btn btn-outline-secondary" role="button" style={{height:"40px", paddingTop:"11px"}} >MY HISTORY</a>
                        

                        {userFromStorage.user.birth_date === "active" ? (
                          <button
                            onClick={() => toggleCP()}
                            className="btn btn-outline-secondary"
                          >
                            {" "}
                            CHANGE PASSWORD
                          </button>
                        ) : null}
                        {changePassword ? <ChangePassword /> : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="mytrips">
        <MyTrips />
      </div>

      <div id="myfavs">
        <MyFavs
          packages={userById.packages}
          experiences={userById.experiences}
        />
      </div>
    </Fragment>
  );
}
