import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { approveSaleStatus } from "../../redux/action";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Approved() {
  const history = useHistory();
  let pathName = window.location.href.split("&");
  let saleId = pathName[4].split("=")[1];
  let status = pathName[3].split("=")[1];
  console.log(saleId);
  console.log(status);

  let user = JSON.parse(window.localStorage.getItem("user"));
  if (!user) {
    history.push("/home");
  }
  
  let token = user.accessToken;
  const dispatch = useDispatch();
  let response;

  useEffect(async () => {
    console.log(token);
    response = await dispatch(
      approveSaleStatus(token, { status: status, saleId: saleId })
    );
    {response==="Time to travel!"?
    Swal.fire({
      title: response,
      imageUrl:
        "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663806094/VivaArg/Alerts/passagerAlert_8_zhqpyt.png",
      imageWidth: 350,
      imageHeight: 300,
      confirmButtonColor: "#C49D48",
      imageAlt: "Custom image",
    }).then(() => {
      history.push("/home");
    })
    :
    Swal.fire({
      title: response,
      imageUrl:
        "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663003831/VivaArg/Alerts/2_wsn0oa.png",
      imageWidth: 350,
      imageHeight: 300,
      confirmButtonColor: "#C49D48",
      imageAlt: "Custom image",
    }).then(() => {
      history.push("/home");
    });
  }

  }, []);

  return (
    <div>

    </div>
  );
}

export default Approved;
