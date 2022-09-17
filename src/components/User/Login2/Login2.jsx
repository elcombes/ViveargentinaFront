import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom"
import { gapi } from 'gapi-script';
import { GoogleLogin } from 'react-google-login';
import Swal from "sweetalert2";

import styles from '../User.module.css'
import './Login.css'
import '../SignUp/SignUp.css'

import { getUserLogin, resetPasswordRequest, googleLogin } from "../../../redux/action";

function validate(newUser) {
    const emailVerification = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    let errors = {};
    if (!newUser.email) {
        errors.email = "Email is required"
    }
    if (!emailVerification.test(newUser.email)) {
        errors.email = "Invalid email"
    }
    if (!newUser.password) {
        errors.password = "Password is required"
    }
    return errors
}

export default function Login2() {

    const clientId = "1027358109012-bq2hsesgqbm1av81limdn7r7bf6qmpd3.apps.googleusercontent.com"
    const emailVerification = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    const history = useHistory()
    const dispatch = useDispatch()
    let userBasicInfo = useSelector((state) => state.userBasicInfo);
    let userAuth = useSelector((state) => state.userAuth);
    const [newUser, setNewUser] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const [forgot, setForgot] = useState("Forgot your Password?")


    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
        setErrors(validate(newUser))
    }, []);

    const onSuccess = async (res) => {
        const newUser = {
            first_name: res.profileObj.givenName,
            last_name: res.profileObj.familyName,
            email: res.profileObj.email,
            photo: res.profileObj.imageUrl,
            password: res.googleId
        }
        const response = await dispatch(googleLogin(newUser))
        console.log(response)
        const image = typeof response === "string"? "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png" : "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png"
        const message = typeof response === "string"? response : "User successfully logged"
        Swal.fire({
            title: message+"!",
            imageUrl: image,                
            imageWidth: 350,
            imageHeight: 300,
            confirmButtonColor: "#C49D48",
            imageAlt: "Custom image",
          });
    };

    const onFailure = (err) => {
        console.log('failed:', err);
    };

    const requestPasswordChange = (e) => {
        if (emailVerification.test(newUser.email)) {
            dispatch(resetPasswordRequest(newUser.email))
            setForgot("Check your email")
        } else {
            setForgot("Enter a valid email")
        }
    }

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...newUser,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorMessagesNodeList = document.querySelectorAll("#errors")
        let errorMessagesArray = Array.from(errorMessagesNodeList)
        if (Object.entries(errors).length > 0) {
            e.preventDefault()
            e.stopPropagation()
            errorMessagesArray.forEach(e => e.hidden = false)
        }
        const response = await dispatch(getUserLogin({ email: newUser.email, password: newUser.password }))
        
        const image = typeof response === "string"? "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png" : "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png"
        const message = typeof response === "string"? response : "User successfully logged"
        Swal.fire({
            title: message+"!",
            imageUrl: image,
            imageWidth: 350,
            imageHeight: 300,
            confirmButtonColor: "#C49D48",
            imageAlt: "Custom image",
          });
        // window.location.reload(false);
    };




    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">

                    {/* Inicio boton para abrir el modal */}
                    <div>
                        <button 
                        type="button" 
                        className={`btn btn-outline-secondary btn-lg ${styles.registerbutton}`} 
                        data-bs-toggle="modal" 
                        data-bs-target="#loginModal">
                            Log In <i class="bi bi-person-lines-fill"></i>
                        </button>
                    </div>
                    {/* Fin boton para abrir el modal */}

                    {/* Inicio modal */}
                    <div 
                    className="modal fade" 
                    id="loginModal" 
                    tabIndex="-1" 
                    aria-labelledby="loginModalLabel" 
                    aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content" style={{
                                borderRadius: "10px",
                                boxShadow: "0px 0px 8px 5px rgba(0, 0, 0, .4)"
                            }}>

                                <div style={{ background: "white" }} className="modal-header">
                                    <h5 style={{ fontSize: "15px", color: "#C49D48" }} className="modal-title" id="exampleModalLabel">Hello! To continue, enter your email and password</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <form class="row g-3" onSubmit={(e) => handleSubmit(e)}>
                                        <div class="row">
                                            <div class="col">
                                                <label className="infoLabel"> <i class="bi bi-envelope"></i> E-MAIL</label>
                                                <input
                                                    class="form-control form-inputContact"
                                                    type="text"
                                                    value={newUser.email}
                                                    name="email"
                                                    placeholder="johnwick@gmail.com"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.email &&
                                                    <p id="errors" hidden>{errors.email}</p>
                                                    // <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <label className="infoLabel"> <i class="bi bi-key"></i> PASSWORD</label>
                                                <input
                                                    class="form-control form-inputContact"
                                                    type="password"
                                                    value={newUser.password}
                                                    name="password"
                                                    placeholder="8-20 characters long"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.password &&
                                                    <p qqqqqq="errors" hidden>{errors.password}</p>
                                                    // <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="column">
                                                <a className="forgotButton" onClick={() => requestPasswordChange()}>{forgot}</a>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <button className="btn btn-outline-secondary" style={{
                                                    fontSize: "15px", fontFamily: "Raleway",
                                                    background: "#C49D48",
                                                    borderColor: "transparent"
                                                }} type="submit" >LOG IN</button>
                                            </div>
                                            <div class="col-md-6">
                                                <GoogleLogin
                                                    clientId={clientId}
                                                    buttonText="LOG IN WITH GOOGLE"
                                                    onSuccess={onSuccess}
                                                    onFailure={onFailure}
                                                    cookiePolicy={'none'}
                                                    isSignedIn={false}
                                                    prompt="select_account"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}