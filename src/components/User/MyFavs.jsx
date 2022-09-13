import React, { Fragment, useState } from "react";
import styles from "./User.module.css";
import Footer from "../Footer/Footer.jsx";
import { useDispatch } from "react-redux";
import {
  removeExperienceFavorite,
  removePackageFavorite,
} from "./../../redux/action.js";

export default function MyFavs({ packages, experiences }) {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();

  let packagesfavorites =
    packages &&
    packages.filter((p) => {
      return p.reservation_package.favorite === true;
    });
  let experiencesfavorites =
    experiences &&
    experiences.filter((e) => {
      return e.reservation_experience.favorite === true;
    });

  function removeExperienceFromFavorite(experienceId) {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.user.id;
    dispatch(removeExperienceFavorite(experienceId, userId));
    if (state === false) setState(true);
    else if (state === true) setState(false);
  }

  function removePackageFromFavorite(packageId) {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.user.id;
    dispatch(removePackageFavorite(packageId, userId));
    if (state === false) setState(true);
    else if (state === true) setState(false);
  }

  return (
    <Fragment>
      <div className={`container-fluid ${styles.mytripspage}`}>
        <div className="container">
          <div className="row mb-3 mt-5">
            <h2 className="text-center">
              <i className={`bi bi-heart-fill ${styles.favheart}`}></i> MY
              FAVORITES TRIPS
            </h2>
          </div>
          {
            /* INICIO ITEMS PACKAGES */
            packagesfavorites &&
              packagesfavorites.map((p) => {
                return (
                  <div className={`row ${styles.itemmyfavs}`}>
                    <div className="col-md-12">
                      <div className={`row mt-3 mb-3 ${styles.itemmyfavs}`}>
                        {/* IMAGEN */}
                        <div className="col-md-1">
                          <img src={p.image} alt="" className="img-fluid" />
                        </div>

                        {/* TITULO Y SUB */}
                        <div className="col-md-6">
                          <h2 className="titlepackages">{p.name}</h2>
                          <h4>{p.subTitle}</h4>
                        </div>

                        {/* BOTONES */}
                        <div className="col-md-4 text-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => removePackageFromFavorite(p.id)}
                          >
                            <i className="bi bi-trash3-fill"></i> DELETE
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>
                );
              })
          }

          {
            /* INICIO ITEMS EXPERIENCES */
            experiencesfavorites &&
              experiencesfavorites.map((e) => {
                return (
                  <div className={`row ${styles.itemmyfavs}`}>
                    <div className="col-md-12">
                      <div className={`row mt-3 mb-3 ${styles.itemmyfavs}`}>
                        {/* IMAGEN */}
                        <div className="col-md-1">
                          <img src={e.image} alt="" className="img-fluid" />
                        </div>

                        {/* TITULO Y SUB */}
                        <div className="col-md-6">
                          <h2 className="titlepackages">{e.name}</h2>
                          <h4>{e.subTitle}</h4>
                        </div>

                        {/* BOTONES */}
                        <div className="col-md-4 text-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => removeExperienceFromFavorite(e.id)}
                          >
                            <i className="bi bi-trash3-fill"></i> DELETE
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>
                );
              })
          }
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
