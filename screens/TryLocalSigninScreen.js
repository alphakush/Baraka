import React, { useEffect } from 'react';
import * as AuthActions from '../store/actions/AuthAction';


import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constant/Colors';

const tryLocalSigninScreen = props => {
    const connexionStatus = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthActions.LocalSignin());
        if (connexionStatus !== null) {
            navigation.navigate('mainFlow');
          }
    }, []);

    return null;
};

export default tryLocalSigninScreen;