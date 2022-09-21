import React, { useEffect } from "react";
import styles from "../CreateExperience/CreateExperience.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from 'axios';
import Swal from "sweetalert2";

import { useHistory } from "react-router-dom";
import {
  createNewExperience,
  getAllPackages,
  getAllCategories,
} from "../../redux/action";

function validate(newExperience) {
  let errors = {};
  if (!newExperience.name) {
    errors.name = "Name is required";
  }
  if (!newExperience.subTitle) {
    errors.subTitle = "Subtitle is required";
  }
  if (!newExperience.price) {
    errors.price = "Price is required";
  }
  if (newExperience.price < 0) {
    errors.price = "Price cannot be less than 0";
  }
  if (typeof newExperience.price !== 'number') {
    errors.price = "Price must be a number"
  }
  if (!newExperience.duration) {
    errors.duration = "Duration is required";
  }
  if (!newExperience.dates) {
    errors.dates = "At least 1 date is required";
  }
  if (!newExperience.description) {
    errors.description = "Description is required";
  }
  if (!newExperience.categoryId) {
    errors.categoryId = "Category is required";
  }
  if (!newExperience.packageId) {
    errors.packageId = "Package is required";
  }
  if (!newExperience.image) {
    errors.image = "Image is required"
  }
  return errors;
}

export default function Experiences() {
  const history = useHistory();
  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.allPackages);
  const allCategories = useSelector((state) => state.allCategories);
  const [newExperience, setNewExperience] = useState({
    name: "",
    subTitle: "",
    price: 0,
    description: "",
    image: "",
    duration: "",
    dates: "",
    categoryId: "",
    packageId: "",
  });

