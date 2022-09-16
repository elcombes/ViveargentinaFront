import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/action";
import "./UsersTable.css";

export default function UsersTable() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  console.log("allUsers", allUsers);

  const orderUsers = allUsers.sort(function (a, b) {
    if (a.email.toLowerCase() > b.email.toLowerCase()) return 1;
    if (a.email.toLowerCase() < b.email.toLowerCase()) return -1;
    else return 0;
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="container mt-5 ">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="rounded">
            <div className="table-responsive table-borderless">
              <table className="table table-bordered vertalign">
                {/* Encabezado de columnas */}
                <thead className='text-center'>
                  <tr>
                    <th>BLOCK</th>
                    <th>EMAIL</th>
                    <th>NAME</th>
                    <th>ADMIN</th>
                    <th>PASS RESET</th>
                  </tr>
                </thead>

                {/* Contenido - Filas */}

                {orderUsers?.map((u) => {
                  return (
                    <tbody className="table-body">
                      <tr className="cell-1">
                        <td>
                          <div className="toggle-btn">
                            <div className="inner-circle"></div>
                            {/* <input type="checkbox" className="custom-control-input" id="customSwitches"></input> */}
                          </div>
                        </td>
                        <td>{u.email}</td>
                        <td>{u.first_name + " " + u.last_name}</td>
                        <td className="text-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                          ></input>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-outline-secondary">
                            <i className="bi bi-key-fill"></i>
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