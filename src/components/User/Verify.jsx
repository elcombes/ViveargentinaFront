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
            history.push("/home")
        })
    },[])
    return (
        <div>{id}</div>
    )
}

export default Verify