function clearState() {
  setNewExperience({
    name: "",
    subTitle: "",
    price: 0,
    description: "",
    image: "",
    duration: "",
    dates: "",
    categoryId: "",
    packageId: "",
  })
  setErrors(validate({
    name: "",
    subTitle: "",
    price: 0,
    description: "",
    image: "",
    duration: "",
    dates: "",
    categoryId: "",
    packageId: "",
  }));
  let errorMessagesNodeList = document.querySelectorAll("#errors");
  let errorMessagesArray = Array.from(errorMessagesNodeList);
  errorMessagesArray.forEach((e) => {return (e.hidden = true)});
  document.getElementById('select1').value = 'select'
  document.getElementById('select2').value = 'select'

}

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllPackages());
    dispatch(getAllCategories());
    setErrors(validate(newExperience));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "price") {
      setNewExperience({
        ...newExperience,
        [e.target.name]: parseInt(e.target.value),
      });
      setErrors(
        validate({
          ...newExperience,
          [e.target.name]: parseInt(e.target.value),
        })
      )
    }
    else { 
    setNewExperience({
      ...newExperience,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
        ...newExperience,
        [e.target.name]: e.target.value,
      })
    )}
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let errorMessagesNodeList = document.querySelectorAll("#errors")
    let errorMessagesArray = Array.from(errorMessagesNodeList)

    if (Object.entries(errors).length > 0) {
      e.preventDefault();
      e.stopPropagation();
      errorMessagesArray.forEach((e) => (e.hidden = false));
    } else {
      dispatch(createNewExperience(newExperience));
      setNewExperience({
        name: "",
        subTitle: "",
        price: 0,
        description: "",
        image: "",
        duration: "",
        dates: "",
        categoryId: "",
        packageId: "",
      })
      setTimeout(() => {
        return Swal.fire({
          title: "NEW EXPERIENCE CREATED!",
          confirmButtonColor: "#C49D48",
          showClass: {
            popup: 'animate__animated animate__flipInY'
          },
        });  
      }, 500);
      
    }
  };

  let imageDB;
  const uploadImage = (selectedImage) => {
    const formData = new FormData()
    formData.append('file', selectedImage)
    formData.append('upload_preset', 'fftkpmfl')
    Axios.post('https://api.cloudinary.com/v1_1/dblc1bzmx/image/upload', formData).then((res) => {
      imageDB = (res.data.url)
      setNewExperience({
        ...newExperience,
        image: imageDB
      });
      console.log(imageDB)
      console.log(res)
    })
  }

  const handleImageSelected = (e) => {
    console.log(e.target.files[0])
    let selectedImage = e.target.files[0]
    uploadImage(selectedImage)
    setErrors(validate({
      ...newExperience,
      image: e.target.files[0].name
    }))
  }

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
                <i className="bi bi-node-plus"></i> New Experience
              </button>
            </div>

            <div
              className="modal modal-lg fade"
              id="cexampleModal"
              tabIndex="-1"
              data-bs-backdrop="static"
              aria-labelledby="cexampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" style={{ marginTop: "90px" }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="cexampleModalLabel">
                      CREATE A NEW EXPERIENCE
                    </h5>
                    <button onClick={() => clearState()}
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form class="row g-3" onSubmit={(e) => handleSubmit(e)} >
                      <div class="row">
                        <div class="col-md-6">
                          <label className="infoLabel">Name </label>
                          <input
                            className="form-control infoInput"
                            type="text"
                            value={newExperience.name}
                            name="name"
                            placeholder="Excursion to Las Cataratas del Iguazu"
                            onChange={(e) => handleChange(e)}
                          />
                          {errors.name ? (
                            <p id="errors" hidden>
                              {errors.name}
                            </p>
                          ) : (
                            <p className="validMessage">Looks Good!</p>
                          )}
                        </div>
                        <div class="col-md-6">
                          <label className="infoLabel">Subtitle </label>
                          <input
                            className="form-control infoInput"
                            type="text"
                            value={newExperience.subTitle}
                            name="subTitle"
                            placeholder="Get wet"
                            onChange={(e) => handleChange(e)}
                          />
                          {errors.subTitle ? (
                            <p id="errors" hidden>
                              {errors.subTitle}
                            </p>
                          ) : (
                            <p className="validMessage">Looks Good!</p>
                          )}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div
                            style={{
                              flexWrap: "nowrap",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                            class="input-group"
                          >
                            <label
                              style={{ paddingRight: "5px" }}
                              class="col-sm-2"
                              className="infoLabel"
                            >
                              Price
                            </label>
                            <span
                              style={{ height: "41px", fontSize: "16px" }}
                              class="input-group-text"
                            >
                              $
                            </span>
                            <input
                              style={{ width: "100%" }}
                              type="number"
                              class="col-sm-2"
                              className="form-control infoInput"
                              value={newExperience.price}
                              name="price"
                              placeholder="7500"
                              onChange={(e) => handleChange(e)}
                            />
                            {errors.price ? (
                              <p id="errors" hidden>
                                {errors.price}
                              </p>
                            ) : (
                              <p className="validMessage">Looks Good!</p>
                            )}
                          </div>

                          <div
                            style={{
                              flexWrap: "nowrap",
                              alignItems: "center",
                              paddingTop: "22px",
                            }}
                            class="input-group"
                          >
                            <label
                              style={{ paddingRight: "5px" }}
                              class="col-sm-2"
                              className="infoLabel"
                            >
                              Duration
                            </label>
                            <input
                              // style={{width:"100%"}}
                              type="text"
                              class="col-sm-2"
                              className="form-control infoInput"
                              value={newExperience.duration}
                              name="duration"
                              placeholder="3 hours"
                              onChange={(e) => handleChange(e)}
                            />
                            {errors.duration ? (
                              <p id="errors" hidden>
                                {errors.duration}
                              </p>
                            ) : (
                              <p className="validMessage">Looks Good!</p>
                            )}
                          </div>

                          <div
                            style={{
                              flexWrap: "nowrap",
                              alignItems: "center",
                              paddingTop: "22px",
                            }}
                            class="input-group"
                          >
                            <label
                              style={{ paddingRight: "5px" }}
                              class="col-sm-2"
                              className="infoLabel"
                            >
                              Dates
                            </label>
                            <input
                              // style={{width:"100%"}}
                              type="text"
                              class="col-sm-2"
                              className="form-control infoInput"
                              value={newExperience.dates}
                              name="dates"
                              placeholder="23-may-23, 08-mar-23"
                              onChange={(e) => handleChange(e)}
                            />
                            {errors.dates ? (
                              <p id="errors" hidden>
                                {errors.dates}
                              </p>
                            ) : (
                              <p className="validMessage">Looks Good!</p>
                            )}
                          </div>
                        </div>
                        <div class="col">
                          <label className="infoLabel">Description </label>
                          <textarea
                            style={{ height: "150px", fontSize: "12px" }}
                            className="infoInput"
                            type="text"
                            value={newExperience.description}
                            name="description"
                            placeholder="What to do in Salta, the answer will always be..."
                            onChange={(e) => handleChange(e)}
                          />
                          {errors.description ? (
                            <p id="errors" hidden>
                              {errors.description}
                            </p>
                          ) : (
                            <p className="validMessage">Looks Good!</p>
                          )}
                        </div>
                      </div>
                      <div class="row-md-6"></div>
                      <div class="row">
                        <div class="col-md-6">
                          <select
                            id="select1"
                            onChange={(e) => handleChange(e)}
                            name="packageId"
                            // value={newExperience.packageId}
                            class="form-select form-select-lg mb-3"
                          >
                            <option value='select' disabled selected>Select a Package</option>
                            {allPackages?.map(e => {
                              return <option value={e.id}>{e.name}</option>

                            })}
                          </select>
                          {errors.packageId ? (
                            <p id="errors" hidden>
                              {errors.packageId}
                            </p>
                          ) : (
                            <p className="validMessage">Looks Good!</p>
                          )}
                        </div>
                        <div class="col-md-6">
                          <select
                            onChange={(e) => handleChange(e)}
                            name="categoryId"
                            id="select2"
                            // value={newExperience.categoryId}
                            class="form-select form-select-lg mb-3"
                          >
                            <option value='select' disabled selected>Select a Category</option>
                            {allCategories?.map(e => {
                              return <option value={e.id}>{e.name}</option>

                            })}
                          </select>
                          {errors.categoryId ? (
                            <p id="errors" hidden>
                              {errors.categoryId}
                            </p>
                          ) : (
                            <p className="validMessage">Looks Good!</p>
                          )}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <label className="infoLabel">Image </label>
                          <div class="input-group mb-3">

                            <input
                              style={{ minHeight: "0px" }}
                              type="file"
                              class="form-control"
                              // value={newExperience.image}
                              name="image"
                              onChange={(e) => handleImageSelected(e)}
                            />
                            {errors.image ? (
                              <p id="errors" hidden>
                                {errors.image}
                              </p>
                            ) : (
                              <p className="validMessage">Looks Good!</p>
                            )}
                          </div>
                        </div>
                        <div
                          class="col-md-6"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <button
                            style={{
                              fontSize: "1.6vh",
                              fontFamily: "Raleway",
                              backgroundColor: "#C49D48",
                              borderColor: "#C49D48",
                              borderRadius: "5px",
                              width: "100%",
                              marginTop: "8px",
                              marginRight: "0px",
                            }}
                            id="closemodal"
                            type="submit"
                          >
                            Create Experience
                          </button>
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
