
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import { getLsUser } from "./../../redux/action.js";

import './HomePage.css';

import NavBar from '../NavBar/NavBar.jsx';
import NavBarUser from '../NavBarUser/NavBarUser.jsx';
import Footer from '../Footer/Footer.jsx';



function HomePage() {

    const [offSetY, setOffSetY] = useState(0);

    const handleScrollY = () => setOffSetY(window.pageYOffset)


    let userAuth = useSelector((state) => state.userAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLsUser())
        window.addEventListener('scroll', handleScrollY)
        return () => window.removeEventListener('scroll', handleScrollY)
    }, [])


    return (
        <Fragment>
            <div className='containerHome'>
                {userAuth === false ?
                    <NavBar /> :
                    <NavBarUser />
                }

                <div className='firstPage'>
                </div>
                <div>
                    <h1 className='mainTitle' style={{ transform: `translate(${offSetY * -0.8}px)` }}>
                        One Destination <br />
                        Thousand Experiences
                    </h1>
                    <h3 className='subTitle' style={{ transform: `translate(${offSetY * -0.2}px)` }}>
                        Let yourself be enchanted by every corner of this country
                    </h3>

                    <div className='explore'>
                        <button className="btn btn-outline-secondary">
                            <a href="#cities"><span></span>EXPLORE</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className='cities' id='cities'>
                <div class="citiesHeader">

                    <span style={{ transform: `translate(${offSetY * 0.3}px)` }}>top cities</span>
                    <h1 style={{ transform: `translate(${offSetY * 0.2}px)` }}>Our popular cities</h1>
                    <p style={{ transform: `translate(${offSetY * -0.1}px)` }}>We are a team of humans with the strategy, the tools and the solutions for you to travel as you deserve.</p>
                </div>
                <Link to="/packages/e1fa7baf-6de2-4e58-abfa-129d3269cc6e">
                    <div class="owl-carousel owl-theme">
                        <div class="item">
                            <img src="https://res.cloudinary.com/dblc1bzmx/image/upload/v1662392610/VivaArg/Cordoba%20%28SEGUNDO%29/cordoba_2_hmvohj.jpg" alt="" />
                            <div class="overlay">
                                <span>Córdoba</span>
                                <div>
                                    <h2>Córdoba</h2>
                                    <p>12 Popular places</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className='expExplore'>
                    <button className="btn btn-outline-secondary">
                        <a href="#experiences"><span></span>SCROLL </a>
                    </button>
                </div>
            </div>

            <div className='experiences' id='experiences'>
                <div class="experiencesHeader">

                    <span style={{ transform: `translate(${offSetY * 0.3}px)` }}>top experiences</span>
                    <h1 style={{ transform: `translate(${offSetY * 0.2}px)` }}>Our popular experiences</h1>
                    <p style={{ transform: `translate(${offSetY * 0.1}px)` }}>Choose a city, we organize the rest of your trip.</p>
                </div>
                <Link to="/experiences">
                    <div class="owl-carousel owl-theme">
                        <div class="item">
                            <img src="https://res.cloudinary.com/dblc1bzmx/image/upload/c_scale,h_720,q_50/v1661639589/VivaArg/BARILOCHE/pexels-mati-mango-3193767_ruyclw.jpg" alt="" />
                            <div class="overlay">
                                <span>Excursion to the Cerro Catedral</span>
                                <div>
                                    <h2>The place that everyone want to go.</h2>
                                    <p>Click me for more info</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className='expExplore'>
                    <button className="btn btn-outline-secondary">
                        <a href="#contact"><span></span>CONTACT US </a>
                    </button>
                </div>
            </div>
            <hr />
            <div className='contactUs'id='contact'>

                <div class="containContact">

                    <div class="wrapperContact">

                        <div class="formContact">
                            <h4>GET IN TOUCH</h4>
                            <h2 class="form-headlineContact">Send us a message</h2>
                            <form id="submit-form" action="">
                                <p>
                                    <input id="name" class="form-inputContact" type="text" placeholder="Your Name*" />
                                    <small class="name-error"></small>
                                </p>
                                <p>
                                    <input id="email" class="form-inputContact" type="email" placeholder="Your Email*" />
                                    <small class="name-error"></small>
                                </p>
                                <p class="full-width">
                                    <input id="company-name" class="form-inputContact" type="text" placeholder="Your Lastname*" required />
                                    <small></small>
                                </p>
                                <p class="full-width">
                                    <textarea minlength="20" id="message" cols="30" rows="7" placeholder="Your Message*" required></textarea>
                                    <small></small>
                                </p>
                                <p class="full-width">
                                    <input type="checkbox" id="checkbox" name="checkbox" checked /> Yes, I would like to receive information about discounts, promotions, packages and experiences available..
                                </p>
                                <p class="full-width">
                                    <input type="submit" class="submit-btnContact" value="Submit" onclick="checkValidations()" />

                                </p>
                            </form>
                        </div>

                        <div class="contacts contact-wrapperContact">

                            <ul>
                                <li>We have connected more than 10,000 people with unforgettable experiences! how can we help you?</li>
                                <span class="hightlight-contact-infoContact">
                                    <li class="email-infoContact"><i class="fa fa-envelopeContact" aria-hidden="true"></i> vaviveargentina@gmail.com</li>
                                    <li><i class="fa fa-phone" aria-hidden="true"></i> <span class="highlight-textContact">+91 11 1111 2900</span></li>
                                </span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
                <Footer />
        </Fragment>
    )
}

export default HomePage