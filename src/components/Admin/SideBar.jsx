import React from 'react';
import './SideBar.css';

export default function SideBar() {
    return (
        <div>
            <div className="container__sidebar">
                <ul className="sidebar">
                    <br />
                    <li><i class="bi bi-airplane-fill"></i> PACKS</li>
                    <br />
                    <li><i class="bi bi-compass"></i> EXPERIENCES</li>
                    <br />
                    <li><i class="bi bi-cart4"></i> SALES</li>
                    <br />
                    <li><i class="bi bi-person-circle"></i> USERS</li>
                    <br />
                    <li><i class="bi bi-bell-fill"></i> NOTIFICATIONS</li>
                </ul>
            </div>
        </div>
    )
}