import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from '../Experiences/Experiences.module.css';
import Navbar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import CreateExperience from '../CreateExperience/CreateExperience';
import FilterExperiences from '../Filters/FilterExperiences';
import Paged from '../Paged/Paged'
import CategoriesExperiences from './Categories.Experiences'
import { getAllExperiences, orderExperiences, getPackageById } from '../../redux/action';



export default function Experiences(props) {

    const dispatch = useDispatch();
    const allExperiences = useSelector((state) => state.allExperiences);
    const [Order, setOrder] = useState('');
    const { packageId } = props.match.params;

    const [page, setPage] = useState(1);
    const [experiencesPage, /* setExperiencesPage */] = useState(6);
    const lastExperiencePage = page * experiencesPage;
    const firstExperiencePage = lastExperiencePage - experiencesPage;

    const showExperiencesPage = allExperiences.slice( //.slice sirve para cortar un array y mostrar solo una cantidad de elementos determinada por el parametro que le pasemos (9)
    firstExperiencePage, 
    lastExperiencePage
  );

  const paged = function (pageNumber) {
    if (pageNumber !== page) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    setPage(pageNumber);
  };


    function handleOrder(e) {
        setOrder(e.target.value)
        console.log(Order)
        dispatch(orderExperiences(e.target.value))
    }


    useEffect(() => {
        if (packageId) {
            dispatch(getPackageById(packageId))
            
        } else {
            dispatch(getAllExperiences());    
        }
    }, [dispatch]);

    return (
        <Fragment>
            <div>
                <div className="container-fluid">
                    <Navbar />
                    <SearchBar 
                        setPage={setPage}
                    />
                    <div>
                    <SearchBar />

                    <FilterExperiences handleOrder={handleOrder} />
                    </div>
                    <Paged 
                            experiencesPage={experiencesPage}
                            allExperiences={allExperiences.length}
                            paged={paged}
                            currentPage={page}
                        />
                    
                    <br />
                    {showExperiencesPage?.map((e) => {
                        return (
                            showExperiencesPage === [] ? (
                                <div className="noExperiences">
                                    <img src="../images/loading-opaque.gif" alt="Loading..." />
                                </div>
                            ) : (

                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h2>{e.name[0].toUpperCase() + e.name.slice(1)}</h2>
                                            <h4>{e.subTitle}</h4>
                                            Score:{e.score}        

                                            <p>{e.description}</p>
                                            <ul className={styles.iconsexperience}>
                                                <li><i className="bi bi-currency-dollar"></i>{e.price}</li>
                                                <li><i className="bi bi-clock-history"></i> {e.duration}</li>
                                            </ul>
                                            <button type="button" className="btn btn-outline-secondary btn-lg"><i className="bi bi-cart-check"></i> I want it!</button>
                                        </div>
                                        <div className="col-md-5">
                                            <img className="img-fluid" src={e.image} alt="" />
                                            {/* <CarouselExperiences /> */}
                                          
                                        </div>
                                       
                                        <hr />
                                        <br />
                                    </div>
                                    <br/>
                                </div>
                            ))
                    })}
                    <div className={styles.experiencesbuttons}>
                        <Paged
                            experiencesPage={experiencesPage}
                            allExperiences={allExperiences.length}
                            paged={paged}
                            currentPage={page}
                        />

                    </div>

                    <div className={styles.experiencesbuttons}>
                        <CreateExperience />
                    </div>
                    <div className={styles.separator}></div>
                    <div className="container">
                        <CategoriesExperiences />
                    </div>


                    <div className={styles.separator}></div>

                </div>
            </div>

        </Fragment>

    );

}