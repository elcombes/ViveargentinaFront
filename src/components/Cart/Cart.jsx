import Dropdown from "react-bootstrap/Dropdown";
import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

export default function Cart() {
  // Para limpiar todo el localStorage
  localStorage.clear();
  //Esta parte va en el componente previo
  let arrayItemsStore = JSON.parse(localStorage.getItem("items"));
  if (arrayItemsStore === null) arrayItemsStore = [];
  let newItem = {
    name: "City Tour Buenos Aires",
    price: 9500,
    pax: 4,
    total: 18000,
  };
  arrayItemsStore.push(newItem);
  let newItem2 = {
    name: "City Tour cordoba",
    price: 7000,
    pax: 6,
    total: 18000,
  };
  arrayItemsStore.push(newItem2);
  localStorage.setItem("items", JSON.stringify(arrayItemsStore));

  //Esta parte va aca en el carrito
  let itemsFromStore = JSON.parse(localStorage.getItem("items"));

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const [cambia, setCambia] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    setCambia("cambiado");
  }, []);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleClickNeg = async (e) => {
    setCambia(`cambia${e.target.value}`);
    itemsFromStore[e.target.value].pax =
      (await itemsFromStore[e.target.value].pax) - 1;
    console.log(itemsFromStore);
    console.log(itemsFromStore[e.target.value].pax);
    console.log(cambia);
  };

  return (
    <div>
      <div ref={ref}>
        <Button onClick={handleClick}>Holy guacamole!</Button>

        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Header as="h3">Popover bottom</Popover.Header>
            {itemsFromStore.map((item, index) => {
              return (
                <Popover.Body>
                  <strong>{item.name}</strong>
                  <strong>{"Ars" + item.price}</strong>
                  <button
                    value={index}
                    onClick={(e) => {
                      handleClickNeg(e);
                    }}
                  >
                    -
                  </button>
                  <strong>{item.pax}</strong>
                  <button onClick={() => (item.pax = item.pax + 1)}>+</button>
                  <strong>{item.pax * item.price}</strong>
                </Popover.Body>
              );
            })}
          </Popover>
        </Overlay>
      </div>
    </div>
  );
}
