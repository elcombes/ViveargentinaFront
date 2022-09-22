import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { changePassword } from '../../redux/action'
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import styles from './User.module.css'

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
  const [viewCurrentPassword, setViewCurrentPassword] = useState(false)
  const [viewNewPassword, setViewNewPassword] = useState(false)
  const [viewNewRepeatPassword, setviewNewRepeatPassword] = useState(false)


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
    let passwordLowerCases = /[a-z]/g;
    let passwordUpperCases = /[A-Z]/g;
    let passwordNumbers = /[0-9]/g;
    // if (!state.currentPassword) errors.currentPassword = "Current password is required"
    if (!state.newPassword) {
      errors.newPassword = "Invalid password"
    }
    if (!state.newPassword.match(passwordLowerCases) || !state.newPassword.match(passwordUpperCases) || !state.newPassword.match(passwordNumbers) || state.newPassword.length < 8) {
      errors.newPassword = "Invalid password"
    }
    if (!state.repeatPassword) {
      errors.repeatPassword = "Password do not much"
    }
    if (state.repeatPassword !== state.newPassword) {
      errors.repeatPassword = "Password do not much"
    }
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

  const handleViewCurrentPassword = (e) => {
    e.preventDefault()
    if (viewCurrentPassword) {
      document.getElementById("currentPassword").type = "password"
      setViewCurrentPassword(false)

    }
    if (!viewCurrentPassword) {
      document.getElementById("currentPassword").type = "text"
      setViewCurrentPassword(true)
    }
  }

  const handleViewNewPassword = (e) => {
    e.preventDefault()
    if (viewNewPassword) {
      document.getElementById("newPassword").type = "password"
      setViewNewPassword(false)

    }
    if (!viewNewPassword) {
      document.getElementById("newPassword").type = "text"
      setViewNewPassword(true)
    }
  }

  const handleViewNewRepeatPassword = (e) => {
    e.preventDefault()
    if (viewNewRepeatPassword) {
      document.getElementById("newRepeatPassword").type = "password"
      setviewNewRepeatPassword(false)

    }
    if (!viewNewRepeatPassword) {
      document.getElementById("newRepeatPassword").type = "text"
      setviewNewRepeatPassword(true)
    }
  }


  return (
    <div>
      <div>
        <form className={`${styles.formchangepass} mt-5`} onSubmit={handleSubmit}>
          <div>
            <label>Current password: </label>
            <input className={`form-control ${styles.chngpassinput}`} id="currentPassword" type="password" name="currentPassword" value={state.currentPassword} onChange={(e) => handleChange(e)} placeholder="Enter current password" />
            {
              viewCurrentPassword ? <button onClick={(e) => handleViewCurrentPassword(e)} class="bi bi-eye-slash-fill"></button> : <button onClick={(e) => handleViewCurrentPassword(e)} class="bi bi-eye-fill"></button>
            }
          </div>
          <div>
            <label>New password: </label>
            <input className={`form-control ${styles.chngpassinput}`} id="newPassword" type="password" name="newPassword" value={state.newPassword} onChange={(e) => handleChange(e)} placeholder="Enter new password" />
            {
              viewNewPassword ? <button onClick={(e) => handleViewNewPassword(e)} class="bi bi-eye-slash-fill"></button> : <button onClick={(e) => handleViewNewPassword(e)} class="bi bi-eye-fill"></button>
            }
            {errors.newPassword ?
              <p id="errors" hidden>{errors.newPassword}</p> :
              <p className="validMessage">Looks Good!</p>
            }
          </div>
          <div>
            <label>Repeat New password: </label>
            <input className={`form-control ${styles.chngpassinput}`} id="newRepeatPassword" type="password" name="repeatPassword" value={state.repeatPassword} onChange={(e) => handleChange(e)} placeholder="Repeat new password" />
            {
              viewNewRepeatPassword ? <button onClick={(e) => handleViewNewRepeatPassword(e)} class="bi bi-eye-slash-fill"></button> : <button onClick={(e) => handleViewNewRepeatPassword(e)} class="bi bi-eye-fill"></button>
            }
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