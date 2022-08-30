// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import styles from '../Cities/Cities.module.css';


export default function CarouselCity({image, name}) {

    const images = image.split(",")
    return (
        <div class="container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div id={name.split(" ").join("").toLowerCase()} class="carousel slide" data-bs-ride="true">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src={images[0]} class="d-block w-100" alt={name}/>
                                </div>
                                <div class="carousel-item">
                                    <img src={images[1]} class="d-block w-100" alt={name}/>
                                </div>
                                <div class="carousel-item">
                                    <img src={images[2]} class="d-block w-100" alt={name}/>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target={`#${name.split(" ").join("").toLowerCase()}`}data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target={`#${name.split(" ").join("").toLowerCase()}`} data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}