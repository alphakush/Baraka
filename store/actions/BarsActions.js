export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const GET_ALL_BARS = "GET_ALL_BARS";
export const TOGGLE_ERROR_BARS = "TOGGLE_ERROR_BARS";

import Api from '../../api/api';
import { AsyncStorage } from 'react-native';


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

export const toggleFavorite = (id) => {
    return  {type: TOGGLE_FAVORITE, barsId: id}
}