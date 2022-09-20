import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllExperiences, updateExperience } from "../../redux/action";
import "./ExperiencesTable.css";
import CreateExperience from "../CreateExperience/CreateExperience";
import UpdateExperience from "../UpdateExperience/UpdateExperience";
import Swal from "sweetalert2";

export default function ExperiencesTable() {
  const dispatch = useDispatch();
  const allExperiences = useSelector((state) => state.allExperiencesToAdmin);
  const history = useHistory();

  const orderExperiences = allExperiences.sort(function (a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    else return 0;
  });

  useEffect(() => {
    dispatch(getAllExperiences());
  }, []);

  const handleChangeAvailable = async (event) => {
    event.preventDefault();
    let id;
    let newAvailable;

    if (event.target.name) {
      id = event.target.name;
      newAvailable = {
        available: event.target.value === true ? false : true,
      };
    } else {
      id = JSON.stringify(event.target.outerHTML).split('\\"')[1];
      newAvailable = {
        available:
          JSON.stringify(event.target.outerHTML).split('\\"')[3] === "true"
            ? false
            : true,
      };
    }
    console.log("id", id);
    console.log("newAvailable", newAvailable);

    const response = await dispatch(updateExperience(newAvailable, id));

    Swal.fire({
      title: response.data + "!",
      imageUrl:
        "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png",
      imageWidth: 350,
      imageHeight: 300,
      confirmButtonColor: "#C49D48",
      imageAlt: "Custom image",
    }).then(() => {
      history.go(0);
    });
  };

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
                  <tr className="text-center">
                    {/* <th>CITY</th> */}
                    <th>PACKAGE</th>
                    <th>EXPERIENCE</th>
                    <th>DATES</th>
                    <th>PRICE</th>
                    <th>SCORE</th>
                    <th>AVAILABLE</th>
                    <th>UPDATE</th>
                  </tr>
                </thead>

                {/* Contenido - Filas */}

                {orderExperiences?.map((e) => {
                  return (
                    <tbody class="table-body" key={e.id}>
                      <tr class="cell-1 vertalign">
                        {/* <td>CITY</td> */}
                        <td>{e.package?.name}</td>
                        <td>{e?.name}</td>
                        <td className="datescol">
                          {e.dates?.split(",").map((d) => {
                            return d + " ";
                          })}
                        </td>
                        <td className="text-center">${e.price}</td>
                        <td className="text-center">{e.score}</td>
                        <td className="text-center">
                          {e.available ? (
                            <button
                              className="btn"
                              onClick={(event) => handleChangeAvailable(event)}
                              name={e.id}
                              value={e.available}
                            >
                              <i
                                name={e.id}
                                value={e.available}
                                class="bi bi-eye"
                              ></i>
                            </button>
                          ) : (
                            <button
                              className="btn"
                              onClick={(event) => handleChangeAvailable(event)}
                              name={e.id}
                              value={e.available}
                            >
                              <i
                                name={e.id}
                                value={e.available}
                                class="bi bi-eye-slash-fill"
                                style={{ color: "black" }}
                              ></i>
                            </button>
                          )}
                        </td>
                        <td className="text-center controlbuttonsexp">
                          <div>
                            <UpdateExperience
                              id={e.id}
                              name={e.name}
                              subTitle={e.subTitle}
                              description={e.description}
                              price={e.price}
                              duration={e.duration}
                              dates={e.dates}
                              categoryId={e.categoryId}
                              packageId={e.packageId}
                              image={e.image}
                            />
                          </div>
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
