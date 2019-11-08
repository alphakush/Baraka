import {
    TOGGLE_SIGNIN,
    TOGGLE_ERROR,
    TOGGLE_SIGNUP,
    TOGGLE_TRY_LOCAL_SIGN

} from '../actions/AuthAction';

const initialState = {
    token: null,
    errorMessage: '',
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIGNIN:
            return { ...state, token: action.payload }
        case TOGGLE_ERROR:
            return { ...state, errorMessage: action.payload }
        case TOGGLE_SIGNUP:
            return { ...state, token: action.payload }
        case TOGGLE_TRY_LOCAL_SIGN:
            return { ...state, token: action.payload }
        default:
            return state;
    }
}

export default authReducer;