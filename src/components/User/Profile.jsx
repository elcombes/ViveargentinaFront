import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import perfil_user from "../../assets/perfil_user.png";
import Footer from "../Footer/Footer";

// Ruta agregada en App. js --> Route path="/userprofile"
// Agrego un Link de Prueba en NavBar.jsx para entrar a Profile y probar el state de User Info
export default function Profile() {
  let userFromStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    userFromStorage = JSON.parse(localStorage.getItem("user"));
  }, []);

  return (
    <Fragment>
       <div>

      <svg style= {{maxHeight:"50vh"}} xml  ns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#005B4C" fill-opacity="1" d="M0,32L80,48C160,64,320,96,480,128C640,160,800,192,960,181.3C1120,171,1280,117,1360,90.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
      <div
        className="class__profile"
        key={userFromStorage.user.id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "space-around",
          justifyContent: "center",
          alignItems: "center",
       
        }}
      >
        <img
          style={{borderRadius: "50px"}}
          src={
            userFromStorage.user.photo
            ? userFromStorage.user.photo
            : perfil_user
          }
          alt="user photo"
          />
        <h1 style={{ color: "#C49D48", fontSize: "3vw" }}>MY PROFILE</h1>
        <h3 style={{ textTransform: "uppercase", color: "black", fontSize: "2vw" }}>
          First Name: {userFromStorage.user.first_name}
        </h3>
        <h3 style={{ textTransform: "uppercase", color: "black", fontSize: "2vw" }}>
          Last Name: {userFromStorage.user.last_name}{" "}
        </h3>
        <h3 style={{ color: "black", fontSize: "2vw" }}>E-MAIL: {userFromStorage.user.email}</h3>

        <button style={{margin:"4vh"}}className="btn btn-outline-secondary">MY FAVS</button>

        <button style={{margin:"4vh"}}className="btn btn-outline-secondary">MY TRIPS</button>

      </div>
        <div style={{display:"flex",flexDirection:"column", justifyContent:"left", marginLeft:"5vh"}}>
          <Link to="/home">
            <button className="btn btn-outline-secondary" >GO HOME</button>
          </Link>
        </div>
          </div>
          <div style={{position:"absolute",bottom: "0",  width: "100%", height: "30px"}}>

          <Footer/>
          </div>
    </Fragment>
  );
}
