import React from 'react';
import NavBarAdmin from './NavBarAdmin.jsx';
import SideBar from './SideBar.jsx';
import './AdminDashboard.css';
import UsersTable from '../User/UsersTable.jsx';
import SalesTable from '../Sales/SalesTable'
import styles from './NavBarAdmin.css';


//componente Admin Dashboard - Ruta en App.js --> "/admin"  
export default function AdminDashboard() {

    return (

        <div>
            <NavBarAdmin />
            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-2">
                        <SideBar />
                    </div>
                    <div className="col-md-10">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <UsersTable />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <SalesTable />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
