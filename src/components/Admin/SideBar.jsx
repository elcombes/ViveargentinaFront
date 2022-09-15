import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

export default function SideBar() {
    return (
        <div>
            <div className="container__sidebar">
                <ul className="sidebar">
                    <br />
                    <Link to='/admin/packages'>
                        <li>
                            <i class="bi bi-airplane-fill"></i> PACKAGES
                        </li>
                    </Link>
                    <br />

                    <Link to='/admin/experiences'>
                    <li>
                        <i class="bi bi-compass"></i> EXPERIENCES
                    </li>
                    </Link>
                    <br />

                    <Link to='/admin/sales'>
                    <li>
                        <i class="bi bi-cart4"></i> SALES
                    </li>
                    </Link>
                    <br />

                    <Link to='/admin/users'>
                    <li>
                        <i class="bi bi-person-circle"></i> USERS
                    </li>
                    </Link>
                    <br />

                    <Link to='/admin/reviews'>
                    <li>
                        <i class="bi bi-chat-left-quote"></i> REVIEWS
                    </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}