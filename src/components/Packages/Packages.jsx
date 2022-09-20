import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Animate from "animate.css";
import styles from "../Packages/Packages.module.css";
import NavBar from "../NavBar/NavBar";
import NavBarUser from "../NavBarUser/NavBarUser";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import FilterPackages from "../../components/Filters/FilterPackages";
import { getAllPackages, getCityById, orderPackages } from "../../redux/action";
import { useHistory } from "react-router-dom";
import { getLsUser, addPackageFavorite } from "./../../redux/action.js";

export default function Card(props) {
  let prevId = 1;
  const history = useHistory();
  let pathName = history.location.pathname;
  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.allPackages);

  const [Order, setOrder] = useState("");
  const { cityId } = props.match.params;

  // Precart

  const [item, setItem] = useState({
    name: "",
    price: 0,
    pax: 1,
    dates: "",
    image: "",
    packageId: "",
    type: "package",
  });

  const handleChange = (e, name, price, image, id) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
      packageId: id,
      name,
      price,
      image,
      type: "package",
    });
  };

  const handleClickPreCart = (name, price, image, id) => {
    setItem({
      ...item,
      packageId: id,
      name: name,
      image: image,
      price: price,
      type: "package",
    });
  };

  const handleClick = () => {
    if (document.getElementById(`${item.name} passengers`).value <= 0) {
      return Swal.fire({
        title: "YOU MUST ADD AT LEAST ONE PASSENGER",
        imageUrl:
          "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663003831/VivaArg/Alerts/2_wsn0oa.png",
        imageWidth: 350,
        imageHeight: 300,
        confirmButtonColor: "#C49D48",
        imageAlt: "Custom image",
        showClass: {
          popup: "animate_animated animate_flipInY",
        },
      });
    }
    if (document.getElementById(`${item.name} dates`).value === "select") {
      return Swal.fire({
        title: "YOU MUST SELECT A DATE TO CONTINUE",
        imageUrl:
          "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663003830/VivaArg/Alerts/1_yrqksk.png",
        imageWidth: 350,
        imageHeight: 300,
        confirmButtonColor: "#C49D48",
        showClass: {
          popup: "animate_animated animate_flipInY",
        },
        imageAlt: "Custom image",
      });
    }

    let arrayItemsStore = JSON.parse(localStorage.getItem("items"));
    // console.log(document.getElementById('dates').value)
    if (arrayItemsStore === null) arrayItemsStore = [];
    if (
      arrayItemsStore.find(
        (e) => e.name === item.name && e.dates === item.dates
      )
    ) {
      document.getElementById(`${item.name} dates`).value = "select";
      return Swal.fire({
        title: "YOU ALREADY HAVE THIS ITEM IN YOUR CART",
        imageUrl:
          "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663003831/VivaArg/Alerts/3_zmfk4m.png",
        imageWidth: 350,
        imageHeight: 300,
        confirmButtonColor: "#C49D48",
        imageAlt: "Custom image",
        showClass: {
          popup: "animate_animated animate_flipInY",
        },
      });
    }
    if (
      !arrayItemsStore.find(
        (e) => e.name === item.name && e.dates === item.dates
      )
    ) {
      arrayItemsStore.push(item);
      localStorage.setItem("items", JSON.stringify(arrayItemsStore));
      // Alert
      document.getElementById(`${item.name} dates`).value = "select";
      setItem({
        name: "",
        price: 0,
        pax: 1,
        dates: "",
        image: "",
        packageId: "",
        type: "package",
      });
      return Swal.fire({
        title: "ADDED TO CART SUCCESSFULLY!",
        text: item.name,
        imageUrl: item.image,
        imageWidth: 400,
        imageHeight: 200,
        confirmButtonColor: "#C49D48",
        imageAlt: "Custom image",
        showClass: {
          popup: "animate_animated animate_flipInY",
        },
      });
    }
  };
  const addPackagesFavorites = (packageId) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.user.id;
    dispatch(addPackageFavorite(packageId, userId));
    Swal.fire({
      title: "ADDED TO FAVORITES SUCCESSFULLY!",
      text: item.name,
      imageUrl: item.image,
      imageWidth: 400,
      imageHeight: 200,
      confirmButtonColor: "#C49D48",
      imageAlt: "Custom image",
      showClass: {
        popup: "animate__animated animate__flipInY",
      },
    });
  };

  //   Fin Precart

  function handleOrder(e) {
    setOrder(e.target.value);
    console.log(Order);
    dispatch(orderPackages(e.target.value));
  }
  let userAuth = useSelector((state) => state.userAuth);

  const [data, setData] = useState(null);

  useEffect(async () => {
    dispatch(getLsUser());
    let aux = null;
    if (cityId) {
      aux = await dispatch(getCityById(cityId));
    } else {
      aux = await dispatch(getAllPackages());
    }
    setData(aux);
  }, [dispatch]);

  const btn = document.getElementById("btn");

  return (
    <Fragment>
      <div>
        <div className="container-fluid">
          {userAuth === false ? <NavBar /> : <NavBarUser />}
          <SearchBar />
          <FilterPackages handleOrder={handleOrder} />
          <br />

          {data === null ? (
            <div className={styles.loading}>
              <img
                src="https://res.cloudinary.com/dblc1bzmx/image/upload/v1663376546/VivaArg/loading_kvi4vx.gif"
                alt="Loading"
              />
            </div>
          ) : allPackages.length === 0 ? (
            <div className={styles.noFound}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    stroke="#484848"
                    stroke-linecap="round"
                    d="M37.891 50.705c4.584-1.85 8.61-5.256 11.216-9.957m2.764-9.071c.456-5.499-1.142-10.977-4.48-15.29a21.276 21.276 0 0 0-6.53-5.599c-5.845-3.24-12.566-3.444-18.403-1.139-4.65 1.836-8.739 5.265-11.375 10.022a22.488 22.488 0 0 0-2.832 10.308 22.102 22.102 0 0 0 3.058 11.86 21.288 21.288 0 0 0 8.02 7.79 21.275 21.275 0 0 0 8.427 2.594 21.853 21.853 0 0 0 10.135-1.518"
                  ></path>
                  <path
                    stroke="#484848"
                    stroke-linecap="round"
                    d="M28.774 45.86a16.046 16.046 0 0 1-9.688-4.642m-3.693-5.7c-1.4-3.695-1.38-7.782.065-11.41a15.238 15.238 0 0 1 3.392-5.144c3.384-3.384 7.97-4.852 12.444-4.417 3.564.346 7.056 1.9 9.81 4.654 1.9 1.9 3.23 4.153 3.984 6.538a15.83 15.83 0 0 1 .236 8.768 15.246 15.246 0 0 1-3.984 6.947 15.237 15.237 0 0 1-5.289 3.449 15.651 15.651 0 0 1-7.277.956"
                  ></path>
                  <g fill="#484848" fill-rule="nonzero">
                    <path d="M35.644 35.95l-12-12 .572-.572 12 12z"></path>
                    <path d="M36.215 23.95l-12 12-.57-.572 11.999-12z"></path>
                  </g>
                  <path
                    stroke="#484848"
                    stroke-linecap="square"
                    d="M52.267 52.61l-6.646-6.647"
                  ></path>
                  <path
                    fill="#FFDB15"
                    d="M61.601 54.585l-2.823-2.824c-1.405-1.405-3.988-1.099-5.768.682-1.78 1.78-2.087 4.363-.682 5.768l9.599 9.599 8.89 8.89c1.403 1.404 3.987 1.098 5.767-.682 1.78-1.78 2.086-4.364.683-5.768"
                  ></path>
                  <path
                    stroke="#484848"
                    stroke-linecap="round"
                    d="M52.095 58.273c-1.404-1.405-1.283-3.803.27-5.356s3.951-1.674 5.356-.27l9.6 9.6 8.89 8.89"
                  ></path>
                </g>
              </svg>
              <div>
                {" "}
                <h3>There are no items matching your search.</h3>
                <ul>
                  <li>
                    <strong>Check the grammar</strong> of the word.
                  </li>
                  <li>
                    Use <strong>more generic words</strong> or fewer words.
                  </li>
                  <li>
                    <a href="/packages"> Browse our packages </a>
                    to find a similar product
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              {allPackages?.map((e) => {
                return (
                  <div className="container" key={prevId++}>
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <h2
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "600",
                              fontSize: "24px",
                            }}
                            className={styles.titlepackages}
                          >
                            {e.name}
                          </h2>
                          <h4
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "700",
                              fontFamily: "Roboto",
                              fontSize: "18px",
                            }}
                          >
                            {e.subTitle}
                          </h4>
                          <h4
                            style={{
                              color: "#C49D48",
                              fontWeight: "700",
                              fontFamily: "Roboto",
                              fontSize: "18px",
                            }}
                          >
                            Score: {e.score}
                          </h4>

                          <p
                            style={{
                              fontFamily: "Roboto",
                              fontSize: "18px",
                              fontWeight: "300",
                              textAlign: "justify",
                              marginRight: "5vh",
                            }}
                          >
                            {e.description}
                          </p>
                        </div>

                        <div className={`row ${styles.pricelist}`}>
                          <div className={`col-md-6 ${styles.citybuttons}`}>
                            <ul className={styles.iconscity}>
                              <li
                                style={{
                                  color: "black",
                                  textTransform: "uppercase",
                                  fontFamily: "Roboto",
                                }}
                              >
                                <i className="bi bi-clock-history"></i>{" "}
                                {e.duration}
                              </li>
                              <li
                                style={{
                                  color: "black",
                                  textTransform: "uppercase",
                                  fontFamily: "Roboto",
                                }}
                              >
                                <i className="bi bi-currency-dollar"></i>{" "}
                                {e.price} ARS
                              </li>
                            </ul>
                          </div>
                          <div
                            className="col-md-6"
                            style={{ fontWeight: "400", fontFamily: "Roboto" }}
                          >
                            <ul className={styles.iconsexp}>
                              {
                              // {console.log(e.experiences)}
                              e.experiences?.map((e) => {
                                console.log(e)
                                return (
                                  <li className={styles.exptitle}>
                                  <i className="bi bi-compass"></i>
                                  {e.name}
                                  <br />
                                  </li>
                                )
                              })}
                              {/* <li className={styles.exptitle}>
                                <i className="bi bi-compass"></i>{" "}
                                {e.experiences ? e.experiences[0]?.name : null}{" "}
                                <br />
                              </li>
                              <li className={styles.exptitle}>
                                <i className="bi bi-compass"></i>{" "}
                                {e.experiences ? e.experiences[1]?.name : null}
                                <br />
                              </li>
                              <li className={styles.exptitle}>
                                <i className="bi bi-compass"></i>{" "}
                                {e.experiences ? e.experiences[2]?.name : null}
                                <br />
                              </li> */}
                            </ul>
                          </div>
                        </div>

                        <div className={`row mt-5 ${styles.explist}`}>
                          <div className="col-md-6">
                            <div className={styles.citybuttons}>
                              {/* Boton Modal */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleClickPreCart(
                                    e.name,
                                    e.price,
                                    e.image,
                                    e.id
                                  )
                                }
                                className="btn btn-outline-secondary btn-lg"
                                data-bs-toggle="modal"
                                data-bs-target={`#${e.name
                                  .split(" ")
                                  .join("")}`}
                                style={{ fontWeight: "700" }}
                              >
                                <i className="bi bi-cart-check"></i> ADD TO
                                CART!
                              </button>
                              {/* Fin Boton Modal */}
                            </div>

                            {/* Inicio Modal */}
                            <div
                              className="modal modal-lg fade"
                              id={e.name.split(" ").join("")}
                              tabindex="-1"
                              aria-labelledby={`${e.id}label`}
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  {/* Body Modal */}
                                  <div className="modal-body">
                                    <img
                                      className={`img-fluid ${styles.imgmodalpackages}`}
                                      src={e.image}
                                      alt=""
                                      style={{
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0 8px 8px 0 rgba(0, 0, 0, 0.15)",
                                      }}
                                    />
                                    <div>
                                      <button
                                        style={{
                                          marginTop: "10px",
                                          borderColor: "transparent",
                                        }}
                                        onClick={() =>
                                          addPackagesFavorites(e.id)
                                        }
                                      >
                                        <i
                                          id="heartbut"
                                          className="bi bi-heart-fill"
                                          style={{ fontSize: "20px" }}
                                        ></i>
                                      </button>{" "}
                                      <div id="textfav"></div>
                                    </div>
                                    <div className="mt-1">
                                      <h2
                                        className="modal-title"
                                        id={`${e.id}label`}
                                        style={{
                                          color: "#C49D48",
                                          textTransform: "uppercase",
                                          textTransform: "uppercase",
                                          fontWeight: "600",
                                          fontSize: "20px",
                                        }}
                                      >
                                        {e.name}
                                      </h2>
                                      <h4
                                        style={{
                                          fontSize: "14px",
                                          textTransform: "uppercase",
                                          fontWeight: "700",
                                        }}
                                      >
                                        {e.subTitle}
                                      </h4>
                                    </div>
                                    <p
                                      className={styles.modaldescription}
                                      style={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: "300",
                                      }}
                                    >
                                      {e.description}
                                    </p>
                                    <div class="mt-5 mb-5">
                                      <div className="row ">
                                        <div className="col-md-12">
                                          <ul className={styles.iconsmodal}>
                                            <li
                                              style={{
                                                color: "black",
                                                textTransform: "uppercase",
                                                fontFamily: "Roboto",
                                              }}
                                            >
                                              <i className="bi bi-clock-history"></i>{" "}
                                              {e.duration}
                                            </li>
                                            <li
                                              style={{
                                                color: "black",
                                                fontFamily: "Roboto",
                                              }}
                                            >
                                              <i className="bi bi-currency-dollar"></i>{" "}
                                              ARS {e.price}
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="mt-5 mb-5">
                                      <div className="row ">
                                        <div className="col-md-8">
                                          <p
                                            style={{
                                              color: "black",
                                              fontWeight: "300",
                                              fontFamily: "Roboto",
                                            }}
                                            className="text-end"
                                          >
                                            Please, select the number of
                                            passengers:
                                          </p>
                                        </div>
                                        <div className="col-md-4 text-start">
                                          <input
                                            className={styles.cantpackages}
                                            name="pax"
                                            min="1"
                                            id={`${item.name} passengers`}
                                            type="number"
                                            value={item.pax}
                                            defaultValue="1"
                                            onChange={(event) =>
                                              handleChange(
                                                event,
                                                e.name,
                                                e.price,
                                                e.image,
                                                e.id
                                              )
                                            }
                                            style={{
                                              color: "black",
                                              fontWeight: "500",
                                              fontFamily: "Roboto",
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="row ">
                                        <div className="col-md-8">
                                          <p
                                            style={{
                                              color: "black",
                                              fontWeight: "300",
                                              fontFamily: "Roboto",
                                            }}
                                            className="text-end"
                                          >
                                            Please, select a date:
                                          </p>
                                        </div>
                                        <div className="col-md-4 text-start">
                                          <select
                                            onChange={(event) =>
                                              handleChange(
                                                event,
                                                e.name,
                                                e.price,
                                                e.image,
                                                e.id
                                              )
                                            }
                                            name="dates"
                                            id={`${e.name} dates`}
                                            style={{
                                              color: "black",
                                              fontWeight: "500",
                                              fontFamily: "Roboto",
                                            }}
                                          >
                                            <option
                                              value="select"
                                              disabled
                                              selected
                                            >
                                              Select
                                            </option>
                                            {e.dates?.split(",").map((e) => {
                                              return (
                                                <option value={e}>{e} </option>
                                              );
                                            })}
                                          </select>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div class="mt-5 mb-5 text-center">
                                          <div
                                            className="col-md-12"
                                            style={{
                                              color: "black",
                                              fontWeight: "800",
                                              fontFamily: "Roboto",
                                              fontSize: "20px",
                                            }}
                                          >
                                            TOTAL:{" "}
                                            <i className="bi bi-currency-dollar"></i>
                                            ARS{" "}
                                            {e.price * item.pax < 0
                                              ? 0
                                              : e.price * item.pax}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Footer Modal */}
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleClick();
                                      }}
                                      type="button"
                                      className="btn btn-primary"
                                      style={{
                                        backgroundColor: "#C49D48",
                                        borderColor: "#C49D48",
                                        fontSize: "1.5vh",
                                      }}
                                      data-bs-dismiss="modal"
                                    >
                                      <i
                                        className="bi bi-cart-check"
                                        style={{ color: "white" }}
                                      ></i>{" "}
                                      ADD TO CART!
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Fin Modal */}
                          </div>

                          <div className="col-md-6">
                            <div className={styles.citybuttons}>
                              <Link to={"/experiences/" + e.id}>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary btn-lg"
                                  style={{ fontWeight: "600" }}
                                >
                                  {" "}
                                  View all included experiences!
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <img
                          style={{
                            borderRadius: "8px",
                            boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.15)",
                          }}
                          className={`img-fluid ${styles.packimgstyle}`}
                          src={e.image}
                          alt=""
                        />
                        {/* <CarouselPackage /> */}
                      </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <br />
      </div>
      <Footer />
    </Fragment>
  );
}
