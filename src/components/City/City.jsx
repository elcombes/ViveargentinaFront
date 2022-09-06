// import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarouselCity from '../Carousel/Carousel.City'
import styles from './City.module.css';


export default function Card(city) {

    const { name, subtitle, score, description, image, id } = city;

    return (
        <div class="container-fluid">

            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <CarouselCity 
                        image={image}
                        name={name}
                        />
                    </div>
                    <div class="col-md-6">

                        <h2
                        style={{
                        textTransform: "uppercase",
                        fontWeight: "500",
                        color: "#C49D48",}}>
                        {name}</h2>

                        <h4>{subtitle}</h4>

                        <ul className={styles.scorecity}>
                            Score= {score}
                            {/*                                  
                                    <li><i class="bi bi-star-fill" Style="color:#C49D48" ></i></li>
                                    <li><i class="bi bi-star-fill"Style="color:#C49D48"></i></li>
                                    <li><i class="bi bi-star-fill"Style="color:#C49D48"></i></li>
                                    <li><i class="bi bi-star-fill"Style="color:#C49D48"></i></li>
                                    <li><i class="bi bi-star"></i></li>   
                             */}


                        </ul>
                        <p> {description}</p>
                        <Link to={'/packages/'+id}>
                            <div className={styles.citybuttons}>
                                <button type="button" class="btn btn-outline-secondary btn-lg">View all {name} packages</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );

}