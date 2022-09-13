import React from 'react'
import { useHistory } from "react-router-dom";
import { changePassword } from '../../redux/action'
import { useDispatch } from "react-redux";
import { useState } from "react";

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

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(validate()){
            const response = await dispatch(changePassword({token: token, password: state.currentPassword, newPassword: state.newPassword}))
            // history.push("/home")
            setState({
                ...state,
                alert: response.data
            })
        }
    }

    const validate = ()=>{
        if(state.currentPassword.length < 1){
            setState({
                ...state,
                alert: "please enter the current password"
            })
            return false
        }
        if(state.newPassword.length < 1){
            setState({
                ...state,
                alert: "please enter the new password"
            })
            return false
        }
        if(state.newPassword != state.repeatPassword){
            setState({
                ...state,
                alert: "please enter the same password in both of the new password inputs"
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
    };

    return (
        <div>
            <div><h1>Change Password</h1></div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>New Password: </label>
                        <input type="password" name="currentPassword" value={state.currentPassword} onChange={(e)=>handleChange(e)} placeholder="Entert current password"/>
                        <p>{state.currentPassword}</p>
                    </div>
                    <div>
                        <label>New Password: </label>
                        <input type="password" name="newPassword" value={state.newPassword} onChange={(e)=>handleChange(e)} placeholder="Entert new password"/>
                        <p>{state.newPassword}</p>
                    </div>
                    <div>
                        <label>New Password: </label>
                        <input type="password" name="repeatPassword" value={state.repeatPassword} onChange={(e)=>handleChange(e)} placeholder="Repeat new password"/>
                        <p>{state.repeatPassword}</p>
                    </div>
                    <div>
                        <button type='submit' onClick={(e)=>handleSubmit(e)}>Submit</button>
                    </div>
                </form>
                {
                    state.alert === ""? null : (
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