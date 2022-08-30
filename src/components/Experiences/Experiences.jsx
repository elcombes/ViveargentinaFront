import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselExperiences from '../Carousel/Carousel.Experiences'
import styles from '../Experiences/Experiences.module.css';
import Navbar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import CreateExperience from '../CreateExperience/CreateExperience';
import FilterExperiences from '../Filters/FilterExperiences';
import CategoriesExperiences from './Categories.Experiences'
import { getAllExperiences, orderExperiences } from '../../redux/action';


export default function Experiences() {

    const dispatch = useDispatch();
    const allExperiences = useSelector((state) => state.allExperiences);
    const [Order, setOrder] = useState('');


    function handleOrder(e) {
        setOrder(e.target.value)
        console.log(Order)
        dispatch(orderExperiences(e.target.value))
    }

    useEffect(() => {
        dispatch(getAllExperiences());
    }, [dispatch]);


    return (
        <Fragment>
            <div>
                <div className="container-fluid">
                    <Navbar />
                    <SearchBar />
                    <FilterExperiences handleOrder={handleOrder} />
                    <br />
                    {allExperiences?.map((e) => {
                        return (
                            allExperiences === [] ? (
                                <div className="noExperiences">
                                    <img src="../images/loading-opaque.gif" alt="Loading..." />
                                </div>
                            ) : (

                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h2>{e.name}</h2>
                                            <h4>{e.subTitle}</h4>
                                            Score:{e.score}
                                            {/*                         <ul className={styles.scoreexperience}>
                            <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                            <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                            <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                            <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                            <li><i className="bi bi-star"></i></li>
                        </ul> */}
                                            <p>{e.description}</p>
                                            <ul className={styles.iconsexperience}>
                                                <li><i className="bi bi-clock-history"></i> {e.duration}</li>
                                                <li><i className="bi bi-currency-dollar"></i>{e.price}</li>
                                            </ul>

                                            <button type="button" className="btn btn-outline-secondary btn-lg"><i className="bi bi-cart-check"></i> I want it!</button>
                                        </div>
                                        <div className="col-md-6">
                                            <img className="img-fluid" src={e.image} alt="" />
                                            {/* <CarouselExperiences /> */}
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            ))
                    })}

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
                    <div className={styles.experiencesbuttons}>
                        <CreateExperience />
                    </div>

                    <div className={styles.separator}></div>
                </div>
            </div>

        </Fragment>

    );

}