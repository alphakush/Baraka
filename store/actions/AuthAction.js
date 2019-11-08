export const TOGGLE_SIGNIN = "TOGGLE_SIGNIN";
export const TOGGLE_SIGNUP = "TOGGLE_SIGNUP";
export const TOGGLE_SIGNOUT = "TOGGLE_SIGNOUT";
export const TOGGLE_TRY_LOCAL_SIGN = "TOGGLE_TRY_LOCAL_SIGN";
export const TOGGLE_ERROR = "TOGGLE_ERROR";

import Api from '../../api/api';
import { AsyncStorage } from 'react-native';

export const signIn = (email, password) => {
    return async dispatch => {
        try {
            const response = await Api.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: TOGGLE_SIGNIN, payload: response.data.token });

        } catch (error) {
            dispatch({ type: TOGGLE_ERROR, payload: "Merci de bien vérifier votre E-mail ou votre mot de passe" });
        }
    };
};

export const signUp = (username, email, password) => {
    return async dispatch => {
        try {
            const response = await Api.post('/signup', { email, username, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: TOGGLE_SIGNIN, payload: response.data.token });

        } catch (error) {
            dispatch({ type: TOGGLE_ERROR, payload: "Merci de bien vérifier votre E-mail ou votre mot de passe" });
        }
    };
};

export const LocalSignin = () => {
    return async dispatch => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            dispatch({ type: TOGGLE_TRY_LOCAL_SIGN, payload: token });
        }
    };
};