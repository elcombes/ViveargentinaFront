import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCities } from "../../redux/action";

import City from "../City/City";
import NavBar from "../NavBar/NavBar";
import NavBarUser from "../NavBarUser/NavBarUser";
import SearchBar from "../SearchBar/SearchBar";

import styles from "../Cities/Cities.module.css";
import { getLsUser } from "./../../redux/action.js"

export default function Card() {
  let prevId = 1;
  const dispatch = useDispatch();
  const allCities = useSelector((state) => state.allCities);

  let userAuth = useSelector((state) => state.userAuth)

  useEffect(() => {
    dispatch(getLsUser())
    dispatch(getAllCities());
  }, [dispatch]);

  return (
    <Fragment>
      {userAuth === false ?
        <NavBar /> :
        <NavBarUser />
      }

      <SearchBar />

      <div class="container-fluid">
        <br />

        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                {
                  allCities?.map((e) => {
                    return allCities === [] ? (
                      <div className="noCities">
                        <img src="../images/loading-opaque.gif" alt="Loading..." />
                      </div>
                    ) : (
                      <div class="accordion-item" key={prevId++}>
                        {/* INICIO ITEM */}
                        <h2 class="accordion-header" id="flush-heading">
                          {/* INICIO BOTON */}
                          <button
                            class="accordion-button collapsed"
                            className={styles.city01}
                            style={{
                              borderRadius: 80, margin: 1.5, backgroundImage: `url(${e.image.split(" ")[2]})`
                            }}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${e.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("")}`}
                            aria-expanded="false"
                            aria-controls={e.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("")}
                          >
                            {e.name}
                          </button>
                        </h2>
                        {/* FIN BOTON */}
                        <div
                          id={e.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("")}
                          class="accordion-collapse collapse"
                          aria-labelledby={`flush-heading${e.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("")}`}
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div class="accordion-body">
                            <City
                              name={e.name}
                              subtitle={e.subTitle}
                              score={e.score}
                              description={e.description}
                              image={e.image}
                              id={e.id}
                            />
                          </div>
                        </div>
                      </div>
                    );
                    {/* FIN ITEM */ }
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
