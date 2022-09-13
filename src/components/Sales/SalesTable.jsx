import React from 'react';
import './SalesTable.css';

//USER  |  DATE  |  ITEM  |  AMOUNT  |  STATUS  |

//Ruta de prueba agregar en App => '/table'
export default function SalesTable() {
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
                                        <th>AMOUNT</th>
                                        <th>STATUS</th>
                                        <th>CHANGE STATUS</th>
                                    </tr>
                                </thead>
                                {/* Contenido - Filas */}
                                <tbody class="table-body">
                                    <tr class="cell-1">
                                        <td>Cristian Fortich</td>
                                        <td>10/09/22</td>
                                        <td>CLASSIC MENDOZA</td>
                                        <td>70000</td>
                                        <td>BOUGHT</td>
                                        <td><select className='statusChange'>
                                            <option value="bought">BOUGHT</option>
                                            <option value="cancelled">CANCELLED</option>
                                        </select>
                                            
                                        </td>
                                    </tr>
                                    <tr class="cell-1">
                                        <td>Cristian Fortich</td>
                                        <td>10/09/22</td>
                                        <td>TO LAS LEÑAS</td>
                                        <td>7700</td>
                                        <td>BOUGHT</td>
                                        <td><select className="statusChange">
                                            <option value="bought">BOUGHT</option>
                                            <option value="cancelled">CANCELLED</option>
                                        </select>
                                            
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