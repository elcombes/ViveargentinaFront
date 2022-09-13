import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom"

import styles from '../User.module.css'
import './SignUp.css'

import { registerUser } from "../../../redux/action";

function validate(newUser) {
    let emailVerification = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    // let strongPasswordVerification = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let errors = {};
    if (!newUser.firstName) {
        errors.firstName = "Firstname is required"
    }
    if (!newUser.lastName) {
        errors.lastName = "Lastname is required"
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
        firstName: "",
        lastName: "",
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
        let errorMessagesNodeList = document.querySelectorAll("#errors")
        let errorMessagesArray = Array.from(errorMessagesNodeList)
        if (Object.entries(errors).length > 0) {
            e.preventDefault()
            e.stopPropagation()
            errorMessagesArray.forEach(e => e.hidden = false)
        }
        else {
            dispatch(registerUser(newUser))
            setNewUser({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                repeatedPassword: ""
            })
            history.push('/home')
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">

                    {/* Inicio boton para abrir el modal */}
                    <div>
                        <button type="button" className={`btn btn-outline-secondary btn-lg ${styles.registerbutton}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Sign Up <i class="bi bi-person-lines-fill"></i>
                        </button>
                    </div>
                    {/* Fin boton para abrir el modal */}

                    {/* Inicio modal */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 style={{ fontSize: "20px" }} className="modal-title" id="exampleModalLabel">Please Sign Up</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <form class="row g-3" onSubmit={(e) => handleSubmit(e)}>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label className="infoLabel">Firstname </label>
                                                <input
                                                    className='infoInput'
                                                    type="text"
                                                    value={newUser.firstName}
                                                    name="firstName"
                                                    placeholder="John"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.firstName ?
                                                    <p id="errors" hidden>{errors.firstName}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                            <div class="col-md-6">
                                                <label className="infoLabel">Lastname </label>
                                                <input
                                                    className="infoInput"                                                   
                                                    type="text"
                                                    value={newUser.lastName}
                                                    name="lastName"
                                                    placeholder="Wick"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.lastName ?
                                                    <p id="errors" hidden>{errors.lastName}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <label className="infoLabel">Email </label>
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
                                                <label className="infoLabel">Password</label>
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
                                                <label className="infoLabel">Repeat Password</label>
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
                                                <button style={{ fontSize: "1.7vh", fontFamily: "Raleway", backgroundColor: "#C49D48", borderColor: "#C49D48", borderRadius: "5px" }} type="submit" >Sign Up</button>
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