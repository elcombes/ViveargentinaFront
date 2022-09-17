import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews, deleteReview } from "../../redux/action";


export default function ReviewsTable() {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.allReviews);
  const [state, setState] = React.useState({ change: false });
  const history = useHistory()

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

    async function  handleDelete(reviewId) {
    
    if (state.change === true) {
      setState({ change: false });
      console.log(state);
    } else {
      setState({ change: true });
      console.log(state);
    }
    
    await dispatch(deleteReview(reviewId));
    history.go(0);
  }

  return (
    <div class="container mt-5">
      <div class="d-flex justify-content-center row">
        <div class="col-md-10">
          <div class="rounded">
            <div class="table-responsive table-borderless">
              <div class="table-create">
                
              </div>
              <br />
              <table class="table table-bordered">
                {/* Encabezado de columnas */}
                <thead>
                  <tr className="text-center">
                    <th>DATE</th>
                    <th>TITLE</th>
                    <th>REVIEW</th>
                    <th>DELETE</th>
                  </tr>
                </thead>

                {/* Contenido - Filas */}

                {allReviews?.map((r) => {
                  return (
                    <tbody class="table-body" key={r.id}>
                      <tr class="cell-1 vertalign">
                        <td className="datesale" >{r.createdAt.slice(0, 10)}</td>
                        <td>{r.date}</td>
                        <td className="text-center">{r.text}</td>
                        <td className="text-center controlbuttonsexp">
                          <button className="btn btn-outline-secondary" onClick={()=> handleDelete(r.id)}>
                            <span class="bi bi-sign-stop-fill"></span>
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
