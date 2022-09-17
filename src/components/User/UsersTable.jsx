import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, resetPasswordRequest, shiftAdmin, softDelete } from "../../redux/action";
import "./UsersTable.css";
import Swal from "sweetalert2";

export default function UsersTable() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  // console.log("allUsers", allUsers);
  const token = JSON.parse(window.localStorage.getItem("user")).accessToken

  const orderUsers = allUsers.sort(function (a, b) {
    if (a.email.toLowerCase() > b.email.toLowerCase()) return 1;
    if (a.email.toLowerCase() < b.email.toLowerCase()) return -1;
    else return 0;
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleResetPass= async (e)=>{
    let userEmail
    if(e.target.name){
      userEmail = e.target.name
    }else{
      userEmail = JSON.stringify(e.target.outerHTML).split('\\"')[1]
    }
    // console.log("email: "+userEmail)
    const resp = await dispatch(resetPasswordRequest(userEmail))
    console.log(resp)
    Swal.fire({
      title: resp+"!",
      imageUrl: "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png",
      imageWidth: 350,
      imageHeight: 300,
      confirmButtonColor: "#C49D48",
      imageAlt: "Custom image",
    });
  }

  const handleChangeBlock = async (e)=>{
    const response = await dispatch(softDelete({token, userId: e.target.name}))
    Swal.fire({
      title: response+"!",
      imageUrl: "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663371555/VivaArg/Alerts/passagerAlert_4_orw614.png",
      imageWidth: 350,
      imageHeight: 300,
      confirmButtonColor: "#C49D48",
      imageAlt: "Custom image",
    });
  }

  const handleChangeAdmin = async (e)=>{
    const response = await dispatch(shiftAdmin({token, userId: e.target.name}))
    Swal.fire({
      title: response+"!",
      imageUrl: "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663371555/VivaArg/Alerts/passagerAlert_4_orw614.png",
      imageWidth: 350,
      imageHeight: 300,
      confirmButtonColor: "#C49D48",
      imageAlt: "Custom image",
    });
  }

  return (
    <div className="container mt-5 ">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="rounded">
            <div className="table-responsive table-borderless">
              <table className="table table-bordered vertalign">
                {/* Encabezado de columnas */}
                <thead className='text-center'>
                  <tr>
                    <th>BLOCK</th>
                    <th>EMAIL</th>
                    <th>NAME</th>
                    <th>ADMIN</th>
                    <th>PASS RESET</th>
                  </tr>
                </thead>

                {/* Contenido - Filas */}

                {orderUsers?.map((u) => {
                  return (
                    <tbody className="table-body">
                      <tr className="cell-1">
                        <td>
                          <div className="buttonblock">
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                onChange={(e)=>handleChangeBlock(e)} 
                                type="checkbox" 
                                role="switch" 
                                defaultChecked={u.disabled ? true : false} 
                                name={u.id} 
                                id="flexSwitchCheckDefault" />
                            </div>
                          </div>
                        </td>
                        <td>{u.email.substring(0, 6) === 'google' ? u.email.slice(7)+" (Google)" : u.email}</td>
                        <td>{u.first_name + " " + u.last_name}</td>
                        <td className="text-center">
                          <input
                            className="form-check-input"
                            type="checkbox" 
                            name={u.id}
                            onChange={(e)=>handleChangeAdmin(e)}
                            defaultChecked={u.administrator ? true : false}
                          ></input>
                        </td>
                        <td className="text-center">
                          {
                            u.email.substring(0, 6) === 'google' ?
                            null:
                            (
                              <button onClick={(e)=>handleResetPass(e)} name={u.email} className="btn btn-outline-secondary">
                                <i name={u.email} className="bi bi-key-fill"></i>
                              </button>
                            )
                          }
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}