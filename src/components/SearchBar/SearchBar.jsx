import React, { useEffect, useState } from "react"; 
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom"
import  {getCitiesByName, getPackagesByName, getExperiencesByName, getAllCities, getAllPackages, getAllExperiences}  from "../../redux/action"; 
import styles from '../SearchBar/SearchBar.module.css';

export default function Search() {

    const dispatch = useDispatch();
    const history = useHistory();
    let pathName = history.location.pathname
    const [name, setName] = useState("")
    const [input, setInput] = useState(document.getElementsByClassName("form-control input-lg").placeholder)

    function handleName(e) {
        setName(e.target.value)
    }

    useEffect(() => {
        if(pathName === "/cities") setInput("Example: Córdoba")
        if(pathName === "/packages") setInput("Example: Cordoba Adventure")
        if(pathName === "/experiences") setInput("Example: City Tour Buenos Aires")
    })


    function handleReload(e) {
            document.getElementById("alphabeticOrder").value = "sort"
            document.getElementById("priceOrder").value = "sort"
            document.getElementById("scoreOrder").value = "sort"
            if(pathName === "/cities") {
                dispatch(getAllCities())
            }
            if(pathName === "/packages") {
                dispatch(getAllPackages())
            }
            if(pathName === "/experiences") {
                dispatch(getAllExperiences())
        }
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        if (name) {
            if(pathName === "/cities") {
                dispatch(getCitiesByName(name))
                setName("")
            }
            if(pathName === "/packages") {
                dispatch(getPackagesByName(name))
                setName("")
            }
            if(pathName === "/experiences") {
                console.log(pathName)
                dispatch(getExperiencesByName(name))
                setName("")
            }
        }
    }
 

    
    return (
        <div className="container-fluid">

            <div className={styles.container}>
                <form className={styles.searchbarstyle} onSubmit={(e) => handleSubmit(e)}>
                    <button onClick={(e)=> handleReload(e)}type="button" class="btn btn-secondary"><i class="bi bi-arrow-clockwise"></i></button>
                    <div class="col-md-2">
                        <label class="visually-hidden" for="specificSizeInputName">Name</label>
                        <input type="text" value={name} className="form-control input-lg" id="specificSizeInputName" placeholder={input} onChange={(e)=>handleName(e)} />
                    </div>
                    <div class="col-md-auto">
                        <button type="submit" class="btn btn-outline-secondary btn-lg">Search</button>
                    </div>
                </form>
            </div>

            {/* <form className={styles.formsearch} onSubmit={(e) => handleSubmit(e)}>
                <input
                    className="input-search"
                    type="text"
                    placeholder="Search..."
                    value={nameCity}
                    onChange={(e) => handleInput(e)}
                />
                <button className="btn-search" type="submit">
                    Search
                </button>
            </form> */}

        </div>
    );


}

