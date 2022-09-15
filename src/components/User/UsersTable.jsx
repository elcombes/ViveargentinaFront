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
    <div class="container mt-5 ">
      <div class="d-flex justify-content-center row">
        <div class="col-md-10">
          <div class="rounded">
            <div class="table-responsive table-borderless">
              <table class="table table-bordered">
                {/* Encabezado de columnas */}
                <thead>
                  <tr>
                    <th>BLOCK</th>
                    <th>EMAIL</th>
                    <th>NAME</th>
                    <th>PURCHASE ITEMS</th>
                    <th>ADMIN</th>
                    <th>PASS RESET</th>
                  </tr>
                </thead>

                {/* Contenido - Filas */}

                {orderUsers?.map((u) => {
                  return (
                    <tbody class="table-body">
                      <tr class="cell-1">
                        <td class="text-center">
                          <div class="toggle-btn">
                            <div class="inner-circle"></div>
                            {/* <input type="checkbox" class="custom-control-input" id="customSwitches"></input> */}
                          </div>
                        </td>
                        <td>{u.email}</td>
                        <td>{u.first_name + " " + u.last_name}</td>
                        <td>
                          <a href="#">VIEW</a>
                        </td>
                        <td>
                          <input
                            class="form-check-input"
                            type="checkbox"
                          ></input>
                        </td>
                        <td>
                          <button className="btn btn-outline-secondary">
                            <i class="bi bi-key-fill"></i>
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
