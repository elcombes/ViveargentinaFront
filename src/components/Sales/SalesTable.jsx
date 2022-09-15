import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  putExperiencesStatus,
  putPackagesStatus,
} from "../../redux/action";
import "./SalesTable.css";

export default function SalesTable() {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({ change: false });

  function handleUpdateStatus(event, userId, itemId, item) {
    event.preventDefault();
    if (state.change === true) {
      setState({ change: false });
      console.log(state);
    } else {
      setState({ change: true });
      console.log(state);
    }
    let newStatus = event.target.value;
    let status = {
      status: newStatus,
      userId: userId,
      experienceId: itemId,
      packageId: itemId,
    };

    if (item === "experience") {
      dispatch(putExperiencesStatus(status));
    } else if (item === "package") {
      dispatch(putPackagesStatus(status));
    }
  }

  /* const orderUsers = allUsers.sort(function (a, b) {
        if (a.email.toLowerCase() > b.email.toLowerCase()) return 1;
        if (a.email.toLowerCase() < b.email.toLowerCase()) return -1;
        else return 0;
      }); */

  useEffect(() => {
    dispatch(getAllUsers());
  }, [state]);

  let allBoughtUsers = useSelector((state) => state.boughtUsers);

  return (
    <div class="container mt-5 ">
      <div class="d-flex justify-content-center row ">
        <div class="col-md-10">
          <div class="rounded">
            <div class="table-responsive table-borderless">
              <span> FILTER </span>
              <select className="selectBtn">
                <option disable>Select Status</option>
                <option value="pending">PENDING PAYMENT</option>
                <option value="confirmed">CONFIRMED</option>
                <option value="cancelled">CANCELLED</option>
                <option value="done">DONE</option>
              </select>
              <br />
              <table class="table table-bordered ">
                {/* Encabezado de columnas */}
                <thead>
                  <tr>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>ITEM</th>
                    <th>PAX</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                    <th>CHANGE STATUS</th>
                  </tr>
                </thead>

                {/* Contenido - Filas */}
                <tbody class="table-body">
                  {allBoughtUsers?.map((u) => {
                    return u.allBoughtItems?.map((e) => {
                      return (
                        <Fragment>
                          <tr class="cell-1">
                            <td>{u.first_name + " " + u.last_name}</td>
                            <td>
                              {e.reservation_experience
                                ? e.reservation_experience.createdAt.slice(0, 9)
                                : e.reservation_package.createdAt.slice(0, 9)}
                            </td>
                            <td>{e.name}</td>
                            <td>
                              {e.reservation_experience
                                ? e.reservation_experience.passengers
                                : e.reservation_package.passengers}
                            </td>
                            <td>
                              {e.reservation_experience
                                ? e.reservation_experience.total
                                : e.reservation_package.total}
                            </td>
                            <td>
                              {e.reservation_experience
                                ? e.reservation_experience.status
                                : e.reservation_package.status}
                            </td>
                            <td>
                              <select
                                onChange={(event) =>
                                  handleUpdateStatus(
                                    event,
                                    u.id,
                                    e.id,
                                    e.reservation_experience
                                      ? "experience"
                                      : "package"
                                  )
                                }
                                className="statusChange"
                              >
                                <option disable>Select Status</option>
                                <option value="pending payment">
                                  PENDING PAYMENT
                                </option>
                                <option value="confirmed">CONFIRMED</option>
                                <option value="cancelled">CANCELLED</option>
                                <option value="done">DONE</option>
                              </select>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
