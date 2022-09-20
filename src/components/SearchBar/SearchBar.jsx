import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { getCitiesByName, getPackagesByName, getExperiencesByName, getAllCities, getAllPackages, getAllExperiences } from "../../redux/action";
import styles from '../SearchBar/SearchBar.module.css';

export default function Search({ setPage }) {

    const dispatch = useDispatch();
    const history = useHistory();
    let pathName = history.location.pathname
    const [name, setName] = useState("")
    const [input, setInput] = useState(document.getElementsByClassName("form-control input-lg").placeholder)

    function handleName(e) {
        setName(e.target.value)
    }

    useEffect(() => {
        if (pathName.includes("/cities")) setInput("Example: Cordoba")
        if (pathName.includes("/packages")) setInput("Example: Cordoba Adventure")
        if (pathName.includes("/experiences")) setInput("Example: City Tour Buenos Aires")
    })


    function handleReload(e) {
        if (pathName.includes("/cities") || pathName.includes('/packages')) setPage(1);
        if (document.getElementById("alphabeticOrder")) {
            document.getElementById("alphabeticOrder").value = "sort"
        }
        if (document.getElementById("priceOrder")) {
            document.getElementById("priceOrder").value = "sort"
        }
        if (document.getElementById("scoreOrder")) {
            document.getElementById("scoreOrder").value = "sort"
        }
        if (document.getElementById("categoryFilter")) {
            document.getElementById("categoryFilter").value = "all"
        }
        if (document.getElementById("packageFilter")) {
            document.getElementById("packageFilter").value = "all"
        }
        if (document.getElementById("cityFilter")) {
            document.getElementById("cityFilter").value = "all"
        }
        if (pathName.includes("/cities")) {
            pathName = "/cities"
            return dispatch(getAllCities())
        }
        if (pathName.includes("/packages")) {
            pathName = "/packages"
            return dispatch(getAllPackages())
        }
        if (pathName.includes("/experiences")) {
            pathName = "/experiences"
            return dispatch(getAllExperiences())
        }
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        if (name) {
            if (pathName.includes("/cities")) {
                dispatch(getCitiesByName(name))
                setName("")
            }
            if (pathName.includes("/packages")) {
                dispatch(getPackagesByName(name))
                setName("")
            }
            if (pathName.includes("/experiences")) {
                e.preventDefault()
                dispatch(getExperiencesByName(name))
                setName("")
                setTimeout(() => {
                    setPage(1)
                }, 180);
            }
        }
    }



    return (
        <div className="container-fluid">

            <div className={styles.container}>
                <form className={styles.searchbarstyle} onSubmit={(e) => handleSubmit(e)}>
                    <button onClick={(e) => handleReload(e)} type="button" class="btn btn-outline-secondary btn-lg"><i class="bi bi-arrow-clockwise"></i></button>
                    <div class="col-md-3">
                        <label class="visually-hidden" for="specificSizeInputName">Name</label>
                        <input type="text" value={name} className="form-control input-lg" id="specificSizeInputName" placeholder={input} onChange={(e) => handleName(e)} />
                    </div>
                    <div class="col-md-auto">
                        <button type="submit" class="btn btn-outline-secondary btn-lg" style={{ textTransform: "uppercase" }}>Search</button>
                    </div>
                </form>
            </div>

        </div>
    );


}

