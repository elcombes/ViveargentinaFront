import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Packages/Packages.module.css";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import FilterPackages from "../../components/Filters/FilterPackages";
import { getAllPackages, getCityById, orderPackages } from "../../redux/action";
import { useHistory } from "react-router-dom";

export default function Card(props) {
  let prevId = 1;
  const history = useHistory();
  let pathName = history.location.pathname;
  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.allPackages);

  const [Order, setOrder] = useState("");
  const { cityId } = props.match.params;

  function handleOrder(e) {
    setOrder(e.target.value);
    console.log(Order);
    dispatch(orderPackages(e.target.value));
  }

  useEffect(() => {
    if (cityId) {
      dispatch(getCityById(cityId));
    } else {
      dispatch(getAllPackages());
    }
  }, []);

  // useEffect(() => {
  //     if (cityId === "") {
  //         console.log("Todos los paquetes")
  //         dispatch(getAllPackages());
  //     }
  // }, [dispatch]);

  return (
    <Fragment>
      <div>
        <div class="container-fluid">
          <NavBar />
          <SearchBar />
          <FilterPackages handleOrder={handleOrder} />
          <br />
          {allPackages?.map((e) => {
            return allPackages === [] ? (
              <div className="noPackages">
                <img src="../images/loading-opaque.gif" alt="Loading..." />
              </div>
            ) : (
              <div class="container" key={prevId++}>
                <div class="row">
                  <div class="col-md-6">
                    <h2
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "500",
                        color: "#C49D48",
                      }}
                    >
                      {e.name}
                    </h2>
                    <h4>{e.subTitle}</h4>
                    Score: {e.score}
                    <p style={{ fontFamily: "" }}>{e.description}</p>
                    <ul className={styles.iconscity}>
                      <li>
                        <i
                          class="bi bi-clock-history"
                          style={{ color: "#C49D48", margin: "1vh" }}
                        ></i>{" "}
                        {e.duration}
                      </li>
                      <li style={{ margin: "0vh 1vh 0vh 1vh" }}>
                        ARS
                        <i
                          class="bi bi-currency-dollar"
                          style={{ color: "#C49D48" }}
                        ></i>
                        {e.price}
                      </li>

                      <div
                        className="experiencesLi"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <li>
                          <i
                            class="bi bi-compass"
                            style={{ color: "#C49D48" }}
                          ></i>
                          {e.experiences ? e.experiences[0].name : null} <br />
                        </li>
                        <li>
                          <i
                            class="bi bi-compass"
                            style={{ color: "#C49D48" }}
                          ></i>
                          {e.experiences ? e.experiences[1].name : null}
                          <br />
                        </li>
                        <li>
                          <i
                            class="bi bi-compass"
                            style={{ color: "#C49D48" }}
                          ></i>
                          {e.experiences ? e.experiences[2].name : null}
                          <br />
                        </li>
                      </div>
                    </ul>
                    <Link to={"/experiences/" + e.id}>
                      <div className={styles.citybuttons}>
                        <button
                          type="button"
                          class="btn btn-outline-secondary btn-lg"
                          style={{ margin: "1vh 1vh 1vh 0vh" }}
                        >
                          {" "}
                          View all included experiences!
                        </button>
                      </div>
                    </Link>
                    <div className={styles.citybuttons}>
                      <button
                        type="button"
                        class="btn btn-outline-secondary btn-lg"
                        style={{ margin: "1vh 1vh 1vh 0vh" }}
                      >
                        <i class="bi bi-cart-check"></i> I want it!
                      </button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <img className="img-fluid" src={e.image} alt="" />
                    {/* <CarouselPackage /> */}
                  </div>
                  <hr />
                </div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}
