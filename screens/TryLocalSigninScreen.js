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
      const managerBarId = await AsyncStorage.getItem('managerBarId');
      //const accessLevel = parseInt(await AsyncStorage.getItem('accessLevel'));
      const accessLevel = 1;
      if (token) {
        let location = await Location.getCurrentPositionAsync({});
        const userlatitude = location.coords.latitude.toString();
        const userlongitude = location.coords.longitude.toString();
        dispatch({ type: TOGGLE_TRY_LOCAL_SIGN,
          payload: token,
          payloademail: email,
          payloadusername: username,
          payloadaccesslevel: accessLevel,
          payloadmanagerbarid: managerBarId,
          payloaduserlatitude: userlatitude,
          payloaduserlongitude: userlongitude
        });
        if(accessLevel == 1) { //L'utilisateur est un responsable de bar si accessLevel est égal à 1
          props.navigation.navigate('barManagerMainFlow');
        }
        else if(accessLevel == 2) { //L'utilisateur est un administrateur si accessLevel est égal à 2
          props.navigation.navigate('adminMainFlow');
        }
        else {
          props.navigation.navigate('mainFlow');
        }
      } else {
        props.navigation.navigate("loginFlow");
      }
    };
    TryLogin();
  }, []);

  return null;
};

export default tryLocalSigninScreen;
