import React from "react";
import NavBarUser from "../NavBarUser/NavBarUser";
import styles from './User.module.css'
import Footer from '../Footer/Footer.jsx';
import { Link } from 'react-router-dom'


export default function MyFavs() {
    return (
        <div>
            <div className={`container-fluid ${styles.mytripspage}`}>
                <NavBarUser />
                <div className="container">
                    <div className="row mb-3">
                        <h2 className="text-center"><i className={`bi bi-heart-fill ${styles.favheart}`}></i> My Favourites trips</h2>
                    </div>
                    {/* INICIO ITEM FAV */}
                    <div className={`row ${styles.itemmyfavs}`}>
                        <div className="col-md-8">
                            <div className={`row mt-3 mb-3 ${styles.itemmyfavs}`}>

                                {/* IMAGEN */}
                                <div className="col-md-2">
                                    <img src="https://res.cloudinary.com/dblc1bzmx/image/upload/c_scale,h_720,q_50/v1661696412/VivaArg/SALTA/PAQUETES/IMPERDIBLES-SALTA/cafayate-salta-argentina-shutterstock_193704581_50e93ff9b4_zj59gz.jpg" alt="" className="img-fluid" />
                                </div>

                                {/* TITULO Y SUB */}
                                <div className="col-md-6">
                                    <h2 className="titlepackages">NOT TO BE MISSED IN SALTA</h2>
                                    <h4>WHAT YOU CAN'T MISS</h4>
                                </div>

                                {/* BOTONES */}
                                <div className="col-md-4 text-end">
                                    <button type="button" className="btn btn-outline-secondary"><i className={`bi bi-heart-fill ${styles.favheart}`}></i></button>
                                    <button type="button" className="btn btn-outline-secondary"><i className="bi bi-trash3-fill"></i> Delete</button>
                                </div>

                            </div>
                            <hr />
                        </div>
                    </div>
                    {/* FIN ITEM FAV */}

                    {/* INICIO ITEM FAV 2*/}
                    <div className={`row ${styles.itemmyfavs}`}>
                        <div className="col-md-8">
                            <div className={`row mt-3 mb-3 ${styles.itemmyfavs}`}>

                                {/* IMAGEN */}
                                <div className="col-md-2">
                                    <img src="https://res.cloudinary.com/dblc1bzmx/image/upload/c_scale,h_720,q_50/v1661696412/VivaArg/SALTA/PAQUETES/IMPERDIBLES-SALTA/cafayate-salta-argentina-shutterstock_193704581_50e93ff9b4_zj59gz.jpg" alt="" className="img-fluid" />
                                </div>

                                {/* TITULO Y SUB */}
                                <div className="col-md-6">
                                    <h2 className="titlepackages">NOT TO BE MISSED IN SALTA</h2>
                                    <h4>WHAT YOU CAN'T MISS</h4>
                                </div>

                                {/* BOTONES */}
                                <div className="col-md-4 text-end">
                                    <button type="button" className="btn btn-outline-secondary"><i className={`bi bi-heart ${styles.favheart}`}></i></button>
                                    <button type="button" className="btn btn-outline-secondary"><i className="bi bi-trash3-fill"></i> Delete</button>
                                </div>

                            </div>
                            <hr />
                        </div>
                    </div>
                    {/* FIN ITEM FAV 2*/}


                    <div className="row">
                        <div className="col-md-12 text-center mt-5">
                            <div className={styles.citybuttons}>
                                <Link to='/home'>
                                    <button className={`btn btn-light ${styles.button404}`} type="button">Back to Home</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}