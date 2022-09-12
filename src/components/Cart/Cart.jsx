import Dropdown from "react-bootstrap/Dropdown";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ItemCart from "./ItemCart";
import MercadoPago from "./MercadoPago";
import {
  buyInMercadoPago,
  addExperienceBought,
  addPackageBought,
} from "./../../redux/action.js";
import styles from "./Cart.module.css";

import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

export default function Cart() {
  // Para limpiar todo el localStorage
  // localStorage.clear();

  let totalcart = 0;
  const [state, setState] = useState(true);
  const [buy, setBuy] = useState(false);

  const dispatch = useDispatch();

  //Esta parte va aca en el carrito
  let itemsFromStore = JSON.parse(localStorage.getItem("items"));

  useEffect(() => {
    itemsFromStore = JSON.parse(localStorage.getItem("items"));
  }, [JSON.parse(localStorage.getItem("items"))]);

  function changeState() {
    if (state) {
      setState(false);
    } else {
      setState(true);
    }
  }

  function clearCart() {
    setBuy(false);
    localStorage.removeItem("items");
    if (state) {
      setState(false);
    } else {
      setState(true);
    }
  }

  function setBuyInFalse() {
    setBuy(false);
  }

  function onClickBuy() {
    setBuy(true);
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.user.id;
    itemsFromStore = JSON.parse(localStorage.getItem("items"));

    itemsFromStore.forEach((i) => {
      if (i.tipe === "package") {
        dispatch(addPackageBought(userId, i));
      } else if (i.tipe === "experience") {
        dispatch(addExperienceBought(userId, i));
      }
    });
    // dispatch(buyInMercadoPago(itemsFromStore));
  }

  if (!itemsFromStore || itemsFromStore.length === 0) {
    return (
      <div>
        <button
          class="btn btn-outline-secondary btn-lg"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          style={{
            borderColor: "#c49d48e3",
            borderRadius: "50%",
          }}
        >
          {" "}
          <i class="bi bi-cart"></i>{" "}
        </button>

        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
          style={{ backgroundColor: "#EFD6AC" }}
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">
              <h4 style={{ fontSize: "30px", color: "white" }}>
                <i
                  class="bi bi-cart"
                  style={{ fontSize: "30px", margin: "20px" }}
                ></i>{" "}
                MY CART
              </h4>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            You have no items in your cart yet <i class="bi bi-emoji-frown"></i>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <button
          class="btn btn-outline-secondary btn-lg"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          style={{
            borderColor: "#c49d48e3",
            borderRadius: "50%",
          }}
        >
          <i class="bi bi-cart"></i>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
          style={{
            background: "radial-gradient(circle at top, #C49D48 , #ffffff)",
          }}
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">
              <h4 style={{ fontSize: "30px", color: "white" }}>
                <i
                  class="bi bi-cart"
                  style={{ fontSize: "30px", margin: "20px" }}
                ></i>{" "}
                MY CART
              </h4>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            {itemsFromStore?.map((item, index) => {
              totalcart = totalcart + item.price * item.pax;
              return (
                <div>
                  <ItemCart
                    index={index}
                    setBuyInFalse={setBuyInFalse}
                    name={item.name}
                    price={item.price}
                    pax={item.pax}
                    image={item.image}
                    dates={item.dates}
                    changeState={changeState}
                  ></ItemCart>
                  <br />
                </div>
              );
            })}
            <div>
              {/* Total: {totalcart} */}

              <button
                id="mercadoPago"
                onClick={onClickBuy}
                className={`btn btn-outline-secondary btn-lg ${styles.buttonmercadopago}`}
              >
                BUY
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="25"
                  fill="currentColor"
                  class="bi bi-credit-card"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                </svg>
              </button>
              <button
                onClick={clearCart}
                className="btn btn-outline-secondary btn-lg"
              >
                CLEAR <i class="bi bi-cart" />
              </button>
              {buy ? <MercadoPago /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
