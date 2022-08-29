// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import CarouselExperiences from '../Carousel/Carousel.Experiences'
import styles from '../Experiences/Experiences.module.css';
import Navbar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import CreateExperience from '../CreateExperience/CreateExperience'
import CategoriesExperiences from './Categories.Experiences'


export default function Experiences() {

    return (
        <div>
            <div className="container-fluid">
                <Navbar />
                <SearchBar />
            </div>
            <div className={styles.separator}></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>EXCURSION TO LAS LEÑAS <i className="bi bi-snow2"></i> </h2>
                        <h4>El mejor lugar para disfrutar la nieve</h4>
                        <ul className={styles.scoreexperience}>
                            <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                            <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                            <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                            <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                            <li><i className="bi bi-star"></i></li>
                        </ul>
                        <p>In the heart of the Andes Mountains, is the number one ski resort in Latin America. Combination of nature, comfort, fun, adventure and relaxation. The center has an unbeatable snow quality, international gastronomy, first class hotel facilities and a long snow season. This experience includes hotel transfers, lunch, guide and insurance.</p>
                        <ul className={styles.iconsexperience}>
                            <li><i className="bi bi-clock-history"></i> 10 hs.</li>
                            <li><i className="bi bi-currency-dollar"></i> 7.700</li>
                        </ul>
                        <div className={styles.experiencesbuttons}>
                            <button type="button" className="btn btn-outline-secondary btn-lg"><i className="bi bi-cart-check"></i> I want it!</button>
                            <CreateExperience />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <CarouselExperiences />
                    </div>
                </div>
            </div>

            <div className={styles.separator}></div>

            <div className="container-fluid">
                <div className={styles.moreinfo}>
                    <h3 className="text-center">MORE INFO</h3>
                </div>
            </div>

            <div className="container">
                <p>In the heart of the Andes Mountains, is the number one ski resort in Latin America. Combination of nature, comfort, fun, adventure and relaxation. The center has an unbeatable snow quality, international gastronomy, first class hotel facilities and a long snow season. This experience includes hotel transfers, lunch, guide and insurance.</p>
                <div className={styles.citybuttons}>
                    <button type="button" className="btn btn-outline-secondary btn-lg">View + Experiences</button>
                    <button type="button" className="btn btn-outline-secondary btn-lg"><i className="bi bi-cart-check"></i> I want it!</button>
                </div>
            </div>

            <div className={styles.separator}></div>

            <div className="container">
                <CategoriesExperiences />
            </div>

            <div className={styles.separator}></div>
        </div>

    );

}