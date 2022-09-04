import Dropdown from "react-bootstrap/Dropdown";
import React, { useState, useRef, useEffect } from "react";
import ItemCart from "./ItemCart";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

export default function Cart() {
  // Para limpiar todo el localStorage
//   localStorage.clear();
//   //Esta parte va en el componente previo
//   let arrayItemsStore = JSON.parse(localStorage.getItem("items"));
//   if (arrayItemsStore === null) arrayItemsStore = [];
//   let newItem = {
//     name: "City Tour Buenos Aires",
//     price: 9500,
//     pax: 4,
//     total: 18000,
//   };
//   arrayItemsStore.push(newItem);
//   let newItem2 = {
//     name: "City Tour cordoba",
//     price: 7000,
//     pax: 6,
//     total: 18000,
//   };
//   arrayItemsStore.push(newItem2);
//   localStorage.setItem("items", JSON.stringify(arrayItemsStore));

  //Esta parte va aca en el carrito
  let itemsFromStore = JSON.parse(localStorage.getItem("items"));

  useEffect(() => {
      itemsFromStore = JSON.parse(localStorage.getItem("items"));
  }, [JSON.parse(localStorage.getItem("items"))])

  return (
    <div>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
            {itemsFromStore.map((item) => {
                return (
                    <ItemCart name={item.name} price={item.price} pax={item.pax} itemsFromStore={itemsFromStore}></ItemCart>
                )
            })}
            </div>
        </div>
    </div>
  );
}
