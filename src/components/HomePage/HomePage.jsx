
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import ReactPlayer from 'react-player';
import styles from "./HomePage.module.css"
import logo from "../../assets/vive argentina.png";
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

      <div className="containerHome" id="firstpage">
        {userAuth === false ?
          <NavBar /> :
          <NavBarUser />
        }

        <div className='firstPage'>
        </div>
        <div >
          <h1 className='mainTitle' style={{ transform: `translate(${offSetY * -0.8}px)` }}>
            One Destination <br />
            Thousand Experiences
          </h1>
          <h3 className='subTitle' style={{ transform: `translate(${offSetY * -0.2}px)` }}>
            Let yourself be enchanted by every corner of this country
          </h3>

          <div className='explore'>
            <button className="btn">
              <a href="#cities"><span></span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-down-circle-fill " viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
              </svg></a>
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className='cities' id='cities'>
              <div class="citiesHeader">
                <span style={{ transform: `translate(${offSetY * 0.3}px)` }}>top Packages</span>
                <h1 style={{ transform: `translate(${offSetY * 0.2}px)` }}>Our popular packages</h1>
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
              <div className='explore'>
                <button className="btn">
                  <a href="#packages"><span></span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-down-circle-fill " viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                  </svg></a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className='experiences' id='experiences'>
              <div class="experiencesHeader">
                <span style={{ transform: `translate(${offSetY * 0.1}px)` }}>top experiences</span>
                <h1 style={{ transform: `translate(${offSetY * -0.07}px)` }}>Our popular experiences</h1>
                <p style={{ transform: `translate(${offSetY * -0}px)` }}>Choose a city, we organize the rest of your trip.</p>
              </div>
              <Link to="/experiences">
                <div class="owl-carousel owl-theme">
                  <div class="item">
                    <img src="https://res.cloudinary.com/dblc1bzmx/image/upload/c_scale,h_720,q_50/v1661639589/VivaArg/BARILOCHE/pexels-mati-mango-3193767_ruyclw.jpg" alt="" />
                    <div class="overlay2">
                      <span>Excursion to the Cerro Catedral</span>
                      <div>
                        <h2>The place that everyone want to go.</h2>
                        <p>Click me for more info</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className='explore'>
                <button className="btn">
                  <a href="#videos"><span></span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-down-circle-fill " viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                  </svg></a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className='videos' id='videos'>
              <div class="videosHeader">

                <span style={{ transform: `translate(${offSetY * 0.02}px)` }}>EXPLORE</span>
                <h1 style={{ transform: `translate(${offSetY * 0.03}px)` }}>Our cities</h1>
                <p style={{ transform: `translate(${offSetY * 0.04}px)` }}>Choose a city, we organize the rest of your trip.</p>
              </div>

              <div >
                <div class="player-wrapper">
                  <ReactPlayer url={'https://res.cloudinary.com/dblc1bzmx/video/upload/v1661639581/VivaArg/BUENOS%20AIRES/Buenos_Aires_1_ixmanf.mp4'} controls loop className='react-player' width="100%" height="100%" />
                </div>
              </div>

              <div className='explore'>
                <button className="btn">
                  <a href="#contact"><span></span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-down-circle-fill " viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                  </svg></a>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className={`container-fluid ${styles.fondocontact}`}>
        <div className="container">
          <div className={`row ${styles.aligncontactitems}`}>
            <div className="col-md-2 text-center">
              <img className={`img-fluid ${styles.imgfooter}`} src={logo} alt="logo" name='vive argentina' />
            </div>
            <div className="col-md-6">
              <div class="formContact">
                <h4>GET IN TOUCH</h4>
                <h2 class="form-headlineContact">Send us a message</h2>
                <form id="submit-form" action="">
                  <p>
                    <input id="name" class="form-control form-inputContact" type="text" placeholder="Your Name*" />
                    <small class="name-error"></small>
                  </p>
                  <p>
                    <input id="email" class="form-control form-inputContact" type="email" placeholder="Your Email*" />
                    <small class="name-error"></small>
                  </p>
                  <p class="full-width">
                    <input id="company-name" class="form-control form-inputContact" type="text" placeholder="Your Lastname*" required />
                    <small></small>
                  </p>
                  <p class="full-width">
                    <textarea class="form-control" minlength="20" id="message" cols="30" rows="7" placeholder="Your Message*" required></textarea>
                    <small></small>
                  </p>
                  <p class="full-width">
                    <input type="checkbox" id="checkbox" name="checkbox" checked /> Yes, I would like to receive information about discounts, promotions, packages and experiences available..
                  </p>
                  <p class="full-width">
                    <input type="submit" class="btn btn-outline-secondary btn-lg " value="SEND" onclick="checkValidations()" />
                  </p>
                </form>
              </div>
            </div>
            <div className="col-md-4">
              <p>We have connected more than 10,000 people with unforgettable experiences! how can we help you?</p>
              <p className={styles.boldcontact}><i class="fa fa-envelopeContact" aria-hidden="true"></i> vaviveargentina@gmail.com</p>
              <p className={styles.boldcontact}><i class="fa fa-phone" aria-hidden="true"></i> <span class="highlight-textContact">+91 11 1111 2900</span></p>
            </div>
          </div>
        </div>
      </div>





      <a href="#firstPage"><span></span>

        <Footer />


      </a>
    </Fragment>
  )
}

export default HomePage