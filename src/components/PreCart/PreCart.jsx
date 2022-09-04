import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function PreCart() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [item, setItem] = useState({
    name: "City Tour Buenos Aires",
    price: 9500,
    pax: 0,
  });

  const handleClick = (e) => {
    let arrayItemsStore = JSON.parse(localStorage.getItem("items"));
    if (arrayItemsStore === null) arrayItemsStore = [];
    console.log(item);
    arrayItemsStore.push(item);
    localStorage.setItem("items", JSON.stringify(arrayItemsStore));
  };

  const handleChange = async (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        PreCart
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>{item.name}</Modal.Body>
        <Modal.Body>{"Price:" + item.price}</Modal.Body>
        <select name="pax" onChange={(e) => handleChange(e)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <Modal.Body>{"Pax:" + item.pax}</Modal.Body>
        <Modal.Body>{"Total:" + item.price * item.pax}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Agregar al carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
