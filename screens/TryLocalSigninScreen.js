import React, { useEffect,useState } from 'react';
import { AsyncStorage } from 'react-native';
import {TOGGLE_TRY_LOCAL_SIGN } from '../store/actions/AuthAction';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';

const tryLocalSigninScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const TryLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      const username = await AsyncStorage.getItem('username');
      const barManager = await AsyncStorage.getItem('barManager');;
      if (token && barManager) {
        let location = await Location.getCurrentPositionAsync({});
        const userlatitude = location.coords.latitude.toString();
        const userlongitude = location.coords.longitude.toString();
        dispatch({ type: TOGGLE_TRY_LOCAL_SIGN,
          payload: token,
          payloademail: email,
          payloadusername: username,
          payloaduserlatitude: userlatitude,
          payloaduserlongitude: userlongitude
        });
        props.navigation.navigate('barManagerMainFlow');
      }else if (token) {
        props.navigation.navigate('mainFlow');
      } else {
        props.navigation.navigate("loginFlow");
      }
    };
    TryLogin();
  }, []);

  return null;
};

export default tryLocalSigninScreen;
