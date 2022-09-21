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
  console.log("user: " + user);
  let token = user.accessToken;
  const dispatch = useDispatch();
  let response;

  useEffect(async () => {
    console.log(token);
    response = await dispatch(
      approveSaleStatus(token, { status: status, saleId: saleId })
    );
    Swal.fire({
      title: response + "!",
      imageUrl:
        "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png",
      imageWidth: 350,
      imageHeight: 300,
      confirmButtonColor: "#C49D48",
      imageAlt: "Custom image",
    }).then(() => {
      history.push("/home");
    });
  }, []);

  return (
    <div>
      <h1>Payment Approval</h1>
    </div>
  );
}

export default Approved;
