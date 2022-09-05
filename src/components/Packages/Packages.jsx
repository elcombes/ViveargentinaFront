import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from '../Packages/Packages.module.css';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import FilterPackages from '../../components/Filters/FilterPackages';
import { getAllPackages, getCityById, orderPackages } from '../../redux/action';
import { useHistory } from "react-router-dom";

export default function Card(props) {
    let prevId = 1;
    const history = useHistory();
    let pathName = history.location.pathname
    const dispatch = useDispatch();
    const allPackages = useSelector((state) => state.allPackages);

    const [Order, setOrder] = useState('');
    const { cityId } = props.match.params;

    // Precart

    const [item, setItem] = useState({
        name: "",
        price: 0,
        pax: 1,
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
    };

    //   Fin Precart

    function handleOrder(e) {
        setOrder(e.target.value)
        console.log(Order)
        dispatch(orderPackages(e.target.value))
    }

    useEffect(() => {

        if (cityId) {
            dispatch(getCityById(cityId))
        }
        else {
            dispatch(getAllPackages())
        }
    }, [dispatch]);

    return (
        <Fragment>
            <div>
                <div className="container-fluid">
                    <NavBar />
                    <SearchBar />
                    <FilterPackages handleOrder={handleOrder} />
                    <br />
                    {allPackages?.map((e) => {
                        return (
                            allPackages === [] ? (
                                <div className="noPackages">
                                    <img src="../images/loading-opaque.gif" alt="Loading..." />
                                </div>
                            ) : (
                                <div className="container" key={prevId++}>
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div>
                                                <h2 className={styles.titlepackages}>{e.name}</h2>
                                                <h4>{e.subTitle}</h4>
                                                Score: {e.score}
                                                {/* <ul className={styles.scorecity}>
                                                    <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                                                    <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                                                    <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                                                    <li><i className="bi bi-star-fill" Style="color:#C49D48"></i></li>
                                                    <li><i className="bi bi-star"></i></li>
                                                </ul> */}
                                                <p>{e.description}</p>
                                            </div>

                                            <div className={`row ${styles.pricelist}`}>
                                                <div className={`col-md-6 ${styles.citybuttons}`}>
                                                    <ul className={styles.iconscity}>
                                                        <li style={{color: "black"}}><i className="bi bi-clock-history"></i> {e.duration}</li>
                                                        <li style={{color: "black"}}><i className="bi bi-currency-dollar"></i> {e.price} ARS</li>
                                                        {console.log(e.experiences)}
                                                    </ul>
                                                </div>
                                                <div className="col-md-6">
                                                    <ul className={styles.iconsexp}>
                                                        <li className={styles.exptitle}><i className="bi bi-compass"></i> {e.experiences ? e.experiences[0].name : null} <br /></li>
                                                        <li className={styles.exptitle}><i className="bi bi-compass"></i> {e.experiences ? e.experiences[1].name : null}<br /></li>
                                                        <li className={styles.exptitle}><i className="bi bi-compass"></i> {e.experiences ? e.experiences[2].name : null}<br /></li>
                                                    </ul>
                                                </div>

                                            </div>

                                            <div className={`row mt-5 ${styles.explist}`}>

                                                <div className="col-md-6">

                                                    <div className={styles.citybuttons}>
                                                        {/* Boton Modal */}
                                                        <button type="button" className="btn btn-outline-secondary btn-lg" data-bs-toggle="modal" data-bs-target={`#${e.name.split(' ').join('')}`}><i className="bi bi-cart-check"></i> Add to my trips!</button>
                                                        {/* Fin Boton Modal */}
                                                    </div>


                                                    {/* Inicio Modal */}
                                                    <div className="modal modal-lg fade" id={e.name.split(' ').join('')} tabindex="-1" aria-labelledby={`${e.id}label`} aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">

                                                                {/* Body Modal */}
                                                                <div className="modal-body">
                                                                    <img className={`img-fluid ${styles.imgmodalpackages}`} src={e.image} alt="" />
                                                                    <div>
                                                                        <i class="bi bi-heart-fill" style={{fontSize:"4vh", paddingTop: "3vh"}}></i>
                                                                    </div>
                                                                    <div className="mt-5">
                                                                        <h2 className="modal-title" id={`${e.id}label`}style={{color: "#C49D48", textTransform:"uppercase"}}>{e.name}</h2>
                                                                        <h4>{e.subTitle}</h4>
                                                                    </div>
                                                                    <p className={styles.modaldescription}>{e.description}</p>
                                                                    <div class="mt-5 mb-5">
                                                                        <div className="row ">
                                                                            <div className="col-md-12">
                                                                                <ul className={styles.iconsmodal}>
                                                                                    <li style={{color: "black"}}><i className="bi bi-clock-history"></i> {e.duration}</li>
                                                                                    <li style={{color: "black"}}><i className="bi bi-currency-dollar"></i> ARS {e.price}</li>
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
                                                                                <input className={styles.cantpackages} name="pax" min="1" id="pax" type="number" value={item.pax} defaultValue="1" onChange={(event) => handleChange(event, e.name, e.price, e.image, e.dates)} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row ">
                                                                            <div className="col-md-8">
                                                                                <p className="text-end">Please, choose date:</p>
                                                                            </div>
                                                                            <div className="col-md-4 text-start">
                                                                                <select onChange={(event) => handleChange(event, e.name, e.price, e.image, e.dates)} name="dates" id="dates">
                                                                                    {e.dates.split(',').map((e) => {
                                                                                        return <option value={e}>{e} </option>

                                                                                    })}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div class="mt-5 mb-5 text-center" >
                                                                                <div className="col-md-12" style={{color: "black", fontWeight:"800"}}>
                                                                                    TOTAL:  <i className="bi bi-currency-dollar"></i>ARS {e.price * item.pax}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Footer Modal */}
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                                    <button onClick={(event) => { handleClick(event) }} type="button" className="btn btn-primary" style={{backgroundColor:"#C49D48", borderColor:"#C49D48" , fontSize:"2vh"}}><i className="bi bi-cart-check" style={{color:"black"}}></i> Add to cart!</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Fin Modal */}
                                                </div>




                                                <div className="col-md-6">
                                                    <div className={styles.citybuttons}>

                                                        <Link to={'/experiences/' + e.id}>
                                                            <button type="button" className="btn btn-outline-secondary btn-lg"> View all included experiences!</button>
                                                        </Link>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <img className="img-fluid" src={e.image} alt="" />
                                            {/* <CarouselPackage /> */}
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            ))
                    })}
                </div>
                <br />
            </div >
        </Fragment >
    );
}
