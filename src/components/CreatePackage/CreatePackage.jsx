// import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import styles from "../CreatePackage/CreatePackage.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { createNewPackage, getAllPackages, getAllCities } from "../../redux/action";

function validate(newPackage) {
  let errors = {};
  if (!newPackage.name) {
    errors.name = "Name is required"
  }
  if (!newPackage.subTitle) {
    errors.subTitle = "Subtitle is required"
  }
  if (!newPackage.price) {
    errors.price = "Price is required"
  }
  if (newPackage.price < 0) {
    errors.price = "Price cannot be less than 0"
  }
  if (!newPackage.duration) {
    errors.duration = "Duration is required"
  }
  if (!newPackage.dates) {
    errors.dates = "At least 1 date is required"
  }
  if (!newPackage.description) {
    errors.description = "Description is required"
  }
  if (!newPackage.categoryId) {
    errors.categoryId = "Category is required"
  }
  if (!newPackage.packageId) {
    errors.packageId = "Package is required"
  }
  if (!newPackage.image) {
    errors.image = "Image is required"
  }

  return errors
}

export default function Packages() {

  const history = useHistory()
  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.allPackages);
  const allCities = useSelector((state) => state.allCities);
  const [newPackage, setNewPackage] = useState({
    name: "",
    subTitle: "",
    price: "",
    description: "",
    image: "",
    video: "",
    duration: "",
    stock: "",
    dates: "",
    categoryId: "",
    packageId: "",
  });
  const [errors, setErrors] = useState({})


  useEffect(() => {
    dispatch(getAllPackages());
    dispatch(getAllCities());
    setErrors(validate(newPackage))
  }, []);

  const handleChange = (e) => {
    setNewPackage({
      ...newPackage,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
      ...newPackage,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmit = (e) => {
    let errorMessagesNodeList = document.querySelectorAll("#errors")
    let errorMessagesArray = Array.from(errorMessagesNodeList)
    if (Object.entries(errors).length > 0) {
      e.preventDefault()
      e.stopPropagation()
      errorMessagesArray.forEach(e => e.hidden = false)
    } else {
    dispatch(createNewPackage(newPackage));
    }
  };

  return (
    <div>
      <div className={styles.separator}></div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.modalbuttons}>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#cexampleModal"
              >
                <i className="bi bi-node-plus"></i> New Package
              </button>
            </div>

            <div
              className="modal modal-lg fade"
              id="cexampleModal"
              tabIndex="-1"
              aria-labelledby="cexampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" style={{marginTop:"90px"}}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="cexampleModalLabel">
                      CREATE A NEW PACKAGE
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form class="row g-3" onSubmit={(e) => handleSubmit(e)}>
                      <div class="row">
                        <div class="col-md-6">
                          <label className="infoLabel">NAME</label>
                          <input
                            className='form-control form-inputContact'
                            type="text"
                            value={newPackage.name}
                            name="name"
                            placeholder="Not to be missed in Salta"
                            onChange={(e) => handleChange(e)} />
                          {errors.name ?
                            <p id="errors" hidden>{errors.name}</p> :
                            <p className="validMessage">Looks Good!</p>
                          }
                        </div>
                        <div class="col-md-6">
                          <label className="infoLabel">SUBTITLE </label>
                          <input
                            className='form-control form-inputContact'
                            type="text"
                            value={newPackage.subTitle}
                            name="subTitle"
                            placeholder="What you can't miss"
                            onChange={(e) => handleChange(e)} />
                          {errors.subTitle ?
                            <p id="errors" hidden>{errors.subTitle}</p> :
                            <p className="validMessage">Looks Good!</p>
                          }
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div style={{ flexWrap: "nowrap", alignItems: "center", marginTop: "10px" }} class="input-group">
                            <label style={{ paddingRight: "5px" }} class="col-sm-2" className="infoLabel">PRICE</label>
                            <span style={{ height: "41px", fontSize: "16px" }} class="input-group-text">$</span>
                            <input
                              style={{ width: "100%" }}
                              type="text"
                              class="col-sm-2"
                              className='form-control form-inputContact'
                              value={newPackage.price}
                              name="price"
                              placeholder="7500"
                              onChange={(e) => handleChange(e)} />
                            {errors.price ?
                              <p id="errors" hidden>{errors.price}</p> :
                              <p className="validMessage">Looks Good!</p>
                            }
                          </div>

                          <div style={{ flexWrap: "nowrap", alignItems: "center", paddingTop: "22px" }} class="input-group">
                            <label style={{ paddingRight: "5px" }} class="col-sm-2" className="infoLabel">DURATION</label>
                            <input
                              // style={{width:"100%"}}
                              type="text"
                              class="col-sm-2"
                              className='form-control form-inputContact'
                              value={newPackage.duration}
                              name="duration"
                              placeholder="4 days"
                              onChange={(e) => handleChange(e)} />
                            {errors.duration ?
                              <p id="errors" hidden>{errors.duration}</p> :
                              <p className="validMessage">Looks Good!</p>
                            }
                          </div>

                          <div style={{ flexWrap: "nowrap", alignItems: "center", paddingTop: "22px" }} class="input-group">
                            <label style={{ paddingRight: "5px" }} class="col-sm-2" className="infoLabel">DATES</label>
                            <input
                              // style={{width:"100%"}}
                              type="text"
                              class="col-sm-2"
                              className='form-control form-inputContact'
                              value={newPackage.dates}
                              name="dates"
                              placeholder="23/05/2023, 08/03/2023"
                              onChange={(e) => handleChange(e)} />
                            {errors.dates ?
                              <p id="errors" hidden>{errors.dates}</p> :
                              <p className="validMessage">Looks Good!</p>
                            }
                          </div>

                        </div>
                        <div class="col">
                          <label className="infoLabel">DESCRIPTION </label>
                          <textarea
                            style={{ height: "150px", fontSize: "12px" }}
                            className='form-control form-inputContact'
                            type="text"
                            value={newPackage.description}
                            name="description"
                            placeholder="What to do in Salta, the answer will always be..."
                            onChange={(e) => handleChange(e)} />
                          {errors.description ?
                            <p id="errors" hidden>{errors.description}</p> :
                            <p className="validMessage">Looks Good!</p>
                          }
                        </div>
                      </div>
                      <div class="row-md-6"></div>
                      <div class="row">
                        <div class="col-md-6">
                          <select onChange={(e) => handleChange(e)} name="packageId"
                            value={newPackage.packageId} class="form-select form-select-lg mb-3">
                            <option selected>SELECT A CITY</option>
                            {allCities?.map(e => {
                              return <option value={e.name}>{e.name}</option>
                            })}
                          </select>
                          {errors.packageId ?
                            <p id="errors" hidden>{errors.packageId}</p> :
                            <p className="validMessage">Looks Good!</p>
                          }
                        </div>                   
                      </div>
                      <div class="row">
                        <div class="col">
                          <label className="infoLabel">IMAGE </label>
                          <div class="input-group mb-3">
                            <input 
                            style={{ minHeight: "0px" }} 
                            type="file" 
                            className='form-control form-inputContact'
                            value={newPackage.image}
                            name="image"
                            onChange={(e) => handleChange(e)}
                            />
                            {errors.image ?
                            <p id="errors" hidden>{errors.image}</p> :
                            <p className="validMessage">Looks Good!</p>
                          }
                          </div>
                        </div>
                        <div class="col-md-6" style={{ display: "flex", alignItems: "center" }}>
                          <button style={{ fontSize: "1.6vh", fontFamily: "Raleway", backgroundColor: "#C49D48", borderColor: "#C49D48", borderRadius: "5px", width: "100%", marginTop: "8px", marginRight: "0px" }} type="submit" >CREATE PACKAGE</button>
                        </div>

                      </div>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.separator}></div>
    </div>
  );
}
