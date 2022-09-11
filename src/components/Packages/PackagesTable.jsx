import React from 'react';
import './PackagesTable.css';

//Ruta de prueba agregar en App => '/table'
export default function PackagesTable() {

    return (
        <div class="container mt-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-10">
                    <div class="rounded">
                        <div class="table-responsive table-borderless">
                            <button className='btn-new-pack'>NEW PACKAGE</button>
                            <br />
                            <table class="table">
                                {/* Encabezado de columnas */}
                                <thead>
                                    <tr>
                                        <th>CITY</th>
                                        <th>NAME</th>
                                        <th>DATES</th>
                                        <th>DAYS</th>
                                        <th>PRICE</th>
                                        <th>SCORE</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                {/* Contenido - Filas */}
                                <tbody class="table-body">
                                    <tr class="cell-1">
                                        <td>Bariloche</td>
                                        <td>Bariloche and surroundings</td>
                                        <td>13-oct-22<br/>10-nov-22<br/>15-dic-22</td>
                                        <td>4 days</td>
                                        <td>43000</td>
                                        <td>4</td>
                                        <td>
                                            <button className="btn"><i class="bi bi-pencil-square"></i></button>
                                            <button className="btn"><i class="bi bi-sign-stop-fill"></i></button>
                                            <button className="btn"><i class="bi bi-trash3"></i></button>
                                        </td>
                                    </tr>
                                    <tr class="cell-1">
                                        <td>Buenos Aires</td>
                                        <td>Atlantic Coast</td>
                                        <td>14-oct-22<br/>25-nov-22<br/>16-dic-22</td>
                                        <td>5 days</td>
                                        <td>45000</td>
                                        <td>5</td>
                                        <td>
                                            <button className="btn"><i class="bi bi-pencil-square"></i></button>
                                            <button className="btn"><i class="bi bi-sign-stop-fill"></i></button>
                                            <button className="btn"><i class="bi bi-trash3"></i></button>
                                        </td>
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