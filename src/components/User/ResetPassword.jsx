import styles from "../User/User.module.css"
import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { passwordReset } from '../../redux/action'
import { useDispatch } from "react-redux";
import { useState } from "react";

import Swal from "sweetalert2";



function validate(state) {
    // let strongPasswordVerification = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let errors = {};
    if (!state.newPassword) errors.newPassword = "Password is required"
    if (!state.repeatPassword) errors.repeatPassword = "Passwords do not much"
    if (state.newPassword !== state.repeatPassword) errors.repeatPassword = "Passwords do not much"
    return errors
}



function ResetPassword() {
    const dispatch = useDispatch()
    const history = useHistory()
    const pathName = history.location.pathname.split('/')
    const token = pathName[pathName.length - 1]
    const [state, setState] = useState({
        newPassword: "",
        repeatPassword: "",
        alert: ""
    })

    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorMessagesNodeList = document.querySelectorAll("#errors")
        let errorMessagesArray = Array.from(errorMessagesNodeList)
        if (Object.entries(errors).length > 0) {
            Swal.fire({
                title: "Please check the fields",
                imageUrl: "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png",
                imageWidth: 350,
                imageHeight: 300,
                confirmButtonColor: "#C49D48",
                imageAlt: "Custom image",
            });
            e.preventDefault()
            e.stopPropagation()
            errorMessagesArray.forEach(e => e.hidden = false)
        } else {
            dispatch(passwordReset({ token: token, password: state.newPassword }))
            Swal.fire({
                title: "Your password was changed successfully",
                imageUrl: "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png",
                imageWidth: 350,
                imageHeight: 300,
                confirmButtonColor: "#C49D48",
                imageAlt: "Custom image",
            });

            history.push("/home")
        }
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }))
    };


    useEffect(() => {
        setErrors(validate(state))
    }, [])


    return (
        <>
            <div className={`${styles.backgroundReset}`}>
                <img src="https://res.cloudinary.com/dblc1bzmx/image/upload/v1663182507/VivaArg/Logo_Joyeri%CC%81a_Minimalista_Simple_Blanco_y_Negro_1_pldegi.png" alt="argentina" />
               
                <div className={`${styles.formReset}`}>

                    <div>
                        <h1> PASSWORD RESET</h1>
                        </div>
                    <h3> Seems like you forgot your password for Vive Argentina. If this is true, please complete the following form to reset your password  </h3>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>NEW PASSWORD</label>
                                <input className="form-control form-inputContact" type="password" name="newPassword" value={state.newPassword} onChange={(e) => handleChange(e)} placeholder="Enter password" />
                               
                            </div>
                            <div>
                                <label>REPEAT NEW PASSWORD</label>
                                <input className="form-control form-inputContact" type="password" name="repeatPassword" value={state.repeatPassword} onChange={(e) => handleChange(e)} placeholder="Enter password" />
                                
                            </div>
                            <div>
                                <button className="form-control form-inputContact"type='submit' onClick={(e) => handleSubmit(e)}>SUBMIT</button>
                        {
                            state.alert === "" ? null : (
                                <div >
                                    <h2 style={{color:'red', marginLeft:"30px", fontSize:"15px"}}>{state.alert}</h2>
                                </div>
                            )
                        }
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}


export default ResetPassword