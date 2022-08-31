import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselExperiences from '../Carousel/Carousel.Experiences'
import styles from '../Experiences/Experiences.module.css';
import Navbar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import CreateExperience from '../CreateExperience/CreateExperience';
import FilterExperiences from '../Filters/FilterExperiences';
import Paged from '../Paged/Paged'
import CategoriesExperiences from './Categories.Experiences'
import { getAllExperiences, orderExperiences } from '../../redux/action';



export default function Experiences() {

    const dispatch = useDispatch();
    const allExperiences = useSelector((state) => state.allExperiences);
    const [Order, setOrder] = useState('');

    const [page, setPage] = useState(1);
    const [experiencesPage, /* setExperiencesPage */] = useState(6);
    const quantityExperiencesPage = page * experiencesPage;
    const firstExperiencePage = quantityExperiencesPage - experiencesPage;

    const showExperiencesPage = allExperiences.slice( //.slice sirve para cortar un array y mostrar solo una cantidad de elementos determinada por el parametro que le pasemos (9)
    firstExperiencePage, 
    quantityExperiencesPage
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
        dispatch(getAllExperiences());
    }, [dispatch]);


    return (
        <Fragment>
            <div>
                <div className="container-fluid">
                    <Navbar />
                    <SearchBar />
                    <FilterExperiences handleOrder={handleOrder} />
                    {/* <Paged
                        experiencesPage={experiencesPage}
                        allExperiences={allExperiences.length}
                        paged={paged}
                    /> */}
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
                    <div className={styles.experiencesbuttons}>
                        <Paged
                            experiencesPage={experiencesPage}
                            allExperiences={allExperiences.length}
                            paged={paged}
                            currentPage={page}
                        />
                        <br/>
                        <CreateExperience />
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