export const TOGGLE_SIGNIN = "TOGGLE_SIGNIN";
export const TOGGLE_SIGNUP = "TOGGLE_SIGNUP";
export const TOGGLE_SIGNOUT = "TOGGLE_SIGNOUT";
export const TOGGLE_TRY_LOCAL_SIGN = "TOGGLE_TRY_LOCAL_SIGN";
export const TOGGLE_ERROR = "TOGGLE_ERROR";

import Api from '../../api/api';
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';

export const signIn = (email, password) => {
    return async dispatch => {
        try {
            const response = await Api.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('email', response.data.user.email);
            await AsyncStorage.setItem('username', response.data.user.username);
            let location = await Location.getCurrentPositionAsync({});
            const latitude = location.coords.latitude.toString();
            const longitude = location.coords.longitude.toString();
            await AsyncStorage.setItem('userlatitude', latitude);
            await AsyncStorage.setItem('userlongitude', longitude);
            dispatch({ type: TOGGLE_SIGNIN,
              payload: response.data.token,
              payloademail: response.data.user.email,
              payloadusername : response.data.user.username,
              payloaduserlatitude : latitude,
              payloaduserlongitude : longitude
            });
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
            await AsyncStorage.setItem('email', response.data.user.email);
            await AsyncStorage.setItem('username', response.data.user.username);
            let location = await Location.getCurrentPositionAsync({});
            const latitude = location.coords.latitude.toString();
            const longitude = location.coords.longitude.toString();
            await AsyncStorage.setItem('userlatitude', latitude);
            await AsyncStorage.setItem('userlongitude', longitude);
            dispatch({ type: TOGGLE_SIGNIN,
              payload: response.data.token,
              payloademail: response.data.user.email,
              payloadusername : response.data.user.username,
              payloaduserlatitude: latitude,
              payloaduserlongitude: longitude
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR, payload: "Merci de bien vérifier votre E-mail ou votre mot de passe" });
        }
    };
};

export const contactEmail = (email, objet, message) => {
    return async dispatch => {
        try {
            const response = await Api.post('/contact-us', { email, objet, message });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR, payload: "Merci de remplir tous les champs" });
        }
    };
};

export const SignOut = () => {
    return async dispatch => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('userlatitude');
        await AsyncStorage.removeItem('userlongitude');
        dispatch({ type: TOGGLE_SIGNOUT });
    };
};
