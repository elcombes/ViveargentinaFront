import Dropdown from "react-bootstrap/Dropdown";
import React, { useState, useRef, useEffect } from "react";
import ItemCart from "./ItemCart";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

export default function Cart() {
  // Para limpiar todo el localStorage
  // localStorage.clear();

  let totalcart = 0
  const [state, setState] = useState(true);

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

  return (
    <div>
      <button
        class="btn btn-secondary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i class="bi bi-cart"></i>
      </button>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            <h4><i class="bi bi-cart"></i> My Cart</h4>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          {itemsFromStore?.map((item) => {
            totalcart = totalcart+(item.price*item.pax);
            return (
              <ItemCart
                name={item.name}
                price={item.price}
                pax={item.pax}
                image={item.image}
                dates={item.dates}
                changeState={changeState}
              ></ItemCart>
            );
          })}
          <div>
            {/* Total: {totalcart} */}
            <button className="btn btn-secondary">COMPRAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
