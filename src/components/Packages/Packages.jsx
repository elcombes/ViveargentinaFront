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
        pax: 0,
        dates: ""
    });

    const handleChange = async (e, name, price) => {
        console.log('Entrando a HC')
        setItem({
            ...item,
            [e.target.name]: e.target.value,
            name: name,
            price: price
        });
        console.log('handle Change', item)
    };

    const handleClick = (event) => {
        let arrayItemsStore = JSON.parse(localStorage.getItem("items"));
        console.log('arrayItemStore', arrayItemsStore)
        if (arrayItemsStore === null) arrayItemsStore = [];
        console.log('handle Click', item);
        arrayItemsStore.push(item);
        localStorage.setItem("items", JSON.stringify(arrayItemsStore));
    };

    const handleNameAndPrice = async (name, price) => {
        await setItem({
            ...item,
            name: name,
            price: price
        });
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
                                                        <li><i className="bi bi-clock-history"></i> {e.duration}</li>
                                                        <li><i className="bi bi-currency-dollar"></i> ARS {e.price}</li>
                                                        {console.log(e.experiences)}
                                                    </ul>
                                                </div>
                                                <div className="col-md-6">

                                                    <div className={styles.citybuttons}>
                                                        {/* Boton Modal */}
                                                        <button onClick={(e) => { handleNameAndPrice(e.name, e.price) }} type="button" className="btn btn-outline-secondary btn-lg" data-bs-toggle="modal" data-bs-target={`#${e.name.split(' ').join('')}`}><i className="bi bi-cart-check"></i> Add to my trips!</button>
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
                                                                        <i class="bi bi-heart-fill"></i>
                                                                    </div>
                                                                    <div className="mt-5">
                                                                        <h2 className="modal-title" id={`${e.id}label`}>{e.name}</h2>
                                                                        <h4>{e.subTitle}</h4>
                                                                    </div>
                                                                    <p className={styles.modaldescription}>{e.description}</p>
                                                                    <div class="mt-5 mb-5">
                                                                        <div className="row ">
                                                                            <div className="col-md-12">
                                                                                <ul className={styles.iconsmodal}>
                                                                                    <li><i className="bi bi-clock-history"></i> {e.duration}</li>
                                                                                    <li><i className="bi bi-currency-dollar"></i> ARS {e.price}</li>
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
                                                                                <input className={styles.cantpackages} name="pax" min="1" id="pax" type="number" value={item.pax} defaultValue="1" onChange={(event) => handleChange(event, e.name, e.price)} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row ">
                                                                            <div className="col-md-8">
                                                                                <p className="text-end">Please, choose date:</p>
                                                                            </div>
                                                                            <div className="col-md-4 text-start">
                                                                                <select onChange={(event) => handleChange(event, e.name, e.price)} name="dates" id="dates">
                                                                                    {e.dates.split(',').map((e) => {
                                                                                        return <option value={e}>{e} </option>

                                                                                    })}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div class="mt-5 mb-5 text-center">
                                                                                <div className="col-md-12">
                                                                                    <i className="bi bi-currency-dollar"></i> TOTAL: ARS {e.price * item.pax}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Footer Modal */}
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                                    <button onClick={(event) => { handleClick(event) }} type="button" className="btn btn-primary"><i className="bi bi-cart-check"></i> Add to my trips!</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Fin Modal */}
                                                </div>
                                            </div>

                                            <div className={`row ${styles.explist}`}>
                                                <div className="col-md-6">
                                                    <h2 className={styles.exptitle}><i className="bi bi-compass"></i> Enjoy Extra Experiences!</h2>
                                                    <ul className={styles.iconsexp}>
                                                        <li>{e.experiences ? e.experiences[0].name : null} <br /></li>
                                                        <li>{e.experiences ? e.experiences[1].name : null}<br /></li>
                                                        <li>{e.experiences ? e.experiences[2].name : null}<br /></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={styles.citybuttons}>

                                                        <Link to={'/experiences/' + e.id}>
                                                            <button type="button" className="btn btn-outline-secondary btn-lg"> View all experiences!</button>
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
