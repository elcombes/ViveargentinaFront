import React, { Fragment } from "react";

import styles from "./User.module.css";

export default function MyTrips({ packages, experiences }) {
  let packagesBought =
    packages &&
    packages.filter((p) => {
      return p.reservation_package.bought === true;
    });
  let experiencesBought =
    experiences &&
    experiences.filter((e) => {
      return e.reservation_experience.bought === true;
    });

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="container">
          <div className="row mb-3 mt-5">
            <h2 className="text-center">
              <i className={`bi bi-airplane-fill ${styles.tripicon}`}></i> MY
              TRIPS LIST{" "}
            </h2>
          </div>

          {
            /* INICIO ITEM PACKAGES */
            packagesBought?.length === 0 && experiencesBought?.length === 0 ? <h2>You have no trips yet</h2> :
              packagesBought?.map((p) => {
                return (
                  <div className={`row ${styles.itemmytrips}`}>
                    <div className="col-md-6">
                      <div className="row mt-3 mb-3">
                        <div className="col-sm-2">
                          <img src={p.image} alt="" className="img-fluid" />
                        </div>
                        <div className="col-sm-6">
                          <h2 className="titlepackages">{p.name}</h2>
                          <h4>{p.subTitle}</h4>
                        </div>
                        <div className={`col-md-3 text-center ${styles.date}`}>
                          <p>{p.reservation_package.dates}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row mt-3 mb-6">
                        <div className={`col-md-3 text-center ${styles.price}`}>
                          <p>$ {p.reservation_package.total}</p>
                        </div>
                        <div
                          className={`col-md-3 text-center ${styles.status}`}
                        >
                          <p>{p.reservation_package.status}</p>
                        </div>
                        <div className="col-md-6 text-center">
                          <button type="button" className="btn btn-secondary">
                            <i className="bi bi-cart"></i> BUY AGAIN!
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })
          }

          {
            /* INICIO ITEM PACKAGES */
            experiencesBought &&
              experiencesBought.map((e) => {
                return (
                  <div className={`row ${styles.itemmytrips}`}>
                    <div className="col-md-6">
                      <div className="row mt-3 mb-3">
                        <div className="col-sm-2">
                          <img src={e.image} alt="" className="img-fluid" />
                        </div>
                        <div className="col-sm-6">
                          <h2 className="titlepackages">{e.name}</h2>
                          <h4>{e.subTitle}</h4>
                        </div>
                        <div className={`col-md-3 text-center ${styles.date}`}>
                          <p>{e.reservation_experience.dates}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row mt-3 mb-6">
                        <div className={`col-md-3 text-center ${styles.price}`}>
                          <p>$ {e.reservation_experience.total}</p>
                        </div>
                        <div
                          className={`col-md-3 text-center ${styles.status}`}
                        >
                          <p>{e.reservation_experience.status}</p>
                        </div>
                        <div className="col-md-6 text-center">
                          <button type="button" className="btn btn-secondary">
                            <i className="bi bi-cart"></i> BUY AGAIN!
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })
          }
        </div>
      </div>
    </Fragment>
  );
}
