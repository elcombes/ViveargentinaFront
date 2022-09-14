import React from 'react'
import { useHistory } from "react-router-dom";
import { passwordReset } from '../../redux/action'
import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "../User/User.module.css"

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            await dispatch(passwordReset({ token: token, password: state.newPassword }))
            history.push("/home")
        }
    }

    const validate = () => {
        console.log(state)
        if (state.newPassword.length < 1) {
            setState({
                ...state,
                alert: "Please enter the new password"
            })
            return false
        } else if (state.newPassword != state.repeatPassword) {
            setState({
                ...state,
                alert: "Please enter the same password in both inputs"
            })
            return false
        }
        setState({
            ...state,
            alert: "All good"
        })
        return true
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        // validate()
    };

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