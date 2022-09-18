import React from "react";
import styles from "./MyTripDetail.module.css";

export default function MyTripDetail({ packages, experiences, saleId }) {
  return (
    <div>
      <button
        class="btn btn-outline-secondary btn-lg"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvasRight${saleId}`}
        aria-controls="offcanvasRight"
        style={{
          borderColor: "#c49d48e3",
          borderRadius: "50%",
        }}
      >
        Detail
      </button>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id={`offcanvasRight${saleId}`}
        aria-labelledby="offcanvasRightLabel"
        style={{
          background: "radial-gradient(circle at top, #C49D48 , #ffffff)",
        }}
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            <h4 style={{ fontSize: "30px", color: "white" }}>
              <i
                class="bi bi-cart"
                style={{ fontSize: "30px", margin: "20px" }}
              ></i>{" "}
              DETAIL
            </h4>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          {packages?.map((p) => {
            return (
              <div className={`"container" ${styles.itemcart}`}>
                <div className={`"row mt-3 mb-4" ${styles.rowimgtitle}`}>
                  <div className="col-md-4 mb-1">
                    <img
                      className={`"img-fluid" ${styles.imgitemcart}`}
                      src={p.image}
                      alt=""
                    />
                  </div>
                  <div className="col-md-8 mb-1">
                    <h4 className={styles.titlecart}>{p.name} </h4>
                    <h4 className={styles.datescart}>
                      {" "}
                      {p.sale_package.dates}{" "}
                    </h4>
                  </div>
                </div>
                <div className={`row mb-3 mt-3 ${styles.enditemscart}`}>
                  <div className="col-md-4 text-center">
                    <ul className={styles.buttonitemcart}>
                      <li>
                        <div className={styles.itempax}>
                          {" "}
                          {p.sale_package.passengers}{" "}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 text-center">
                    <h4 className={styles.pricecart}>
                      ARS$ {p.sale_package.total}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
          {experiences?.map((p) => {
            return (
              <div className={`"container" ${styles.itemcart}`}>
                <div className={`"row mt-3 mb-4" ${styles.rowimgtitle}`}>
                  <div className="col-md-4 mb-1">
                    <img
                      className={`"img-fluid" ${styles.imgitemcart}`}
                      src={p.image}
                      alt=""
                    />
                  </div>
                  <div className="col-md-8 mb-1">
                    <h4 className={styles.titlecart}>{p.name} </h4>
                    <h4 className={styles.datescart}>
                      {" "}
                      {p.sale_experience.dates}{" "}
                    </h4>
                  </div>
                </div>
                <div className={`row mb-3 mt-3 ${styles.enditemscart}`}>
                  <div className="col-md-4 text-center">
                    <ul className={styles.buttonitemcart}>
                      <li>
                        <div className={styles.itempax}>
                          {" "}
                          {p.sale_experience.passengers}{" "}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 text-center">
                    <h4 className={styles.pricecart}>
                      ARS$ {p.sale_experience.total}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
