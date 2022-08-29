import React, {Fragment} from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllCities, getAllRegions, getRegionById, orderCities } from '../../redux/action';


export default function FilterCities() {

const allRegions = useSelector(state => state.allRegions);
const allCities = useSelector(state => state.allCities);
const [Order, setOrder] = useState('');
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getAllRegions())
    dispatch(getAllCities())
}, [dispatch]);

function handleOrder(e) {
    setOrder(e.target.value)
    console.log(Order)
    dispatch(orderCities(e.target.value))
}

function handleFilterByRegion(e) {
    if(e.target.value === 'all') {
        dispatch(getAllCities())
    } else {
         dispatch(getRegionById(e.target.value))
    }
}

    return (
        <Fragment>
            <div> 
                <form id='formFilter'> 

                <select onChange={e => handleOrder(e)}>
                    <option hidden>ALFABETIC</option>
                    <option value='sort'>Sort</option>
                    <option value='ascendant by name'>A - Z</option>
                    <option value='descendant by name'>Z - A</option>
                </select>

                <select onChange={e => handleOrder(e)}>
                    <option hidden>SCORE</option>
                    <option value='sort'>Sort</option>
                    <option value='ascendant by score'>ASC</option>
                    <option value='descendant by score'>DESC</option>
                </select>
                
                <p> FILTER RESULTS </p>
                <p> REGIONS </p>
                <select onChange={e => handleFilterByRegion(e)}>
                    <option value='all'>ALL</option>
                    {allRegions && allRegions.sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    })
                    .map((r) => {
                        return (
                            <option value={r.id} key={r.id}>
                            {r.name}
                            </option>
                        );
                    })};
                </select>
              </form>
              {allCities && allCities.map(c => {return <>
              <p>{c.name}</p>
              <p>{c.description}</p>
              <p>{c.subTitle}</p>
              </>})}
                </div>
        </Fragment>
    )
}