import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSales,
  filterSalesStatus,
  updateSaleStatus,
} from "../../redux/action";
import "./SalesTable.css";
import MyTripDetail from "./../User/MyTripDetail";

export default function SalesTable() {
  const dispatch = useDispatch();
  let filteredSales = useSelector((state) => state.filteredSales);
  const [state, setState] = React.useState(false);

  let handleUpdateStatus = async (event, saleId) => {
    event.preventDefault();
    let status = event.target.value;
    let newStatus = { status: status, saleId: saleId };

    await dispatch(updateSaleStatus(newStatus));
    dispatch(getAllSales());
  };

  function handleFilterStatus(e) {
    e.preventDefault();
    if (state === true) {
      setState(false);
    } else {
      setState(true);
    }
    dispatch(filterSalesStatus(e.target.value));
  }

  useEffect(() => {
    dispatch(getAllSales());
  }, []);

  return (
    <div class="container mt-5 ">
      <div class="d-flex justify-content-center row ">
        <div class="col-md-10">
          <div class="rounded">
            <div class="table-responsive table-borderless">
              {/* Filtro de  Status */}
              <div class="table-create">
                <span> Filter </span>
                <select
                  onChange={(e) => handleFilterStatus(e)}
                  className="form-select selectBtn"
                >
                  <option disabled selected>
                    Select Status
                  </option>
                  <option value="all">All</option>
                  <option value="Pending payment">Pending payment</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="canceled">canceled</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <br />
              <table class="table table-bordered ">
                {/* Encabezado de columnas */}
                <thead className="text-center">
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
                  {filteredSales?.map((s) => {
                    return (
                      <Fragment>
                        <tr class="cell-1 vertalign">
                          <td>{s.user.first_name + " " + s.user.last_name}</td>
                          <td className="datesale">
                            {s.createdAt.slice(0, 9)}
                          </td>
                          <td className="text-center">
                            <MyTripDetail
                              packages={s.packages}
                              experiences={s.experiences}
                              saleId={s.id}
                            />
                          </td>
                          <td className="text-center">{s.total}</td>
                          <td className="text-center paymentstyle">
                            {s.status.toUpperCase()}
                          </td>
                          <td>
                            <select
                              onChange={(event) =>
                                handleUpdateStatus(event, s.id)
                              }
                              className="form-select statusChange"
                            >
                              {/* Change Status */}
                              <option disabled selected>
                                Select Status
                              </option>
                              <option value="Pending payment">
                                Pending payment
                              </option>
                              <option value="confirmed">Confirmed</option>
                              <option value="canceled">canceled</option>
                              <option value="done">Done</option>
                            </select>
                          </td>
                        </tr>
                      </Fragment>
                    );
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
