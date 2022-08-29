/* import React, { useState } from "react"; */
/* import { useDispatch } from "react-redux";
import { getCitiesByName } from "../../redux/action"; */
import styles from '../SearchBar/SearchBar.module.css';

export default function Search() {

 /*    const dispatch = useDispatch();
    const [nameCity, setNameCities] = useState(""); */

/*     function handleInput(e) {
        setNameCities(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        if (nameCity) {
            dispatch(getCitiesByName(nameCity));
            setNameCities("");
        }
    }
 */

    
    return (
        <div className="container-fluid">

            <div className={styles.container}>
                <form className={styles.searchbarstyle}>
                    <div class="col-md-2">
                        <label class="visually-hidden" for="specificSizeInputName">Name</label>
                        <input type="text" class="form-control input-lg" id="specificSizeInputName" placeholder="Example: Cordoba" />
                    </div>
                    <div class="col-md-auto">
                        <button type="submit" class="btn btn-outline-secondary btn-lg">Submit</button>
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

