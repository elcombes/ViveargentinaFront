import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Experiences/Experiences.module.css";
import Swal from "sweetalert2";
import NavBarUser from "../NavBarUser/NavBarUser";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";

import FilterExperiences from "../Filters/FilterExperiences";
import Paged from "../Paged/Paged";
import CategoriesExperiences from "./Categories.Experiences";
import {
  getAllExperiences,
  orderExperiences,
  getPackageById,
  getLsUser,
  addExperienceFavorite,
} from "../../redux/action";

export default function Experiences(props) {
  const dispatch = useDispatch();
  const allExperiences = useSelector((state) => state.allExperiences);
  let userAuth = useSelector((state) => state.userAuth);
  const [Order, setOrder] = useState("");
  const { packageId } = props.match.params;
 


  const [page, setPage] = useState(1);
  const [experiencesPage /* setExperiencesPage */] = useState(6);
  const lastExperiencePage = page * experiencesPage;
  const firstExperiencePage = lastExperiencePage - experiencesPage;

  const showExperiencesPage = allExperiences.slice(
    //.slice sirve para cortar un array y mostrar solo una cantidad de elementos determinada por el parametro que le pasemos (9)
    firstExperiencePage,
    lastExperiencePage
  );

  const paged = function (pageNumber) {
    if (pageNumber !== page) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setPage(pageNumber);
  };

  // Precart

  const [item, setItem] = useState({
    name: "",
    price: 0,
    pax: 1,
    dates: "",
    image: "",
    experienceId: "",
    tipe: "experience",
  });

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickPreCart = (name, price, image, id) => {
    setItem({
      ...item,
      experienceId: id,
      name: name,
      image: image,
      price: price,
      tipe: "experience",
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
        imageAlt: "Custom image",
      });
    }

    let arrayItemsStore = JSON.parse(localStorage.getItem("items"));
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
      });
    }
    if (
      !arrayItemsStore.find(
        (e) => e.name === item.name && e.dates === item.dates
      )
    ) {
      console.log(document.getElementById(`${item.name} dates`).value);
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
        experienceId: "",
        tipe: "experience",
      });
      return Swal.fire({
        title: "ADDED TO CART SUCCESSFULLY!",
        text: item.name,
        imageUrl: item.image,
        imageWidth: 400,
        imageHeight: 200,
        confirmButtonColor: "#C49D48",
        imageAlt: "Custom image",
      });
    }
  };

  const addExperiencesFavorites = (experienceId) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.user.id;

    dispatch(addExperienceFavorite(experienceId, userId));
  };

  //   Fin Precart

  function handleOrder(e) {
    setOrder(e.target.value);
    console.log(Order);
    dispatch(orderExperiences(e.target.value));
  }
  const [data, setData] = useState(null);

  useEffect(async() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getLsUser());
    let aux = null;
    if (packageId) {
      aux = await dispatch(getPackageById(packageId)); 
    } else {
      aux = await dispatch(getAllExperiences());
    }
    setData(aux)
  }, []);

  return (
    <Fragment>
      <div>
        <div className="container-fluid">
          {userAuth === false ? <NavBar /> : <NavBarUser />}
          <SearchBar setPage={setPage} />
          <div>
            <FilterExperiences handleOrder={handleOrder} />
          </div>
          <Paged
            experiencesPage={experiencesPage}
            allExperiences={allExperiences.length}
            paged={paged}
            currentPage={page}
          />

          <br />
          {
            data  === null? (
              <div className={styles.loading}>
                <img src="https://res.cloudinary.com/dblc1bzmx/image/upload/v1663376546/VivaArg/loading_kvi4vx.gif" alt="Loading" />
              </div>
            ) : (
              showExperiencesPage?.length === 0 ? (
                <div className={styles.noFound}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="none" fill-rule="evenodd"><path stroke="#484848" stroke-linecap="round" d="M37.891 50.705c4.584-1.85 8.61-5.256 11.216-9.957m2.764-9.071c.456-5.499-1.142-10.977-4.48-15.29a21.276 21.276 0 0 0-6.53-5.599c-5.845-3.24-12.566-3.444-18.403-1.139-4.65 1.836-8.739 5.265-11.375 10.022a22.488 22.488 0 0 0-2.832 10.308 22.102 22.102 0 0 0 3.058 11.86 21.288 21.288 0 0 0 8.02 7.79 21.275 21.275 0 0 0 8.427 2.594 21.853 21.853 0 0 0 10.135-1.518"></path><path stroke="#484848" stroke-linecap="round" d="M28.774 45.86a16.046 16.046 0 0 1-9.688-4.642m-3.693-5.7c-1.4-3.695-1.38-7.782.065-11.41a15.238 15.238 0 0 1 3.392-5.144c3.384-3.384 7.97-4.852 12.444-4.417 3.564.346 7.056 1.9 9.81 4.654 1.9 1.9 3.23 4.153 3.984 6.538a15.83 15.83 0 0 1 .236 8.768 15.246 15.246 0 0 1-3.984 6.947 15.237 15.237 0 0 1-5.289 3.449 15.651 15.651 0 0 1-7.277.956"></path><g fill="#484848" fill-rule="nonzero"><path d="M35.644 35.95l-12-12 .572-.572 12 12z"></path><path d="M36.215 23.95l-12 12-.57-.572 11.999-12z"></path></g><path stroke="#484848" stroke-linecap="square" d="M52.267 52.61l-6.646-6.647"></path><path fill="#FFDB15" d="M61.601 54.585l-2.823-2.824c-1.405-1.405-3.988-1.099-5.768.682-1.78 1.78-2.087 4.363-.682 5.768l9.599 9.599 8.89 8.89c1.403 1.404 3.987 1.098 5.767-.682 1.78-1.78 2.086-4.364.683-5.768"></path><path stroke="#484848" stroke-linecap="round" d="M52.095 58.273c-1.404-1.405-1.283-3.803.27-5.356s3.951-1.674 5.356-.27l9.6 9.6 8.89 8.89"></path></g></svg>
                  <div> <h3>There are no items matching your search.</h3><ul><li><strong>Check the grammar</strong> of the word.</li><li>Use <strong>more generic words</strong> or fewer words.</li><li><a href="/experiences"> Browse our experiences </a>
                    to find a similar product</li></ul></div>
                </div>
              ) : (
                <div>
                  {showExperiencesPage?.map((e) => {
                    return (
                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <h2
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "600",
                                color: "#C49D48",
                                fontSize: "24px",
                              }}
                            >
                              {e.name[0].toUpperCase() + e.name.slice(1)}
                            </h2>
                            <h4
                              style={{
                                fontSize: "18px",
                                textTransform: "uppercase",
                                fontWeight: "500",
                                fontFamily: "Roboto",
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
                              Score:{e.score}
                            </h4>
                            <p
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "20px",
                                fontWeight: "300",
                                textAlign: "justify",
                                marginRight: "5vh",
                              }}
                            >
                              {e.description}
                            </p>
                            <div className={styles.priceandcart}>
                              <ul className={styles.iconsexperience}>
                                <li
                                  style={{
                                    color: "black",
                                    textTransform: "uppercase",
                                    fontFamily: "Roboto",
                                  }}
                                >
                                  ARS
                                  <i
                                    class="bi bi-currency-dollar"
                                    style={{ color: "#C49D48" }}
                                  ></i>
                                  {e.price}
                                </li>
                                <li
                                  style={{
                                    color: "black",
                                    textTransform: "uppercase",
                                    fontFamily: "Roboto",
                                  }}
                                >
                                  <i
                                    className="bi bi-clock-history"
                                    style={{ color: "#C49D48" }}
                                  ></i>{" "}
                                  {e.duration}
                                </li>
                              </ul>
                              <div className={styles.citybuttons}>
                                {/* Boton Modal */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleClickPreCart(e.name, e.price, e.image, e.id)
                                  }
                                  className="btn btn-outline-secondary btn-lg"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#${e.name
                                    .toLowerCase()
                                    .split(" ")
                                    .join("")}`}
                                >
                                  <i className="bi bi-cart-check"></i> ADD TO CART!
                                </button>
                                {/* Fin Boton Modal */}
                              </div>

                              {/* Inicio Modal */}
                              <div
                                className="modal modal-lg fade"
                                id={e.name.toLowerCase().split(" ").join("")}
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
                                        style={{
                                          borderRadius: "8px",
                                          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.15)",
                                        }}
                                        src={e.image}
                                        alt=""
                                      />
                                      <div>

                                        <button
                                          onClick={() => addExperiencesFavorites(e.id)}
                                          style={{
                                            marginTop: "10px",
                                            borderColor: "transparent",
                                          }}
                                        >


                                          <i
                                            class="bi bi-heart-fill"
                                            style={{
                                              fontSize: "20px",
                                              paddingTop: "2vh",
                                            }}
                                          ></i>
                                        </button>
                                      </div>
                                      <div className="mt-5">
                                        <h2
                                          className="modal-title"
                                          id={`${e.id}label`}
                                          style={{
                                            color: "#C49D48",
                                            textTransform: "uppercase",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {e.name}
                                        </h2>
                                        <h4
                                          style={{
                                            fontSize: "16px",
                                            textTransform: "uppercase",
                                            fontWeight: "600",
                                          }}
                                        >
                                          {e.subTitle}
                                        </h4>
                                      </div>
                                      <p
                                        style={{
                                          fontFamily: "Roboto",
                                          fontSize: "16px",
                                          fontWeight: "300",
                                          textAlign: "justify",
                                        }}
                                        className={styles.modaldescription}
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
                                              {console.log(e.experiences)}
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
                                              Please, select the number of passengers:
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
                                              onChange={(event) => handleChange(event)}
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
                                              Please, select date:
                                            </p>
                                          </div>
                                          <div className="col-md-4 text-start">
                                            <select
                                              onChange={(event) => handleChange(event)}
                                              name="dates"
                                              id={`${e.name} dates`}
                                              style={{
                                                color: "black",
                                                fontWeight: "500",
                                                fontFamily: "Roboto",
                                              }}
                                            >
                                              <option value="select" disabled selected>
                                                Select
                                              </option>
                                              {e.dates?.split(",").map((e) => {
                                                return <option value={e}>{e} </option>;
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
                                                fontSize: "18px",
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
                                        CANCEL
                                      </button>
                                      <button
                                        onClick={(event) => {
                                          handleClick(event);
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
                          </div>
                          <div className="col-md-6 mb-5">
                            <img
                              style={{
                                borderRadius: "8px",
                                boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.15)",
                              }}
                              className={`img-fluid ${styles.expimgstyle}`}
                              src={e.image}
                              alt=""
                            />
                            {/* <CarouselExperiences /> */}
                          </div>

                          <hr />
                          <br />
                        </div>
                        <br />
                      </div>
                    );
                  })}
                </div>
              ))}

          <div className={styles.experiencesbuttons}>
            <Paged
              experiencesPage={experiencesPage}
              allExperiences={allExperiences.length}
              paged={paged}
              currentPage={page}
            />
          </div>
          <div className={styles.separator}></div>
          <div className="container">
            <CategoriesExperiences />
          </div>

          <div className={styles.separator}></div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
