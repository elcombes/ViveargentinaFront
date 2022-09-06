import React from "react";
import styles from "./Footer.module.css"
import logo from "../../assets/vive argentina.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div>
            <div className={`container-fluid ${styles.footerstyle} mt-5`}>
                <div className="container">
                    <div className={`row ${styles.footerelemalign}`}>
                        <div className="col-md-4">
                            <h2>Vive Argentina</h2>
                            <p className={styles.descriptionfooter}>"Vive Argentina" is an app made for the final project of Soy Henry's FullStack career. It is developed with software tools such as JS, React, Redux, Axios for the Front end and Node JS and a connection with a postgres DB via Sequelize for Back end.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <Link to={'/home'} >
                                <img className={styles.imgfooter} src={logo} alt="logo" name='vive argentina' />
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <h2>Authors</h2>
                            <ul className={styles.authorsfooter}>
                                <li>Emmanuel Combes</li>
                                <li>Cristian Fortich</li>
                                <li>Rodrigo Lanfri</li>
                                <li>Mateo Mendez</li>
                                <li>Romina Ponce</li>
                                <li>Claudio Rosso</li>
                                <li>Franco Samilian</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p className={styles.copyr}>Copyright © 2022 Vive Argentina. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}