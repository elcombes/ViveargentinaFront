import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPackages } from "../../redux/action";
import "./PackagesTable.css";
import CreatePackage from "../CreatePackage/CreatePackage";
import UpdatePackage from "../UpdatePackage/UpdatePackage";
//Ruta de prueba agregar en App => '/table'
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

                          <button className="btn">
                            <i class="bi bi-sign-stop-fill"></i>
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
