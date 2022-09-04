import React, { useState, useRef, useEffect } from "react";

export default function ItemCart({name, pax, price, changeState}) {

    const [itemPax, setItemPax] = useState(pax);
    const [remove, setRemove] = useState(true);

    let itemsFromStore = JSON.parse(localStorage.getItem("items"));
    
    
    function onClickNeg() {
        setItemPax(itemPax - 1)
    }
    
    function onClickPos() {
        setItemPax(itemPax + 1)
    }
    
    function onRemove() {
        console.log(itemsFromStore)
        if(remove) setRemove(false)
        if(!remove) setRemove(true)
        let newItemsFromStore = itemsFromStore.filter(i => i.name !== name)
        localStorage.setItem("items", JSON.stringify(newItemsFromStore));
        changeState()
        console.log(itemsFromStore)

    }

    return (
        <div>
            <h4>{name}</h4>
            <button onClick={() => onClickNeg()}>-</button>
            <h4>{itemPax}</h4>
            <button onClick={() => onClickPos()}>+</button>
            <h4>{price*itemPax}</h4>
            <button onClick={() => onRemove()}>Remove</button>
        </div>
    )
}