import {
    TOGGLE_SIGNIN,
    TOGGLE_ERROR,
    TOGGLE_SIGNUP,
    TOGGLE_SIGNOUT,
    TOGGLE_TRY_LOCAL_SIGN,
    GET_USERLOCATION,
    TOGGLE_RESET_PASSWORD
} from '../actions/AuthAction';

const initialState = {
    token: null,
    errorMessage: '',
    username : '',
    email : '',
    accessLevel : null,
    managerBarId : null,
    userlatitude : null,
    userlongitude : null,
    stateRequest: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIGNIN:
            return { ...state,
              token: action.payload,
              email: action.payloademail,
              username: action.payloadusername,
              userlatitude : action.payloaduserlatitude,
              userlongitude : action.payloaduserlongitude,
              accessLevel : action.payloadaccesslevel,
              managerBarId : action.payloadmanagerbarid
            }
        case TOGGLE_ERROR:
            return { ...state, errorMessage: action.payload }
        case TOGGLE_SIGNUP:
            return { ...state,
              token: action.payload,
              email: action.payloademail,
              username: action.payloadusername,
              userlatitude: action.payloaduserlatitude,
              userlongitude: action.payloaduserlongitude,
              accessLevel : action.payloadaccesslevel,
              managerBarId : action.payloadmanagerbarid
            }
        case TOGGLE_TRY_LOCAL_SIGN:
            return { ...state,
              token: action.payload,
              email: action.payloademail,
              username: action.payloadusername,
              userlatitude : action.payloaduserlatitude,
              userlongitude : action.payloaduserlongitude,
              accessLevel : action.payloadaccesslevel,
              managerBarId : action.payloadmanagerbarid
            }
        case GET_USERLOCATION:
            return { ...state,
              userlatitude : action.payloaduserlatitude,
              userlongitude : action.payloaduserlongitude
            }
        case TOGGLE_SIGNOUT:
            return {
              token: null,
              email : null,
              username : null,
              userlatitude: null,
              userlongitude: null,
              accessLevel: null,
              managerBarId : null
            }
          case TOGGLE_RESET_PASSWORD:
            return {...state,
              stateRequest : action.payload
            }
        default:
            return state;
    }
}

export default authReducer;
