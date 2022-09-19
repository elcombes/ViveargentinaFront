import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllPackages, updatePackage } from "../../redux/action";
import "./PackagesTable.css";
import CreatePackage from "../CreatePackage/CreatePackage";
import UpdatePackage from "../UpdatePackage/UpdatePackage";
import Swal from "sweetalert2";



export default function PackagesTable() {
  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.allPackages);

  const orderPackages = allPackages.sort(function (a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    else return 0;
  });

  useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  const handleChangeAvailable = async (event) => {
    
    let id
    let newAvailable

    if(event.target.name) {
      id = event.target.name;
      newAvailable = {
        available: event.target.value === true ? false : true}
    } else {
      id = JSON.stringify(event.target.outerHTML).split('\\"')[1];
      newAvailable = {
        available: JSON.stringify(event.target.outerHTML).split('\\"')[3] === 'true' ? false : true}
    }
    console.log('id', id)
    console.log('newAvailable', newAvailable)
    
    const response = await dispatch(updatePackage(newAvailable, id))
    console.log('response', response)
    Swal.fire({
      title: response.data+"!",
      imageUrl: "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png",
      imageWidth: 350,
      imageHeight: 300,
      confirmButtonColor: "#C49D48",
      imageAlt: "Custom image",
    });
  }

  return (
    <div class="container mt-5">
      <div class="d-flex justify-content-center row">
        <div class="col-md-10">
          <div class="rounded">
            <div class="table-responsive table-borderless">
              <CreatePackage />

              <br />
              <table class="table table-bordered">
                {/* Encabezado de columnas */}
                <thead>
                  <tr className="text-center">
                    <th>CITY</th>
                    <th>PACKAGE</th>
                    <th>DATES</th>
                    <th>DAYS</th>
                    <th>PRICE</th>
                    <th>SCORE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                {/* Contenido - Filas */}

                {orderPackages?.map((p) => {
                  return (
                    <tbody class="table-body">
                      <tr class="cell-1 vertalign">
                        <td>{p.city.name}</td>
                        <td>{p.name}</td>
                        <td className="datescol">
                          {p.dates?.split(",").map((d) => {
                            return d + " ";
                          })}
                        </td>
                        <td>{p.duration}</td>
                        <td>${p.price}</td>
                        <td className="text-center">{p.score}</td>
                        <td className="text-center">
                          <div>
                            <UpdatePackage
                              id={p.id}
                              name={p.name}
                              subTitle={p.subTitle}
                              description={p.description}
                              price={p.price}
                              duration={p.duration}
                              dates={p.dates}
                              cityId={p.cityId}
                              image={p.image}
                            />
                          </div>

                          <button 
                          className="btn" 
                          onClick={(event) => handleChangeAvailable(event)}
                          name={p.id} 
                          value={p.available} >
                           <i name={p.id} value={p.available} class="bi bi-sign-stop-fill"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
