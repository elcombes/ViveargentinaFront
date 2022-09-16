import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllExperiences } from "../../redux/action";
import './ExperiencesTable.css';
import CreateExperience from "../CreateExperience/CreateExperience";
import UpdateExperience from "../UpdateExperience/UpdateExperience";


export default function ExperiencesTable() {

  const dispatch = useDispatch();
  const allExperiences = useSelector((state) => state.allExperiences);

  const orderExperiences = allExperiences.sort(function (a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    else return 0;
  });

  useEffect(() => {
    dispatch(getAllExperiences());

  }, []);



  return (
    <div class="container mt-5">

      <div class="d-flex justify-content-center row">
        <div class="col-md-10">
          <div class="rounded">
            <div class="table-responsive table-borderless">
              <div class="table-create">
                <CreateExperience />
              </div>
              <br />
              <table class="table table-bordered">
                {/* Encabezado de columnas */}
                <thead>
                  <tr className='text-center'>
                    {/* <th>CITY</th> */}
                    <th>PACKAGE</th>
                    <th>EXPERIENCE</th>
                    <th>DATES</th>
                    <th>PRICE</th>
                    <th>SCORE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                {/* Contenido - Filas */}

                {orderExperiences?.map((e) => {
                  return (
                    <tbody class="table-body">
                      <tr class="cell-1 vertalign">
                        {/* <td>CITY</td> */}
                        <td>{e.package?.name}</td>
                        <td>{e?.name}</td>
                        <td className='datescol'>{e.dates?.split(",").map((d) => {
                          return d + ' ';
                        })}
                        </td>
                        <td className='text-center'>${e.price}</td>
                        <td className='text-center'>{e.score}</td>
                        <td className='text-center controlbuttonsexp'>
                          <div><UpdateExperience /></div>
                          <button className="btn"><i class="bi bi-sign-stop-fill"></i></button>
                        </td>
                      </tr>
                    </tbody>
                  )
                })}
              </table>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}