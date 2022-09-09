import React from 'react'
import { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import {verifyUser} from '../../redux/action'
import { useDispatch } from "react-redux";

function Verify() {
    const history = useHistory();
    let pathName = history.location.pathname.split('/');
    let id = pathName[pathName.length-2]
    let token = pathName[pathName.length-1]
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(verifyUser(id,token)).then(()=>{
            console.log("Token: "+token)
            console.log("ID: "+id)
        })
    },[])
    return (
        <div>
            <h1>Email verification</h1>
            <p>Token: {token}</p>
            <p>ID: {id}</p>
        </div>
    )
}

export default Verify