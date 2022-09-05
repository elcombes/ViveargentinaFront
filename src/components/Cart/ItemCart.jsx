import React, { useState, useRef, useEffect } from "react";
import styles from './Cart.module.css'
export default function ItemCart({ name, pax, price, changeState, image, dates }) {
    console.log('soy dates', dates )
    const [itemPax, setItemPax] = useState(pax);
    const [remove, setRemove] = useState(true);

    let itemsFromStore = JSON.parse(localStorage.getItem("items"));


    function onClickNeg() {
        setItemPax(parseInt(itemPax) - 1)
    }

    function onClickPos() {
        setItemPax(parseInt(itemPax) + 1)
    }

    function onRemove() {
        console.log(itemsFromStore)
        if (remove) setRemove(false)
        if (!remove) setRemove(true)
        let newItemsFromStore = itemsFromStore.filter(i => i.name !== name)
        localStorage.setItem("items", JSON.stringify(newItemsFromStore));
        changeState()
        console.log(itemsFromStore)

    }

    return (
        <div>
            <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="mb-3">
                        <h4 className={styles.titlecart}>{name} </h4> {dates}
                        </div>
                    <div className="col-md-6">
                        
                        <ul className={styles.buttonitemcart}>
                            <li><button className={`btn btn-secondary ${styles.buttonminmax}`} onClick={() => onClickNeg()}>-</button></li>
                            <li><div className={styles.itempax}>{itemPax}</div></li>
                            <li><button className={`btn btn-secondary ${styles.buttonminmax}`} onClick={() => onClickPos()}>+</button></li>
                        </ul>
                        <h4 className={styles.pricecart}>$ {price * itemPax}</h4>
                        <button className="btn btn-secondary" onClick={() => onRemove()}>Remove</button>
                    </div>
                    <div className="col-md-6">
                        <img className="img-fluid" src={image} alt="" />
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}