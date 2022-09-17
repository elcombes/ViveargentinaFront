import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { changePassword } from '../../redux/action'
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

function ChangePassword() {
    const dispatch = useDispatch()
    const history = useHistory()
    const loggedUser = JSON.parse(window.localStorage.getItem("user"));
    const token = loggedUser.accessToken

    const [state, setState] = useState({
        currentPassword: "",
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
            const message = await dispatch(changePassword({ token: token, password: state.currentPassword, newPassword: state.newPassword }))
            Swal.fire({
                title: message,
                imageUrl: "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png",
                imageWidth: 350,
                imageHeight: 300,
                confirmButtonColor: "#C49D48",
                imageAlt: "Custom image",
            });

            history.push("/home")
        }
        // if (validate()) {
        //     const response = await dispatch(changePassword({ token: token, password: state.currentPassword, newPassword: state.newPassword }))
        //     // history.push("/home")
        //     setState({
        //         ...state,
        //         alert: response.data
        //     })
        // }
    }

    function validate(state) {
        let errors = {};
        // if (!state.currentPassword) errors.currentPassword = "Current password is required"
        if (!state.newPassword) errors.newPassword = "New password is required"
        if (state.newPassword.length < 8) errors.newPassword = "The password must have at least 8 characters"
        if (!state.repeatPassword) errors.repeatPassword = "Passwords do not much"
        if (state.newPassword !== state.repeatPassword) errors.repeatPassword = "Passwords do not much"
        return errors
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
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Current password: </label>
                        <input type="password" name="currentPassword" value={state.currentPassword} onChange={(e) => handleChange(e)} placeholder="Entert current password" />
                        {/* {errors.currentPassword ?
                            <p id="errors" hidden>{errors.newPassword}</p> :
                            <p className="validMessage">Looks Good!</p>
                        } */}
                    </div>
                    <div>
                        <label>New password: </label>
                        <input type="password" name="newPassword" value={state.newPassword} onChange={(e) => handleChange(e)} placeholder="Entert new password" />
                        {errors.newPassword ?
                            <p id="errors" hidden>{errors.newPassword}</p> :
                            <p className="validMessage">Looks Good!</p>
                        }
                    </div>
                    <div>
                        <label>New password: </label>
                        <input type="password" name="repeatPassword" value={state.repeatPassword} onChange={(e) => handleChange(e)} placeholder="Repeat new password" />
                        {errors.repeatPassword ?
                            <p id="errors" hidden>{errors.repeatPassword}</p> :
                            <p className="validMessage">Looks Good!</p>
                        }
                    </div>
                    <div>
                        <button className="btn btn-outline-secondary" type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
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
        </div>
    )
}

export default ChangePassword