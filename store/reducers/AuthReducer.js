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
    email : '',
    userlatitude : null,
    userlongitude : null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIGNIN:
            return { ...state,
              token: action.payload,
              email: action.payloademail,
              username: action.payloadusername,
              userlatitude : action.payloaduserlatitude,
              userlongitude : action.payloaduserlongitude
            }
        case TOGGLE_ERROR:
            return { ...state, errorMessage: action.payload }
        case TOGGLE_SIGNUP:
            return { ...state,
              token: action.payload,
              email: action.payloademail,
              username: action.payloadusername,
              userlatitude: action.payloaduserlatitude,
              userlongitude: action.payloaduserlongitude
            }
        case TOGGLE_TRY_LOCAL_SIGN:
            return {
              token: action.payload,
              email: action.payloademail,
              username: action.payloadusername,
              userlatitude : action.payloaduserlatitude,
              userlongitude : action.payloaduserlongitude
            }
        case TOGGLE_SIGNOUT:
            return {
              token: null,
              email : null,
              username : null,
              userlatitude: null,
              userlongitude: null
            }
        default:
            return state;
    }
}

export default authReducer;
