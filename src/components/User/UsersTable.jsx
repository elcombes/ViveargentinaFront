import React from 'react';
import './UsersTable.css';

//Ruta de prueba agregada en App => '/table'
export default function UsersTable() {
    return(
        <div class="container mt-5">
            <div class="d-flex justify-content-center row">
            <div class="col-md-10">
                <div class="rounded">
                    <div class="table-responsive table-borderless">
                        <table class="table">
                            {/* Encabezado de columnas */}
                            <thead>
                                <tr>
                                    <th>BLOCK</th>
                                    <th>NAME</th>
                                    <th>ROLE</th>
                                    <th>EMAIL</th>
                                    <th>SHOPPING</th>
                                    <th>ADMIN</th>
                                    <th>PASS RESET</th>
                                    <th><i class="bi bi-trash3"></i></th>
                                </tr>
                            </thead>
                            {/* Contenido - Filas */}
                            <tbody class="table-body">
                                <tr class="cell-1">
                                    <td class="text-center">
                                        <div class="toggle-btn">
                                            <div class="inner-circle"></div>
                                        </div>
                                    </td>
                                    <td>Cristian Fortich</td>
                                    <td>Customer</td>
                                    <td>google@+yezidfortich@gmail.com</td>
                                    <td><a href='#'>VIEW</a></td>
                                    <td><input class="form-check-input" type="checkbox"></input></td>
                                    <td><button><i class="bi bi-key-fill"></i></button></td>
                                    <td><button><i class="bi bi-trash3"></i></button></td>
                                </tr>
                                <tr class="cell-1">
                                    <td class="text-center">
                                        <div class="toggle-btn">
                                            <div class="inner-circle"></div>
                                        </div>
                                    </td>
                                    <td>Romina Ponce</td>
                                    <td>Provider</td>
                                    <td>romina.ponce@gmail.com</td>
                                    <td> X </td>
                                    <td><input class="form-check-input" type="checkbox"></input></td>
                                    <td><button><i class="bi bi-key-fill"></i></button></td>
                                    <td><button><i class="bi bi-trash3"></i></button></td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </div>
       
    )
}