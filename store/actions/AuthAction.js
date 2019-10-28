export const TOGGLE_SIGNIN = "TOGGLE_SIGNIN";
import Api from '../../api/api';

export const signIn = (email, password) => {
    console.log('SIGN IN ACTION');
    return async dispatch => {
        const response = await Api.post('/signin', { email, password });
        console.log(response.data);
        dispatch({ type: TOGGLE_SIGNIN,  payload: response.data.token});
    };
};
