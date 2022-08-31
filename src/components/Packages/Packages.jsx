import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from '../Packages/Packages.module.css';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import FilterPackages from '../../components/Filters/FilterPackages';
import { getAllPackages, getCityById, orderPackages } from '../../redux/action';


export default function Card(props) {
    let prevId = 1;
    const dispatch = useDispatch();
    const allPackages = useSelector((state) => state.allPackages);
    const [Order, setOrder] = useState('');
    const { cityId } = props.match.params;

    function handleOrder(e) {
        setOrder(e.target.value)
        console.log(Order)
        dispatch(orderPackages(e.target.value))
    }
    
    useEffect(() => {
        if (cityId) {
            dispatch(getCityById(cityId))
            
        } else {
            dispatch(getAllPackages());    
        }
    }, [dispatch]);

    return (
        <Fragment>
            <div>
                <div class="container-fluid">
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
                                <div class="container" key={prevId++}>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h2>{e.name}</h2>
                                            <h4>{e.subTitle}</h4>
                                            Score: {e.score}
                                            {/* <ul className={styles.scorecity}>
                                                    <li><i class="bi bi-star-fill" Style="color:#C49D48"></i></li>
                                                    <li><i class="bi bi-star-fill" Style="color:#C49D48"></i></li>
                                                    <li><i class="bi bi-star-fill" Style="color:#C49D48"></i></li>
                                                    <li><i class="bi bi-star-fill" Style="color:#C49D48"></i></li>
                                                    <li><i class="bi bi-star"></i></li>
                                                </ul> */}
                                            <p>{e.description}</p>
                                            <ul className={styles.iconscity}>
                                                <li><i class="bi bi-clock-history"></i> {e.duration}</li>
                                                <li><i class="bi bi-currency-dollar"></i> {e.price}</li>
{/*                                                 
                                                <li>{e.experiences[0].name}<br/></li>
                                                <li>{e.experiences[1].name}<br/></li>
                                                <li>{e.experiences[2].name}<br/></li> */}

                                            </ul>
                                            <Link to={'/experiences/'+e.id}>
                                            <div className={styles.citybuttons}>
                                                <button type="button" class="btn btn-outline-secondary btn-lg"> View all included experiences!</button>
                                            </div>
                                            </Link>
                                            <div className={styles.citybuttons}>
                                                <button type="button" class="btn btn-outline-secondary btn-lg"><i class="bi bi-cart-check"></i> I want it!</button>
                                            </div>

                                        </div>
                                        <div class="col-md-6">
                                            <img className="img-fluid" src={e.image} alt="" />
                                            {/* <CarouselPackage /> */}
                                        </div>
                                    </div>
                                    <br />
                                </div>

                            ))
                    })}
                </div>
            </div>
        </Fragment>
    )
}