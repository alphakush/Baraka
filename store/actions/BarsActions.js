export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const REMOVE_TO_FAVORITE = "REMOVE_TO_FAVORITE";
export const GET_ALL_BARS = "GET_ALL_BARS";
export const TOGGLE_ERROR_BARS = "TOGGLE_ERROR_BARS";
export const GET_FAVORITES_BARS = "GET_FAVORITES_BARS";
export const GET_COMMENT = "GET_COMMENT";
export const POST_COMMENT = "POST_COMMENT";

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

// Function permettant d'AJOUTER un bar à ses favoris.
export const addBarToFavorite = (barID) => {
    return async dispatch => {
        try {
            const response = await Api.post('/bar/add-favorite', {barID});
            dispatch({ type: ADD_TO_FAVORITE,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};

// Function permettant de SUPPRIMER un bar de ses favoris.
export const removeBarToFavorite = (barID) => {
    return async dispatch => {
        try {
            const response = await Api.delete('/delete-favorite/'+barID);
            dispatch({ type: REMOVE_TO_FAVORITE,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};

//Function permettant d'obtenir tous ses bars FAVORIS.
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

//Function permettant d'obtenir tous ses bars FAVORIS.
export const getComment = (barID) => {
    return async dispatch => {
        try {
            const response = await Api.get('/bar/all-comment/'+barID );
            dispatch({ type: GET_COMMENT,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite pour récupérer les commentaires." });
        }
    };
};

//Function permettant de poster un commentaire sur un bar.
export const postComment = (barID, comment) => {
    return async dispatch => {
        try {
            const response = await Api.post('/bar/add-comment',{barID, comment});
            dispatch({ type: POST_COMMENT,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite pour poster le commentaire." });
        }
    };
};
