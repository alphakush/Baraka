export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const GET_ALL_BARS = "GET_ALL_BARS";
export const TOGGLE_ERROR_BARS = "TOGGLE_ERROR_BARS";
export const GET_FAVORITES_BARS = "GET_FAVORITES_BARS";

import Api from '../../api/api';

// Function pour obtenir tous les bars.
export const getAllBar = () => {
    return async dispatch => {
        try {
            const response = await Api.get('/allbars');
            dispatch({ type: GET_ALL_BARS,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};

// Function permettant d'ajouter un bar à ses favoris.
export const addFavorite = (barID) => {
    return async dispatch => {
        try {
            const response = await Api.post('/add-favorite', {barID});
            dispatch({ type: ADD_TO_FAVORITE,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};

//Function permettant d'obtenir tous ses bars favoris.
export const getFavoriteBar = () => {
    return async dispatch => {
        try {
            const response = await Api.get('/my-favorite-bar');
            dispatch({ type: GET_FAVORITES_BARS,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};
