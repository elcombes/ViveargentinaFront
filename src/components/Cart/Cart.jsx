import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';


export default function Cart() {

    localStorage.setItem("titulo", "Curso de Angular avanzado - Víctor Robles");
    let localStore = JSON.parse(localStorage.getItem("mi_objeto"));
    let mi_objeto = {name: 'franco'}
    localStorage.setItem("usuario", JSON.stringify(mi_objeto));
    console.log(mi_objeto)

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
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
          <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
            <strong>Holy guacamole!</strong> Check this info.

          </Popover.Body>
          <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
            <strong>Holy guacamole!</strong> Check this info.
            <button>+</button>
          </Popover.Body>
        </Popover>
        
      </Overlay>
      
    </div>
        </div>
    )
}