import React from 'react';
import { useEffect } from 'react';
import Login from '../User/Login.jsx';
import './NavBarAdmin.css';



export default function NavBarAdmin() {
    let userFromStorage = JSON.parse(localStorage.getItem("user"));
    let user = userFromStorage.user;

    useEffect(() => {
      userFromStorage = JSON.parse(localStorage.getItem("user"));
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                        <div className="collapse navbar-collapse">
                            <img className='nav-item-img'src={user.photo} alt="" />
                        </div>
                        <div className="collapse navbar-collapse">
                            <span className='nav-item'> {user.first_name} {user.last_name} DASHBBOARD</span>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}