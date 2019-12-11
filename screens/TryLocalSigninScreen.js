import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import {TOGGLE_TRY_LOCAL_SIGN } from '../store/actions/AuthAction';
import { useDispatch } from 'react-redux';


const tryLocalSigninScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const TryLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      const username = await AsyncStorage.getItem('username');
      if (token) {
        dispatch({ type: TOGGLE_TRY_LOCAL_SIGN, payload: token, payloademail: email, payloadusername: username });
        props.navigation.navigate('mainFlow');
      } else {
        props.navigation.navigate("loginFlow");
      }
    }
    TryLogin();
  }, []);

  return null;
};

export default tryLocalSigninScreen;
