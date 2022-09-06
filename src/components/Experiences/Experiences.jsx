import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from '../Experiences/Experiences.module.css';
import Swal from 'sweetalert2'
import NavBarUser from "../NavBarUser/NavBarUser"
import NavBar from "../NavBar/NavBar";
import SearchBar from '../SearchBar/SearchBar';
import CreateExperience from '../CreateExperience/CreateExperience';
import FilterExperiences from '../Filters/FilterExperiences';
import Paged from '../Paged/Paged'
import CategoriesExperiences from './Categories.Experiences'
import { getAllExperiences, orderExperiences, getPackageById } from '../../redux/action';



export default function Experiences(props) {

    const dispatch = useDispatch();
    const allExperiences = useSelector((state) => state.allExperiences);
    let userAuth = useSelector((state) => state.userAuth)
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

    // Precart



    const [item, setItem] = useState({
        name: "",
        price: 0,
        pax: 0,
        dates: ""
    });

    const handleChange = async (e, name, price, image) => {
        console.log('Entrando a HC')
        setItem({
            ...item,
            [e.target.name]: e.target.value,
            name: name,
            image: image,
            price: price
        });

    };

    const handleClick = (event) => {
        let arrayItemsStore = JSON.parse(localStorage.getItem("items"));
        if (arrayItemsStore === null) arrayItemsStore = [];
        arrayItemsStore.push(item);
        localStorage.setItem("items", JSON.stringify(arrayItemsStore));
        // Alert
        Swal.fire({
            title: 'Added to cart successfully!',
            text: item.name,
            imageUrl: item.image,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
    };

    //   Fin Precart


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
    }, []);

    return (
        <Fragment>
            <div>
                <div className="container-fluid">
                    {userAuth === false ?
                        <NavBar /> :
                        <NavBarUser />
                    }
                    <SearchBar
                        setPage={setPage}
                    />
                    <div>


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
                                            <h2 style={{ textTransform: "uppercase", fontWeight: "500", color: "#C49D48" }}>{e.name[0].toUpperCase() + e.name.slice(1)}</h2>
                                            <h4>{e.subTitle}</h4>
                                            Score:{e.score}

                                            <p>{e.description}</p>

                                            <div className={styles.priceandcart}>
                                                <ul className={styles.iconsexperience}>
                                                    <li style={{ margin: "0vh 1vh 0vh 1vh" }}>ARS<i class="bi bi-currency-dollar" style={{ color: "#C49D48" }}></i>{e.price}</li>
                                                    <li><i className="bi bi-clock-history" style={{ color: "#C49D48" }}></i> {e.duration}</li>
                                                </ul>
                                                <div className={styles.citybuttons}>
                                                    {/* Boton Modal */}
                                                    <button type="button" className="btn btn-outline-secondary btn-lg" data-bs-toggle="modal" data-bs-target={`#${e.name.toLowerCase().split(' ').join('')}`}><i className="bi bi-cart-check"></i> Add to cart!</button>
                                                    {/* Fin Boton Modal */}
                                                </div>


                                                {/* Inicio Modal */}
                                                <div className="modal modal-lg fade" id={e.name.toLowerCase().split(' ').join('')} tabindex="-1" aria-labelledby={`${e.id}label`} aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">

                                                            {/* Body Modal */}
                                                            <div className="modal-body">
                                                                <img className={`img-fluid ${styles.imgmodalpackages}`} src={e.image} alt="" />
                                                                <div>
                                                                    <i class="bi bi-heart-fill" style={{ fontSize: "4vh", paddingTop: "3vh" }}></i>
                                                                </div>
                                                                <div className="mt-5">
                                                                    <h2 className="modal-title" id={`${e.id}label`} style={{ color: "#C49D48", textTransform: "uppercase" }}>{e.name}</h2>
                                                                    <h4>{e.subTitle}</h4>
                                                                </div>
                                                                <p className={styles.modaldescription}>{e.description}</p>
                                                                <div class="mt-5 mb-5">
                                                                    <div className="row ">
                                                                        <div className="col-md-12">
                                                                            <ul className={styles.iconsmodal}>
                                                                                <li style={{ color: "black" }}><i className="bi bi-clock-history"></i> {e.duration}</li>
                                                                                <li style={{ color: "black" }}><i className="bi bi-currency-dollar"></i> ARS {e.price}</li>
                                                                                {console.log(e.experiences)}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="mt-5 mb-5">
                                                                    <div className="row ">
                                                                        <div className="col-md-8">
                                                                            <p className="text-end">Please, choose the number of passengers:</p>
                                                                        </div>
                                                                        <div className="col-md-4 text-start">
                                                                            <input className={styles.cantpackages} name="pax" min="0" id="pax" type="number" value={item.pax} defaultValue="0" onChange={(event) => handleChange(event, e.name, e.price, e.image, e.dates)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row ">
                                                                        <div className="col-md-8">
                                                                            <p className="text-end">Please, choose date:</p>
                                                                        </div>
                                                                        <div className="col-md-4 text-start">
                                                                            <select onChange={(event) => handleChange(event, e.name, e.price, e.image, e.dates)} name="dates" id="dates">
                                                                                <option disabled selected>Choose</option>
                                                                                {e.dates.split(',').map((e) => {
                                                                                    return <option value={e}>{e} </option>

                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div class="mt-5 mb-5 text-center" >
                                                                            <div className="col-md-12" style={{ color: "black", fontWeight: "800" }}>
                                                                                TOTAL:  <i className="bi bi-currency-dollar"></i>ARS {e.price * item.pax}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Footer Modal */}
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                                <button onClick={(event) => { handleClick(event) }} type="button" className="btn btn-primary" style={{ backgroundColor: "#C49D48", borderColor: "#C49D48", fontSize: "2vh" }} data-bs-dismiss="modal"><i className="bi bi-cart-check" style={{ color: "black" }}></i> Add to cart!</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Fin Modal */}
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <img className="img-fluid" src={e.image} alt="" />
                                            {/* <CarouselExperiences /> */}

                                        </div>

                                        <hr />
                                        <br />
                                    </div>
                                    <br />
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