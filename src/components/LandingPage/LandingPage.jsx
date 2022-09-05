import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLsUser } from "./../../redux/action.js"

import "./LandingPage.css";
import Video from '../../assets/logo corto glitch.mp4'

function Landing() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLsUser())
}, [])

  return (
    <Fragment>
            <Link to="/home">
        <div className="gif">
              <video autoPlay loop id='video'>
                <source src={Video} type='video/mp4'/>
                </video> 
        </div>
            </Link>
    </Fragment>
  );
}
// a ver si se arregla la ruta
export default Landing;
