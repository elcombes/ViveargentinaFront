
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import ReactPlayer from 'react-player';
import styles from "./HomePage.module.css"
import logo from "../../assets/vive argentina.png";
import { getLsUser, createNewReview, getAllReviews } from "./../../redux/action.js";
import Swal from "sweetalert2";

import './HomePage.css';

import NavBar from '../NavBar/NavBar.jsx';
import NavBarUser from '../NavBarUser/NavBarUser.jsx';
import Footer from '../Footer/Footer.jsx';



function HomePage() {
  const [offSetY, setOffSetY] = useState(0);
  const handleScrollY = () => setOffSetY(window.pageYOffset)


  const [newReview, setNewReview] = useState({
    text: "",
    date: "",
    userId: "",
  });

  let userAuth = useSelector((state) => state.userAuth)
  let allReviews = useSelector((state) => state.allReviews)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user ? user.user.id : ""
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
      [userId]: userId ? userId : ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newReview.date === "" || newReview.text === "") {
      e.preventDefault();
      e.stopPropagation();
      return Swal.fire({
        title: "PLEASE COMPLETE ALL FIELDS",
        imageUrl:
          "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663366330/VivaArg/Alerts/passagerAlert_2_ojtdhi.png",
        imageWidth: 350,
        imageHeight: 300,
        confirmButtonColor: "#C49D48",
        imageAlt: "Custom image",
      });
      ;
    }
    if (newReview.date.length < 7 || newReview.text.length < 15) {
      e.preventDefault();
      e.stopPropagation();
      return Swal.fire({
        title: "A LITTLE MORE ENTHUSIASTIC, your review should be longer ",
        imageUrl:
          "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663614396/VivaArg/Alerts/passagerAlert_5_qcbtcx.png",
        imageWidth: 350,
        imageHeight: 300,
        confirmButtonColor: "#C49D48",
        imageAlt: "Custom image",
      });
      ;
    } else {
      dispatch(createNewReview(newReview));
      setNewReview({
        text: "",
        date: "",
        userId: "",
      })
      return Swal.fire({
        title: "REVIEW CREATED SUCCESSFULLY",
        imageUrl:
          "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png",
        imageWidth: 350,
        imageHeight: 300,
        confirmButtonColor: "#C49D48",
        imageAlt: "Custom image",
      })
    };
  }

  useEffect(() => {
    dispatch(getLsUser())
    dispatch(getAllReviews())
    window.addEventListener('scroll', handleScrollY)
    return () => window.removeEventListener('scroll', handleScrollY)
  }, [])

  /* reviews */

  let prevId = 1;

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
        {/* PACKAGES */}
        <div className="row">
          <div className="col-md-12">
            <div className='cities' id='cities'>
              <div class="citiesHeader">
                <span style={{ transform: `translate(${offSetY * 0.2}px)` }}>top Packages</span>
                <h1 style={{ transform: `translate(${offSetY * 0.2}px)` }}>Our popular packages</h1>
                <p style={{ transform: `translate(${offSetY * 0.1}px)` }}>We are a team of humans with the strategy, the tools and the solutions for you to travel as you deserve.</p>
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
                  <a href="#experiences"><span></span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-down-circle-fill " viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                  </svg></a>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* EXPERIENCES */}
        <div className="row">
          <div className="col-md-12">
            <div className='experiences' id='experiences'>
              <div class="experiencesHeader">
                <span style={{ transform: `translate(${offSetY * 0.07}px)` }}>top experiences</span>
                <h1 style={{ transform: `translate(${offSetY * 0.02}px)` }}>Our popular experiences</h1>
                <p style={{ transform: `translate(${offSetY * 0.1}px)` }}>Choose a city, we organize the rest of your trip.</p>
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
        {/* VIDEOS */}
        <div className="row">
          <div className="col-md-12">
            <div className='videos' id='videos'>
              <div class="videosHeader">

                <span style={{ transform: `translate(${offSetY * 0.09}px)` }}>EXPLORE</span>
                <h1 style={{ transform: `translate(${offSetY * 0.08}px)` }}>Our cities</h1>
                {/* <p style={{ transform: `translate(${offSetY * 0.08}px)` }}>Play me <i class="bi bi-play" style={{ height: "50px" }}></i></p> */}

              </div>

              <div >
                <div class="player-wrapper">
                  <ReactPlayer url={'https://res.cloudinary.com/dblc1bzmx/video/upload/v1663441399/VivaArg/Video_corporativo_cx7oad.mp4'} controls loop className='react-player' width="100%" height="100%" />
                </div>
              </div>

              <div className='explore'>
                <button className="btn">
                  <a href="#reviews"><span></span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-down-circle-fill " viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                  </svg></a>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* REVIEWS */}
        <div>
          {/* RENDERIZADO REVIEWS */}
          <section className="containerReviews" id='reviews'>


            <div class="titleReviews">
              <h2>our reviews</h2>
            </div>

            <div id="carouselReviews" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">

                {
                  allReviews?.map((r) => {
                    return allReviews === [] ? (
                      <div className="noReviews">
                        <img src="https://res.cloudinary.com/dblc1bzmx/image/upload/v1663366880/VivaArg/Alerts/passagerAlert_3_jprokc.png" alt="Loading..." />
                      </div>
                    ) : (
                      <div className="carousel-item active" key={prevId++}>
                        <article class="reviewReviews">
                          <div class="img-container">
                            <img src={r.user ? r.user.photo : "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663613676/VivaArg/unnamed_m8fjgl.gif"} alt="-1" id="person-img" />
                          </div>
                          <h4 id="authorReviews"> {r.user ? r.user.first_name + " " + r.user.last_name : "Anonymous"}</h4>
                          <p id="job">{r.date}
                          </p>
                          <p id="info">
                            "{r.text}"
                          </p>
                          <div class="quote"><i class="fa-solid fa-quote-right" id="quote"></i></div>
                          <div class="underline"></div>


                          {/* CREATE REVIEW */}

                        </article>
                      </div>
                    );
                  })
                }

              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#carouselReviews" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"><i class="bi bi-arrow-left-short" style={{fontSize:"30px"}}></i></span>
                <span className="visually-hidden">Prev</span>
              </button>

              <button className="carousel-control-next" type="button" data-bs-target="#carouselReviews" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"><i class="bi bi-arrow-right-short" style={{fontSize:"30px"}}></i></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>











          </section>

          {/* FORMULARIO DE CREACION DE REVIEW */}
          <section className='reviewSection' id="reviews">
            <div>
              <div >
                <h1>Share your experience, write a review.</h1>
              </div>
              <form className='formReview' onSubmit={(e) => handleSubmit(e)}>
                <div class="form-group">
                  <label for="formGroupExampleInput2">TITLE OF YOUR REVIEW</label>
                  <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Very useful!" onChange={(e) => handleChange(e)} value={newReview.date} name="date" />
                </div>

                <div class="form-group">
                  <label for="formGroupExampleInput2">DESCRIPTION</label>
                  <textarea
                    style={{ height: "150px", fontSize: "12px" }}
                    className="infoInput"
                    type="text"
                    name="text"
                    placeholder="Vive Argentina helped me find an ideal package for this long weekend!..."
                    value={newReview.text}
                    onChange={(e) => handleChange(e)}

                  />

                </div>
                <button
                  style={{
                    fontSize: "1.6vh",
                    fontFamily: "Raleway",
                    backgroundColor: "#C49D48",
                    borderColor: "#C49D48",
                    borderRadius: "5px",
                    width: "100%",
                    marginTop: "8px",
                    marginRight: "0px",
                  }}
                  type="submit"
                > SEND REVIEW
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>

      <div className={`container-fluid ${styles.fondocontact}`}>
        <div className="container">
          <div className={`row ${styles.aligncontactitems}`}>
            <div className="col-md-2 text-center">
              <img className={`img-fluid ${styles.imgfooter}`} src={logo} alt="logo" name='vive argentina' />
            </div>
            <div id="contact" className="col-md-6">
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
                    <input type="checkbox" id="checkbox" name="checkbox" /> Yes, I would like to receive information about discounts, promotions, packages and experiences available.
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
    </Fragment >
  )
}

export default HomePage