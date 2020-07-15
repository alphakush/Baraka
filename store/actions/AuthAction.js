export const TOGGLE_SIGNIN = "TOGGLE_SIGNIN";
export const TOGGLE_SIGNUP = "TOGGLE_SIGNUP";
export const TOGGLE_SIGNOUT = "TOGGLE_SIGNOUT";
export const TOGGLE_TRY_LOCAL_SIGN = "TOGGLE_TRY_LOCAL_SIGN";
export const TOGGLE_ERROR = "TOGGLE_ERROR";
export const GET_USERLOCATION = "GET_USERLOCATION";
export const TOGGLE_RESET_PASSWORD = "TOGGLE_RESET_PASSWORD";

import Api from '../../api/api';
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';

export const signIn = (email, password) => {
    return async dispatch => {
        try {
            const response = await Api.post('/signin', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('username', response.data.user.username);
            await AsyncStorage.setItem('email', response.data.user.email);
            let location = await Location.getCurrentPositionAsync({});
            const accessLevel = response.data.user.accessLevel.toString();
            const latitude = location.coords.latitude.toString();
            const longitude = location.coords.longitude.toString();
            await AsyncStorage.setItem('accessLevel', accessLevel);
            await AsyncStorage.setItem('userlatitude', latitude);
            await AsyncStorage.setItem('userlongitude', longitude);
            dispatch({ type: TOGGLE_SIGNIN,
                payload: response.data.token,
                payloademail: response.data.user.email,
                payloadusername : response.data.user.username,
                payloadaccesslevel: accessLevel,
                payloaduserlatitude : latitude,
                payloaduserlongitude : longitude
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR, payload: "Merci de bien vérifier votre E-mail ou votre mot de passe." });
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
            await AsyncStorage.setItem('accessLevel', response.data.user.accessLevel);
            let location = await Location.getCurrentPositionAsync({});
            const accessLevel = response.data.user.accessLevel.toString();
            const latitude = location.coords.latitude.toString();
            const longitude = location.coords.longitude.toString();
            await AsyncStorage.setItem('accessLevel', accessLevel);
            await AsyncStorage.setItem('userlatitude', latitude);
            await AsyncStorage.setItem('userlongitude', longitude);
            dispatch({ type: TOGGLE_SIGNIN,
              payload: response.data.token,
              payloademail: response.data.user.email,
              payloadusername : response.data.user.username,
              payloadaccesslevel: accessLevel,
              payloaduserlatitude: latitude,
              payloaduserlongitude: longitude
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR, payload: "Merci de bien vérifier votre E-mail ou votre mot de passe." });
        }
    };
};

export const contactEmail = (email, objet, message) => {
    return async dispatch => {
        try {
            const response = await Api.post('/contact-us', { email, objet, message });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR, payload: "Merci de remplir tous les champs." });
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
        await AsyncStorage.removeItem('accessLevel');
        dispatch({ type: TOGGLE_SIGNOUT });
    };
};

export const GetUserLocation = (latitude, longitude) => {
    return async dispatch => {
        try {
            dispatch({ type: GET_USERLOCATION,
              payloaduserlatitude: latitude,
              payloaduserlongitude: longitude
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR, payload: "Impossible de récuperer la localisation." });
        }
    };
};

export const resetPassword = (email) => {
    return async dispatch => {
        try {
            const response = await Api.post('/rest-password', { email });
            console.log(response.data.status);
            dispatch({ type: TOGGLE_RESET_PASSWORD,
              payload: response.data.status,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR, payload: "Une erreur s'est produite pour reinitiliser votre mot de passe." });
        }
    };
};
