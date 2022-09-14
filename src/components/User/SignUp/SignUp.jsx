import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";
import styles from '../User.module.css'
import './SignUp.css'

import { registerUser } from "../../../redux/action.js";

function validate(newUser) {
    let emailVerification = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    // let strongPasswordVerification = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let errors = {};
    if (!newUser.first_name) {
        errors.first_name = "Firstname is required"
    }
    if (!newUser.last_name) {
        errors.last_name = "Lastname is required"
    }
    if (!newUser.email) {
        errors.email = "Email is required"
    }
    if (!emailVerification.test(newUser.email)) {
        errors.email = "Invalid email"
    }
    if (!newUser.password) {
        errors.password = "Password is required"
    }

    if (!newUser.repeatedPassword) {
        errors.repeatedPassword = "Password do not much"
    }
    if (newUser.password !== newUser.repeatedPassword) {
        errors.repeatedPassword = "Password do not much"
    }
    return errors
}

export default function SignUp() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeatedPassword: ""
    })
    const [errors, setErrors] = useState({
        // firstName: "",
        // lastName: "",
        // email: "",
        // password: "",
        // repeatedPassword: ""
    })

    useEffect(() => {
        setErrors(validate(newUser))
    }, [])


    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...newUser,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let errorMessagesNodeList = document.querySelectorAll("#errors")
        let errorMessagesArray = Array.from(errorMessagesNodeList)
        if (Object.entries(errors).length > 0) {
            e.preventDefault()
            e.stopPropagation()
            errorMessagesArray.forEach(e => e.hidden = false)
        } else {
            dispatch(registerUser(newUser))
            Swal.fire({
                title: "THANKS FOR SIGNING UP!",
                imageUrl: "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png",
                imageWidth: 350,
                imageHeight: 300,
                confirmButtonColor: "#C49D48",
                imageAlt: "Custom image",
            });
            setNewUser({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                repeatedPassword: ""
            })
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">

                    {/* Inicio boton para abrir el modal */}
                    <div>
                        <button type="button" className={`btn btn-outline-secondary  ${styles.registerbutton}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Sign Up <i class="bi bi-person-lines-fill"></i>
                        </button>
                    </div>
                    {/* Fin boton para abrir el modal */}

                    {/* Inicio modal */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 style={{ fontSize: "20px" }} className="modal-title" id="exampleModalLabel">PLEASE SIGN UP</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <form class="row g-3" onSubmit={(e) => handleSubmit(e)}>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label className="infoLabel">FIRSTNAME </label>
                                                <input
                                                    className='infoInput'
                                                    type="text"
                                                    value={newUser.first_name}
                                                    name="first_name"
                                                    placeholder="John"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.first_name ?
                                                    <p id="errors" hidden>{errors.first_name}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                            <div class="col-md-6">
                                                <label className="infoLabel">LASTNAME </label>
                                                <input
                                                    className="infoInput"
                                                    type="text"
                                                    value={newUser.last_name}
                                                    name="last_name"
                                                    placeholder="Wick"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.last_name ?
                                                    <p id="errors" hidden>{errors.last_name}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <label className="infoLabel">E-MAIL </label>
                                                <input
                                                    className="infoInput"
                                                    type="text"
                                                    value={newUser.email}
                                                    name="email"
                                                    placeholder="johnwick@gmail.com"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.email ?
                                                    <p id="errors" hidden>{errors.email}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <label className="infoLabel">PASSWORD</label>
                                                <input
                                                    className="infoInput"
                                                    type="password"
                                                    value={newUser.password}
                                                    name="password"
                                                    placeholder="8-20 characters long"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.password ?
                                                    <p id="errors" hidden>{errors.password}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label className="infoLabel">REPEAT PASSWORD</label>
                                                <input
                                                    className="infoInput"
                                                    type="password"
                                                    value={newUser.repeatedPassword}
                                                    name="repeatedPassword"
                                                    placeholder="Repeat your Password"
                                                    onChange={(e) => handleChange(e)} />
                                                {/* <div class="progress" style={{height: '1px'}}>
                                                    <div class="progress-bar" role="progressbar" aria-label="Example 1px high" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div> */}
                                                {errors.repeatedPassword ?
                                                    <p id="errors" hidden>{errors.repeatedPassword}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="column">
                                                <button className="btn btn-outline-secondary" style={{ fontSize: "1.7vh", fontFamily: "Raleway", backgroundColor: "#005B4C", borderColor: "#005B4C", borderRadius: "5px" }} data-bs-dismiss="modal" type="submit" >SIGN UP</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}