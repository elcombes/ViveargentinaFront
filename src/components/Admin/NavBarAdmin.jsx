import React from 'react';
import Login from '../User/Login.jsx';
import styles from './NavBarAdmin.css';

export default function NavBarAdmin() {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                        <div className="collapse navbar-collapse">
                            <span className='nav-item'>ADMIN DASHBBOARD</span>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a href="/home" class="nav-link"> Home </a>
                                </li>
                                <li className="nav-item">
                                    <Login />
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}