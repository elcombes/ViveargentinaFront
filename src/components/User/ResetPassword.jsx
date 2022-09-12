import React from 'react'
import { useHistory } from "react-router-dom";
import { passwordReset } from '../../redux/action'
import { useDispatch } from "react-redux";
import { useState } from "react";

function ResetPassword() {
    const dispatch = useDispatch()
    const history = useHistory()
    const pathName = history.location.pathname.split('/')
    const token = pathName[pathName.length-1]
    const [state, setState] = useState({
        newPassword: "",
        repeatPassword: "",
        alert: ""
    })
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("New Password: "+state.newPassword)
    }

    const validate = ()=>{
        if(state.newPassword === ""){
            setState({
                ...state,
                alert: "please enter the new password"
            })
            return false
        }else if(state.newPassword != state.repeatPassword){
            setState({
                ...state,
                alert: "please enter the same password in both inputs"
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
        validate()
    };

    return(
        <>
            <div><h1>ResetPassword</h1></div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>New Password: </label>
                        <input type="password" name="newPassword" onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div>
                        <label>Repeat New Password: </label>
                        <input type="password" name="repeatPassword" onChange={(e)=>handleChange(e)}/>
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
        </>
    )
}


export default ResetPassword