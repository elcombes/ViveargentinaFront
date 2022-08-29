
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../NavBar/NavBar.jsx';
import Carousel from '../Carousel/Carousel.Home'
import './HomePage.css'



function HomePage() {
    return (
        <Fragment>
            <div className='containerHome'>
            <div className='firstPage'>
                <NavBar/>
            </div>
            <div>
                <h1 className='mainTitle'>
                One Destination <br/>
                Thousand Experiences
                </h1>
                <h3 className='subTitle'>
                Let yourself be enchanted by every corner of this country
                </h3>
                <Link to= '/Packages'>
                <div className='explore'>
                <button className="btn btn-outline-secondary">
                EXPLORE &#62;&#62;
                </button>
                </div>

                </Link>
            </div>
            </div>
                <div className='cities'>
                    <h4 className='citiesTitle'>    
                    CITIES
                    </h4> 
                    <div>
                </div>
                <div className='carousel'>
                <Link to='/cities'>
                <Carousel/>
                </Link>
                </div>
                </div>

        </Fragment>
    )
}

export default HomePage