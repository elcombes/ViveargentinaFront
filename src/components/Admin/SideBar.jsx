import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

export default function SideBar() {
    return (
        <div>
            <div className="container__sidebar">
                <ul className="sidebar">
                    <br />
                    <Link to='/admin/packages'><li className='sidebarbutton'>
                        <i className="sidebaricon bi bi-airplane-fill"></i> PACKAGES
                    </li></Link>
                    <br />
                    <Link to='/admin/experiences'><li className='sidebarbutton'>
                        <i className="sidebaricon bi bi-compass"></i> EXPERIENCES
                    </li></Link>
                    <br />
                    <Link to='/admin/sales'><li className='sidebarbutton'>
                        <i className="sidebaricon bi bi-cart4"></i> SALES
                    </li></Link>
                    <br />
                    <Link to='/admin/users'><li className='sidebarbutton'>
                        <span><i className="bi bi-person-circle"></i> USERS</span>
                    </li></Link>
                    <br />
                    <Link to='/admin/reviews'><li className='sidebarbutton'>
                        <i className="sidebaricon bi bi-chat-left-quote"></i> REVIEWS
                    </li></Link>
                </ul>
            </div>
        </div>
    )
}