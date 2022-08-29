import { GET_REGION_BY_ID, GET_CITY_BY_ID, GET_ALL_CITIES, GET_ALL_EXPERIENCES , GET_ALL_PACKAGES, GET_ALL_CATEGORIES, GET_ALL_REGIONS } from "./action";
import { FILTER_EXPERIENCES, ORDER_EXPERIENCES, ORDER_PACKAGES, ORDER_CITIES } from "./action";
  
  const initialState = {
    cityById: {},
    allCities: [],
    allPackages: [],
    allCategories: [],
    allExperiences: [],
    allRegions: []
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_CITY_BY_ID:
        return {
          ...state,
          cityById: action.payload,
          allPackages: action.payload.packages
        };
        case GET_REGION_BY_ID:
        return {
          ...state,
          allCities: action.payload.cities
        };
        case GET_ALL_REGIONS:
        return {
          ...state,
          allRegions: action.payload
        }
      case GET_ALL_CITIES:
        return {
          ...state,
          allCities: action.payload
        }
      case GET_ALL_PACKAGES:
        return {
          ...state,
          allPackages: action.payload,
        }
      case GET_ALL_CATEGORIES:
        return {
          ...state,
          allCategories: action.payload
        }
      case GET_ALL_EXPERIENCES:
        return {
          ...state,
          allExperiences: action.payload
        }
      case FILTER_EXPERIENCES:
        return {
          ...state,
          allExperiences: action.payload
        }

        case ORDER_CITIES:
          let packagesOrdered2
  
              if(action.payload === 'sort') packagesOrdered2 = state.allCities;
              if(action.payload === 'ascendant by name') {
                packagesOrdered2 = state.allCities.sort(function(a, b) {
  
                      if(a.name > b.name) return 1;
                      else if(a.name < b.name) return -1;
                      else return 0;
                  })} 
              else if(action.payload === 'descendant by name') {
  
                packagesOrdered2 = state.allCities.sort(function(a, b) {
  
                      if(a.name > b.name) return -1;
                      else if(a.name < b.name) return 1;
                      else return 0;
                  })}    
              else if(action.payload === 'ascendant by score') {
                packagesOrdered2 = state.allCities.sort(function(a, b) {
                      return a.score - b.score;
                  })}
              else if(action.payload === 'descendant by score') {
                packagesOrdered2 = state.allCities.sort(function(a, b) {
  
                      return b.score - a.score;
                  })}
          return {
            ...state,
            allCities: packagesOrdered2
          }

      case ORDER_PACKAGES:
        let packagesOrdered

            if(action.payload === 'sort') packagesOrdered = state.allPackages;
            if(action.payload === 'ascendant by name') {
              packagesOrdered = state.allPackages.sort(function(a, b) {

                    if(a.name > b.name) return 1;
                    else if(a.name < b.name) return -1;
                    else return 0;
                })} 
            else if(action.payload === 'descendant by name') {

              packagesOrdered = state.allPackages.sort(function(a, b) {

                    if(a.name > b.name) return -1;
                    else if(a.name < b.name) return 1;
                    else return 0;
                })} 
            else if(action.payload === 'ascendant by price') {

              packagesOrdered = state.allPackages.sort(function(a, b) {
                    return a.price - b.price;
                })}
            else if(action.payload === 'descendant by price') {
              packagesOrdered = state.allPackages.sort(function(a, b) {
                    return b.price - a.price;
                })}
            else if(action.payload === 'ascendant by score') {
              packagesOrdered = state.allPackages.sort(function(a, b) {
                    return a.score - b.score;
                })}
            else if(action.payload === 'descendant by score') {
              packagesOrdered = state.allPackages.sort(function(a, b) {

                    return b.score - a.score;
                })}
        return {
          ...state,
          allPackages: packagesOrdered
        }

      case ORDER_EXPERIENCES:
        let experiencesOrdered
        if(action.payload === 'sort') experiencesOrdered = state.allExperiences;
        if(action.payload === 'ascendant by name') {
          experiencesOrdered = state.allExperiences.sort(function(a, b) {
                if(a.name > b.name) return 1;
                else if(a.name < b.name) return -1;
                else return 0;
            })} 
        else if(action.payload === 'descendant by name') {
          experiencesOrdered = state.allExperiences.sort(function(a, b) {
                if(a.name > b.name) return -1;
                else if(a.name < b.name) return 1;
                else return 0;
            })} 
        else if(action.payload === 'ascendant by price') {
          experiencesOrdered = state.allExperiences.sort(function(a, b) {
                return a.price - b.price;
            })}
        else if(action.payload === 'descendant by price') {
          experiencesOrdered = state.allExperiences.sort(function(a, b) {
                return b.price - a.price;
            })}
        else if(action.payload === 'ascendant by score') {
          experiencesOrdered = state.allExperiences.sort(function(a, b) {
                return a.score - b.score;
            })}
        else if(action.payload === 'descendant by score') {
          experiencesOrdered = state.allExperiences.sort(function(a, b) {
                return b.score - a.score;
            })}
    return {
      ...state,
      allExperiences: experiencesOrdered
    }
      default:
        return state;
    }
  }