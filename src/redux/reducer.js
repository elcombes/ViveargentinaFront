import {
  GET_REGION_BY_ID,
  GET_CITY_BY_ID,
  GET_ALL_CITIES,
  GET_ALL_EXPERIENCES,
  GET_ALL_PACKAGES,
  GET_ALL_CATEGORIES,
  GET_ALL_REGIONS,
  GET_CITIES_BY_NAME,
  GET_PACKAGES_BY_NAME,
  GET_PACKAGE_BY_ID,
  GET_EXPERIENCES_BY_NAME,
} from "./action";
import {
  FILTER_EXPERIENCES,
  ORDER_EXPERIENCES,
  ORDER_PACKAGES,
  ORDER_CITIES,
  GET_USER_PROFILE,
  GET_USER_LOGIN,
} from "./action";

const initialState = {
  cityById: {},
  allCities: [],
  allPackages: [],
  allCategories: [],
  allExperiences: [],
  allRegions: [],
  userAuth: false,
  userBasicInfo: {},
  token: "",
  userExperiencesBought: [],
  userPackagesBought: [],
  userExperiencesFavorite: [],
  userPackagesFavorite: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      let allExperiences = action.payload.experiences;
      let allPackages = action.payload.packages;

      let userExperiencesBought = allExperiences.map((e) => {
        return e.bought === true;
      });
      let userPackagesBought = allPackages.map((p) => {
        return p.bought === true;
      });
      let userExperiencesFavorite = allExperiences.map((e) => {
        return e.favorite === true;
      });
      let userPackagesFavorite = allPackages.map((p) => {
        return p.favorite === true;
      });

      return {
        ...state,
        userExperiencesBought: userExperiencesBought,
        userPackagesBought: userPackagesBought,
        userExperiencesFavorite: userExperiencesFavorite,
        userPackagesFavorite: userPackagesFavorite,
      };
    case GET_USER_LOGIN:
      
      return{
        ...state,
        token: action.payload.accessToken,
        userAuth: true,
        userBasicInfo: {
          first_name: action.payload.user.first_name,
          last_name: action.payload.user.last_name,
          email: action.payload.user.email,
          photo: action.payload.user.photo,
          birth_date: action.payload.user.birth_date,
          administrator: action.payload.user.administrator,
          provider: action.payload.user.provider,
          provider_requested: action.payload.user.provider_requested
        }
      }
    case GET_CITIES_BY_NAME:
      return {
        ...state,
        allCities: action.payload,
      };
    case GET_PACKAGES_BY_NAME:
      return {
        ...state,
        allPackages: action.payload,
      };
    case GET_PACKAGE_BY_ID:
      return {
        ...state,
        allExperiences: action.payload.experiences,
      };

    case GET_EXPERIENCES_BY_NAME:
      return {
        ...state,
        allExperiences: action.payload,
      };
    case GET_CITY_BY_ID:
      return {
        ...state,
        cityById: action.payload,
        allPackages: action.payload.packages,
      };
    case GET_REGION_BY_ID:
      return {
        ...state,
        allCities: action.payload.cities,
      };
    case GET_ALL_REGIONS:
      return {
        ...state,
        allRegions: action.payload,
      };
    case GET_ALL_CITIES:
      return {
        ...state,
        allCities: action.payload,
      };
    case GET_ALL_PACKAGES:
      return {
        ...state,
        allPackages: action.payload,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
    case GET_ALL_EXPERIENCES:
      return {
        ...state,
        allExperiences: action.payload,
      };
    case FILTER_EXPERIENCES:
      return {
        ...state,
        allExperiences: action.payload,
      };

    case ORDER_CITIES:
      let packagesOrdered2;
      if (action.payload === "sort") packagesOrdered2 = state.allCities;
      if (action.payload === "ascendant by name") {
        packagesOrdered2 = state.allCities.sort(function (a, b) {
          if (a.name > b.name) return 1;
          else if (a.name < b.name) return -1;
          else return 0;
        });
      } else if (action.payload === "descendant by name") {
        packagesOrdered2 = state.allCities.sort(function (a, b) {
          if (a.name > b.name) return -1;
          else if (a.name < b.name) return 1;
          else return 0;
        });
      } else if (action.payload === "ascendant by score") {
        packagesOrdered2 = state.allCities.sort(function (a, b) {
          return a.score - b.score;
        });
      } else if (action.payload === "descendant by score") {
        packagesOrdered2 = state.allCities.sort(function (a, b) {
          return b.score - a.score;
        });
      }
      return {
        ...state,
        allCities: packagesOrdered2,
      };

    case ORDER_PACKAGES:
      let packagesOrdered;

      if (action.payload === "sort") packagesOrdered = state.allPackages;
      if (action.payload === "ascendant by name") {
        packagesOrdered = state.allPackages.sort(function (a, b) {
          if (a.name > b.name) return 1;
          else if (a.name < b.name) return -1;
          else return 0;
        });
      } else if (action.payload === "descendant by name") {
        packagesOrdered = state.allPackages.sort(function (a, b) {
          if (a.name > b.name) return -1;
          else if (a.name < b.name) return 1;
          else return 0;
        });
      } else if (action.payload === "ascendant by price") {
        packagesOrdered = state.allPackages.sort(function (a, b) {
          return a.price - b.price;
        });
      } else if (action.payload === "descendant by price") {
        packagesOrdered = state.allPackages.sort(function (a, b) {
          return b.price - a.price;
        });
      } else if (action.payload === "ascendant by score") {
        packagesOrdered = state.allPackages.sort(function (a, b) {
          return a.score - b.score;
        });
      } else if (action.payload === "descendant by score") {
        packagesOrdered = state.allPackages.sort(function (a, b) {
          return b.score - a.score;
        });
      }
      return {
        ...state,
        allPackages: packagesOrdered,
      };

    case ORDER_EXPERIENCES:
      let experiencesOrdered;
      if (action.payload === "sort") experiencesOrdered = state.allExperiences;
      if (action.payload === "ascendant by name") {
        experiencesOrdered = state.allExperiences.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          else return 0;
        });
      } else if (action.payload === "descendant by name") {
        experiencesOrdered = state.allExperiences.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          else return 0;
        });
      } else if (action.payload === "ascendant by price") {
        experiencesOrdered = state.allExperiences.sort(function (a, b) {
          return a.price - b.price;
        });
      } else if (action.payload === "descendant by price") {
        experiencesOrdered = state.allExperiences.sort(function (a, b) {
          return b.price - a.price;
        });
      } else if (action.payload === "ascendant by score") {
        experiencesOrdered = state.allExperiences.sort(function (a, b) {
          return a.score - b.score;
        });
      } else if (action.payload === "descendant by score") {
        experiencesOrdered = state.allExperiences.sort(function (a, b) {
          return b.score - a.score;
        });
      }
      return {
        ...state,
        allExperiences: experiencesOrdered,
      };
    default:
      return state;
  }
}
