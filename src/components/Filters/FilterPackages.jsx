import React, {Fragment} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllCities, getCityById, getAllPackages } from '../../redux/action';


export default function FilterPackages({handleOrder}) {

const allCities = useSelector(state => state.allCities);



const dispatch = useDispatch();

useEffect(() => {
    dispatch(getAllCities())
    dispatch(getAllPackages())
}, [dispatch]);


       
    function handleFilterByCity(e) {
        if(e.target.value === 'all') {
            dispatch(getAllPackages())
        } else {
             dispatch(getCityById(e.target.value))
        }
    }

    return (
        <Fragment>
            <div> 
                <form id='formFilter'> 
                
                <p> ORDER BY </p>
                
                <select id= "alphabeticOrder" onChange={e => handleOrder(e)}>
                    <option hidden>ALFABETIC</option>
                    <option value='sort'>Sort</option>
                    <option value='ascendant by name'>A - Z</option>
                    <option value='descendant by name'>Z - A</option>
                </select>

                <select id= "priceOrder" onChange={e => handleOrder(e)}>
                    <option hidden>PRICE</option>
                    <option value='sort'>Sort</option>
                    <option value='ascendant by price'>ASC</option>
                    <option value='descendant by price'>DESC</option>
                </select>

                <select id= "scoreOrder" onChange={e => handleOrder(e)}>
                    <option hidden>SCORE</option>
                    <option value='sort'>Sort</option>
                    <option value='ascendant by score'>ASC</option>
                    <option value='descendant by score'>DESC</option>
                </select>
                
               
                <p> CITIES </p>
                <select id="cityFilter"onChange={e => handleFilterByCity(e)}>
                    <option value='all'>All</option>
                    {allCities && allCities.sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    })
                    .map((c) => {
                        return (
                            <option value={c.id} key={c.id}>
                            {c.name}
                            </option>
                        );
                    })};
                </select>
                </form>
                    
                  


                </div>
        </Fragment>
    )
}