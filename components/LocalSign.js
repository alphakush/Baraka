import React, { useEffect } from 'react';
import * as AuthActions from '../store/actions/AuthAction';

import { useDispatch, useSelector } from 'react-redux';

const LocalSignin = props => {
    const connexionStatus = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthActions.LocalSignin());
        if (connexionStatus !== null) {
            props.navigation.navigate('mainFlow');
        } else {
            console.log("LoginFlow");
            props.navigation.navigate('Home');
        }
    }, [connexionStatus]);
    return null;
};

export default LocalSignin;