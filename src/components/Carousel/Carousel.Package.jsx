// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import styles from '../Carousel/Carousel.Package.jsx';


export default function CarouselPackage() {

    return (
        <div class="container-fluid">

            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/a4/7f/10.jpg" class="d-block w-100" alt="Mendoza"/>
                                </div>
                                <div class="carousel-item">
                                    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/a4/7f/10.jpg" class="d-block w-100" alt="Mendoza"/>
                                </div>
                                <div class="carousel-item">
                                    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/a4/7f/10.jpg" class="d-block w-100" alt="Mendoza"/>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
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