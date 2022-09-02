import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css'
import { getAllExperiences, getAllPackages, getAllCategories, filterExperiences, orderExperiences } from '../../redux/action';

export default function FilterExperiencies({ handleOrder }) {

    const allExperiences = useSelector(state => state.allExperiences);
    const allCategories = useSelector(state => state.allCategories);
    const allPackages = useSelector(state => state.allPackages);
    const [state, setState] = useState({
        selectedPackage: false,
        selectedCategory: false
    })



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllExperiences())
        dispatch(getAllPackages())
        dispatch(getAllCategories())
    }, [dispatch]);




    function handleFilterByCategory(e) {
        if (e.target.value === 'all') {
            setState({
                ...state,
                selectedCategory: false
            })
        } else {
            setState({
                ...state,
                selectedCategory: e.target.value
            })
        }
    }

    function handleFilterByPackage(e) {
        if (e.target.value === 'all') {
            setState({
                ...state,
                selectedPackage: false
            })
        } else {
            setState({
                ...state,
                selectedPackage: e.target.value
            })
        }
    }

    function handleChange(e) {
        e.preventDefault();
        document.getElementById("alphabeticOrder").value = "sort"
        document.getElementById("priceOrder").value = "sort"
        document.getElementById("scoreOrder").value = "sort"
        document.getElementById("categoryFilter").value = "all"
        document.getElementById("packageFilter").value = "all"
        dispatch(filterExperiences({ categoryId: state.selectedCategory, packageId: state.selectedPackage }))
    }

    return (
        <Fragment>
            <div>
                <form id='formFilter'>
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-md-6">
                                <h4 className="text-center mb-3"><i class="bi bi-filter-square-fill"></i> ORDER EXPERIENCES BY</h4>
                                <ul className={styles.filterstyle}>
                                    <li>
                                        <h5><i class="bi bi-sort-alpha-down"></i> ALFABETIC</h5>
                                        <select id="alphabeticOrder" onChange={e => handleOrder(e)}>
                                            <option value='sort'>Sort</option>
                                            <option value='ascendant by name'>A - Z</option>
                                            <option value='descendant by name'>Z - A</option>
                                        </select>
                                    </li>
                                    <li>
                                        <h5><i class="bi bi-tags-fill"></i> PRICE</h5>
                                        <select id="priceOrder" onChange={e => handleOrder(e)}>
                                            <option value='sort'>Sort</option>
                                            <option value='ascendant by price'>ASC</option>
                                            <option value='descendant by price'>DESC</option>
                                        </select>
                                    </li>
                                    <li>
                                        <h5><i class="bi bi-star-half"></i> SCORE</h5>
                                        <select id="scoreOrder" onChange={e => handleOrder(e)}>
                                            <option value='sort'>Sort</option>
                                            <option value='ascendant by score'>ASC</option>
                                            <option value='descendant by score'>DESC</option>
                                        </select>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-6">
                                <h4 className="text-center mb-3"><i class="bi bi-funnel-fill"></i> FILTER RESULTS</h4>
                                <ul className={styles.filterstyle}>
                                    <li>
                                        <h5><i class="bi bi-bookmarks-fill"></i> CATEGORIES</h5>
                                        <select id="categoryFilter" onChange={e => handleFilterByCategory(e)}>
                                            <option value='all'>ALL</option>
                                            {allCategories && allCategories.sort((a, b) => {
                                                if (a.name < b.name) return -1;
                                                if (a.name > b.name) return 1;
                                                return 0;
                                            })
                                                .map((cat) => {
                                                    return (
                                                        <option value={cat.id} key={cat.id}>
                                                            {cat.name}
                                                        </option>
                                                    );
                                                })};
                                        </select>
                                    </li>
                                    <li>
                                        <h5><i class="bi bi-box-seam-fill"></i> PACKAGES</h5>
                                        <select id="packageFilter" onChange={e => handleFilterByPackage(e)}>
                                            <option value='all'>ALL</option>
                                            {allPackages && allPackages.sort((a, b) => {
                                                if (a.name < b.name) return -1;
                                                if (a.name > b.name) return 1;
                                                return 0;
                                            })
                                                .map((p) => {
                                                    return (
                                                        <option value={p.id} key={p.id}>
                                                            {p.name}
                                                        </option>
                                                    );
                                                })};
                                        </select>
                                    </li>
                                    <li>
                                        <button className="btn btn-secondary" onClick={e => handleChange(e)}><i class="bi bi-funnel"></i> FILTER</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}