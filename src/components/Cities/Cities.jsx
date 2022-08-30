import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCities } from "../../redux/action";


import City from '../City/City'
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';

import styles from '../Cities/Cities.module.css';


export default function Card() {
  let prevId = 1;
  const dispatch = useDispatch();
  const allCities = useSelector((state) => state.allCities);

  useEffect(() => {
    dispatch(getAllCities());
  }, [dispatch]);

  

  return (
    <Fragment>
      <NavBar />
      <SearchBar />

      <div class="container-fluid">

        <br />

        <div className="allcities">
          {allCities?.map((e, i) => {
            return (
              allCities === [] ? (
                <div className="noCities">
                  <img src="../images/loading-opaque.gif" alt="Loading..." />
                </div>
              ) : (
                <div className="eachCity" key={prevId++}>

                  <div class="container">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-heading">
                              <button class="accordion-button collapsed"  className={styles.city01} style={{borderRadius: 80,margin: 1.5,backgroundImage: `url(${e.image.split(',')[2]})`}} type="button" data-bs-toggle="collapse" data-bs-target={`#${e.name.split(' ').join('')}`} aria-expanded="false" aria-controls={e.name.split(' ').join('')}>
                                {e.name}
                              </button>
                            </h2>
                            <div id={e.name.split(' ').join('')} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                              <div class="accordion-body">
                                <City
                                  name={e.name}
                                  subtitle={e.subTitle}
                                  score={e.score}
                                  description={e.description}
                                  image={e.image}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}

        </div>
      </div>
    </Fragment>
  );
}