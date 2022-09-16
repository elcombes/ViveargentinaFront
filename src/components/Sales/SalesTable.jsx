import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  putExperiencesStatus,
  putPackagesStatus,
  filterSalesStatus,
} from "../../redux/action";
import "./SalesTable.css";

export default function SalesTable() {
  const dispatch = useDispatch();
  let allBoughtUsers = useSelector((state) => state.boughtUsers);
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

  function handleFilterStatus(e) {
    
    e.preventDefault();
    if (state.change === true) {
      setState({ change: false });
      console.log(state);
    } else {
      setState({ change: true });
      console.log(state);
    }
    dispatch(filterSalesStatus(e.target.value))

  };


  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

 
  return (
    <div class="container mt-5 ">
      <div class="d-flex justify-content-center row ">
        <div class="col-md-10">
          <div class="rounded">
            <div class="table-responsive table-borderless">
               {/* Filtro de  Status */}
              <span> FILTER </span>
              <select onChange={(e) => handleFilterStatus(e)} className="selectBtn">
                <option disable>Select Status</option>
                <option value="all">ALL</option>
                <option value="Pending payment">PENDING PAYMENT</option>
                <option value="confirmed">CONFIRMED</option>
                <option value="cancelled">CANCELLED</option>
                <option value="done">DONE</option>
              </select>
              <br />
              <table class="table table-bordered ">
                {/* Encabezado de columnas */}
                <thead className='text-center'>
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
                          <tr class="cell-1 vertalign">
                            <td>{u.first_name + " " + u.last_name}</td>
                            <td className="datesale">
                              {e.reservation_experience
                                ? e.reservation_experience.createdAt.slice(0, 9)
                                : e.reservation_package.createdAt.slice(0, 9)}
                            </td>
                            <td>{e.name}</td>
                            <td className='text-center'>
                              {e.reservation_experience
                                ? e.reservation_experience.passengers
                                : e.reservation_package.passengers}
                            </td>
                            <td className='text-center'>
                              {e.reservation_experience
                                ? e.reservation_experience.total
                                : e.reservation_package.total}
                            </td>
                            <td className='text-center paymentstyle'>
                              {e.reservation_experience
                                ? e.reservation_experience.status.toUpperCase()
                                : e.reservation_package.status.toUpperCase()}
                            </td>
                            <td >
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
                                {/* Change Status */}
                                <option disable>Select Status</option>
                                <option value="Pending payment">
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
