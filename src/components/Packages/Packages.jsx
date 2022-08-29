import React, {useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselPackage from '../Carousel/Carousel.Package'
import styles from '../Packages/Packages.module.css';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import FilterPackages from '../../components/Filters/FilterPackages';
import { getAllPackages, orderPackages } from '../../redux/action';


export default function Card() {
    let prevId = 1;
    const dispatch = useDispatch();
    const allPackages = useSelector((state) => state.allPackages);
    const [Order, setOrder] = useState('');


    function handleOrder(e) {
        setOrder(e.target.value)
        console.log(Order)
        dispatch(orderPackages(e.target.value))
    }
    
    useEffect(() => {
        dispatch(getAllPackages());
    }, [dispatch]);

    
    return (
        <Fragment>
        <div>
            <div class="container-fluid">
                <NavBar />
                <SearchBar />
                <FilterPackages handleOrder={handleOrder}/>
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
                                    Score:{e.score}
                                  {/*   <ul className={styles.scorecity}>
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
                                    </ul>
                                    <div className={styles.citybuttons}>
                                        <button type="button" class="btn btn-outline-secondary btn-lg"><i class="bi bi-cart-check"></i> I want it!</button>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <CarouselPackage />
                                </div>
                            </div>
                        </div>
                     ) )
                })}
            </div>
        </div>
        </Fragment>
    )
}
