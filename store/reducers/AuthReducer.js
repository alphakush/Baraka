import Api from '../../api/api';
import { TOGGLE_SIGNIN, TOGGLE_ERROR } from '../actions/AuthAction';

const initialState = {
    token: null,
    errorMessage: '',
}

const authReducer =  (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIGNIN:
            console.log("case signin : " + action.payload);
            return {...state, token: action.payload}
        case TOGGLE_ERROR:
            console.log("Case error : " +  action.payload);
            return {...state, errorMessage: action.payload}
            
        default:
            return state;

    }

}

export default authReducer;