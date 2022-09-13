import React from 'react';
import './ExperiencesTable.css';

import CreateExperience from "../CreateExperience/CreateExperience"

//Ruta de prueba agregar en App => '/table'
export default function ExperiencesTable() {

    return (
        <div class="container mt-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-10">
                    <div class="rounded">
                        <div class="table-responsive table-borderless">

                            <br />
                            <table class="table">

                                {/* Encabezado de columnas */}
                                <thead>
                                    <tr>
                                        <th>CITY</th>
                                        <th>PACKAGE</th>
                                        <th>NAME</th>
                                        <th>DATES</th>
                                        <th>PRICE</th>
                                        <th>SCORE</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                {/* Contenido - Filas */}
                                <tbody class="table-body">
                                    <tr class="cell-1">
                                        <td>Buenos Aires</td>
                                        <td>Live Buenos Aires</td>
                                        <td>Excursion to Delta</td>
                                        <td>06-oct-22<br />13-nov-22<br />18-dic-22</td>
                                        <td>14000</td>
                                        <td>4</td>
                                        <td>
                                            <button className="btn"><i class="bi bi-pencil-square"></i></button>
                                            <button className="btn"><i class="bi bi-sign-stop-fill"></i></button>
                                            <button className="btn"><i class="bi bi-trash3"></i></button>
                                        </td>
                                    </tr>
                                    <tr class="cell-1">
                                        <td>Ushuaia</td>
                                        <td>Unmissable of Tierra del Fuego</td>
                                        <td>Ski in Castor Hill</td>
                                        <td>09-oct-22<br />06-nov-22<br />05-dic-22</td>
                                        <td>15500</td>
                                        <td>4</td>
                                        <td>
                                            <button className="btn"><i class="bi bi-pencil-square"></i></button>
                                            <button className="btn"><i class="bi bi-sign-stop-fill"></i></button>
                                            <button className="btn"><i class="bi bi-trash3"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="table-create">
                                <CreateExperience />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}