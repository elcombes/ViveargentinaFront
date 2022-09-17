import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBarAdmin from './NavBarAdmin.jsx';
import SideBar from './SideBar.jsx';
import './AdminDashboard.css';
import UsersTable from '../User/UsersTable.jsx';
import SalesTable from '../Sales/SalesTable';
import ExperiencesTable from '../Experiences/ExperiencesTable.jsx';
import PackagesTable from '../Packages/PackagesTable.jsx';
import styles from './NavBarAdmin.css';
import ReviewsTable from '../Reviews/ReviewsTable.jsx';


//componente Admin Dashboard - Ruta en App.js --> "/admin"  
export default function AdminDashboard() {

    return (
        <BrowserRouter>
        
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
                                    <Route exact path='/admin/packages' component={PackagesTable}/>
                                    <Route exact path='/admin/experiences' component={ExperiencesTable}/>
                                    <Route exact path='/admin/sales' component={SalesTable} />
                                    <Route exact path='/admin/users' component={UsersTable}/>
                                    <Route exact path='/admin/reviews' component={ReviewsTable} />
                                </div>
                            </div>
                        </div>
                    </div>
           
                </div>
            </div>
        </div>
        
        </BrowserRouter>
    )
}
