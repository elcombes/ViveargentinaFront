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
            e.preventDefault()
            e.stopPropagation()
            errorMessagesArray.forEach(e => e.hidden = false)
        } else {
            dispatch(passwordReset({ token: token, password: state.newPassword }))
            Swal.fire({
                title: "Your password was changed successfully",
                imageUrl: "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663003831/VivaArg/Alerts/2_wsn0oa.png",
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
            <div><h1>ResetPassword</h1></div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>New Password: </label>
                        <input type="password" name="newPassword" value={state.newPassword} onChange={(e) => handleChange(e)} placeholder="Entert password" />
                        {errors.newPassword ?
                            <p id="errors" hidden>{errors.newPassword}</p> :
                            <p className="validMessage">Looks Good!</p>
                        }
                    </div>
                    <div>
                        <label>Repeat New Password: </label>
                        <input type="password" name="repeatPassword" value={state.repeatPassword} onChange={(e) => handleChange(e)} placeholder="Entert password" />
                        {errors.repeatPassword ?
                            <p id="errors" hidden>{errors.repeatPassword}</p> :
                            <p className="validMessage">Looks Good!</p>
                        }
                    </div>
                    <div>
                        <button type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                    </div>
                </form>
                {
                    state.alert === "" ? null : (
                        <div>
                            <h2>{state.alert}</h2>
                        </div>
                    )
                }
            </div>
        </>
    )
}


export default ResetPassword