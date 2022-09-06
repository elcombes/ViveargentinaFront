import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import perfil_user from '../../assets/perfil_user.png';


// Ruta agregada en App. js --> Route path="/userprofile"
// Agrego un Link de Prueba en NavBar.jsx para entrar a Profile y probar el state de User Info
export default function Profile() {
    
    let default_birth = '**/**/****';
    let userInfo = useSelector((state) => state.userBasicInfo);
    
    return (
        <Fragment>
            <div className="class__profile" key={userInfo.id}style={{justifyContent:"center", alignItems:"center", alignContent:"center"}}>
                <img style={{borderRadius:'50px'}} src= {userInfo.photo ? userInfo.photo : perfil_user} alt='user photo'/>
                <h1 style={{color:'black'}}>USER PROFILE</h1>
                <h3 style={{color:'black'}}>First Name: {userInfo.first_name}</h3>
                <h3 style={{color:'black'}}>Last Name: {userInfo.last_name} </h3>
                <h3 style={{color:'black'}}>E-mail: {userInfo.email}</h3>
                <h3 style={{color:'black'}}>Birth Date: {userInfo.birth_date ?  userInfo.birth_date : default_birth}</h3>
                
                <button>My Favs</button>

                <button>My Trips</button>

                <Link to= '/home'>
                    <button>Go Home</button> 
                </Link>
            </div>

            
        </Fragment>
    )
}