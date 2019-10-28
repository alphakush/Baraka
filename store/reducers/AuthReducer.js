import Api from '../../api/api';
import { TOGGLE_SIGNIN } from '../actions/AuthAction';

const initialState = {
    token: null,
    errorMessage: '',
}

const authReducer =  (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIGNIN:
            console.log("Reducer : " + action.payload);
            return {...state, token: action.payload}
        default:
            return state;

    }

}

export default authReducer;