// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import styles from "../Cities/Cities.module.css";

export default function CarouselCity({ image, name }) {
  const images = image.split(" ");
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div
              id={name.split(" ").join("").toLowerCase()}
              className="carousel slide"
              data-bs-ride="true"
            >
              <div className="carousel-inner" style={{borderRadius: "8px",boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.15)"}}>
                <div className="carousel-item active">
                  <img
                    src={images[0]}
                    className={`d-block w-100 ${styles.imgheigh}`}
                    alt={name}
                    
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={images[1]}
                    className={`d-block w-100 ${styles.imgheigh}`}
                    alt={name}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={images[2]}
                    className={`d-block w-100 ${styles.imgheigh}`}
                    alt={name}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${name.split(" ").join("").toLowerCase()}`}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${name.split(" ").join("").toLowerCase()}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
