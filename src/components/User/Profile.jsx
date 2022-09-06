import React, { Fragment, useEffect } from "react";
import { Link } from 'react-router-dom';
import perfil_user from '../../assets/perfil_user.png';


// Ruta agregada en App. js --> Route path="/userprofile"
// Agrego un Link de Prueba en NavBar.jsx para entrar a Profile y probar el state de User Info
export default function Profile() {
    
    
    let userFromStorage = JSON.parse(localStorage.getItem("userGoogle"));
    

    useEffect(() => {
        userFromStorage = JSON.parse(localStorage.getItem("userGoogle"));
      }, [JSON.parse(localStorage.getItem("userGoogle"))]);

      
    
    return (
        <Fragment>
            <div className="class__profile" key={userFromStorage.user.id}style={{justifyContent:"center", alignItems:"center", alignContent:"center"}}>
                <img style={{borderRadius:'50px'}} src={userFromStorage.user.photo ? userFromStorage.user.photo : perfil_user} alt='user photo'/>
                <h1 style={{color:'black'}}>USER PROFILE</h1>
                <h3 style={{color:'black'}}>First Name: {userFromStorage.user.first_name}</h3>
                <h3 style={{color:'black'}}>Last Name: {userFromStorage.user.last_name} </h3>
                <h3 style={{color:'black'}}>E-mail: {userFromStorage.user.email}</h3>
               
                
                <button>My Favs</button>

                <button>My Trips</button>

                <Link to= '/home'>
                    <button>Go Home</button> 
                </Link>
            </div>

            
        </Fragment>
    )
}