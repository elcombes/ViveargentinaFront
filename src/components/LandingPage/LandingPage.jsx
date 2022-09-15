import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLsUser } from "./../../redux/action.js"

import "./LandingPage.css";
import Video from '../../assets/vive argentina.mp4'

function Landing() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLsUser())
  }, [])

  return (
    <Fragment>
      <div className="gif">
        <Link to="/home">
          <video autoPlay muted loop id='video'>
            <source src={Video} type='video/mp4' />
          </video>
        </Link>
      </div>
    </Fragment>
  );
}
// a ver si se arregla la ruta
export default Landing;
