import React, { Fragment, useEffect } from 'react';
import  { useSelector, useDispatch }  from "react-redux";
import { getAllUsers } from "../../redux/action";
import './SalesTable.css';


export default function SalesTable() {

    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.allUsers);
    
    const boughtUsers = allUsers.filter((u) => {
        return u.experiences.length >= 1
    })
    
    boughtUsers.forEach(u => {
        let boughtExperiences = u.experiences.filter(e => {
            return e.reservation_experience.bought === true
        })
        u.boughtExperiences =  boughtExperiences;
        console.log('boughtExperiences', boughtExperiences)
    });

    //console.log('allUsers', allUsers)
  
    /* const orderUsers = allUsers.sort(function (a, b) {
        if (a.email.toLowerCase() > b.email.toLowerCase()) return 1;
        if (a.email.toLowerCase() < b.email.toLowerCase()) return -1;
        else return 0;
      }); */
    

    useEffect(() => {
        dispatch(getAllUsers());
    },[])

    return (
        <div class="container mt-5 ">
            <div class="d-flex justify-content-center row ">
                <div class="col-md-10">
                    <div class="rounded">
                        <div class="table-responsive table-borderless">
                            <span> FILTER </span>
                            <select className='selectBtn'>
                                <option value="bought">BOUGHT</option>
                                <option value="cancelled">CANCELLED</option>
                            </select>
                            <br />
                            <table class="table ">
                                {/* Encabezado de columnas */}
                                <thead>
                                    <tr>
                                        <th>USER</th>
                                        <th>DATE</th>
                                        <th>ITEM</th>
                                        <th>PAX</th>
                                        <th>AMOUNT</th>
                                        <th>STATUS</th>
                                        <th>CHANGE STATUS</th>
                                    </tr>
                                </thead>

                                {/* Contenido - Filas */}
                                <tbody class="table-body">
                                {boughtUsers?.map((u) => {
                                    return (
                                                              
                                        u.boughtExperiences?.map((e) => {
                                            return (
                                            <Fragment> 
                                            <tr class="cell-1">
                                                <td>{u.first_name + ' ' + u.last_name}</td>
                                                <td>{e.reservation_experience.createdAt.slice(0,9)}</td>
                                                <td>{e.name}</td>
                                                <td>{e.reservation_experience.passengers}</td>
                                                <td>{e.reservation_experience.total}</td>
                                                <td>{e.reservation_experience.status}</td>
                                                <td>
                                                <select className='statusChange'>
                                                    <option value="pending">PENDING PAYMENT</option>
                                                    <option value="confirmed">CONFIRMED</option>
                                                    <option value="cancelled">CANCELLED</option>
                                                    <option value="done">DONE</option>
                                                </select> 
                                                </td>
                                            </tr>
                                            </Fragment>   
                                        
                                            )
                                        })
                                    
                                    )   
                                        
                                })}
                                
                                   
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}