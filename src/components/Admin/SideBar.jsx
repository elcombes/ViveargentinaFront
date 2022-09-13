import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

export default function SideBar() {
    return (
        <div>
            <div className="container__sidebar">
                <ul className="sidebar">
                    <br />
                    <li>
                        <Link to='/admin/packages'><i class="bi bi-airplane-fill"></i> PACKS</Link>
                    </li>
                    <br />
                    <li>
                        <Link to='/admin/experiences'><i class="bi bi-compass"></i> EXPERIENCES</Link>
                    </li>
                    <br />
                    <li>
                        <Link to='/admin/sales'><i class="bi bi-cart4"></i> SALES</Link>
                    </li>
                    <br />
                    <li>
                        <Link to='/admin/users'><i class="bi bi-person-circle"></i> USERS</Link>
                    </li>
                    <br />
                    <li>
                        <Link to='/admin/notifications'><i class="bi bi-bell-fill"></i> NOTIFICATIONS</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}