
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Zoom from 'react-reveal/Zoom';

import NavBar from '../NavBar/NavBar.jsx';
import Carousel from '../Carousel/Carousel.Home'
import './HomePage.css'



function HomePage() {
    return (
        <Fragment>
            <div className='containerHome'>
                <div className='firstPage'>
                    <NavBar />
                </div>
                <Zoom>
                <div>
                    <h1 className='mainTitle'>
                        One Destination <br />
                        Thousand Experiences
                    </h1>
                    <h3 className='subTitle'>
                        Let yourself be enchanted by every corner of this country
                    </h3>
                    <Link to='/packages'>
                        <div className='explore'>
                            <button className="btn btn-outline-secondary">
                                EXPLORE &#62;&#62;
                            </button>
                        </div>

                    </Link>
                </div>
            </Zoom>
            </div>
            <div className='cities'>
                <Zoom>
                <h4 className='citiesTitle'>
                    CITIES
                </h4>
                <div>
                </div>
                <div className='carousel'>
                    <Link to='/cities'>
                        <Carousel />
                    </Link>
                </div>
                </Zoom>
            </div>

        </Fragment>
    )
}

export default HomePage