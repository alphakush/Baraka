import {
    TOGGLE_SIGNIN,
    TOGGLE_ERROR,
    TOGGLE_SIGNUP,
    TOGGLE_SIGNOUT,
    TOGGLE_TRY_LOCAL_SIGN
} from '../actions/AuthAction';

const initialState = {
    token: null,
    errorMessage: '',
    username : '',
    email : ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIGNIN:
            return { ...state, token: action.payload, email: action.payloademail, username: action.payloadusername }
        case TOGGLE_ERROR:
            return { ...state, errorMessage: action.payload }
        case TOGGLE_SIGNUP:
            return { ...state, token: action.payload, email: action.payloademail, username: action.payloadusername }
        case TOGGLE_TRY_LOCAL_SIGN:
            return { token: action.payload, email: action.payloademail, username: action.payloadusername }
        case TOGGLE_SIGNOUT:
            return { token: null, email : null, username : null }
        default:
            return state;
    }
}

export default authReducer;
