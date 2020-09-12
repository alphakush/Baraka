import {
    ADD_TO_FAVORITE,
    GET_ALL_BARS,
    TOGGLE_ERROR_BARS,
    GET_FAVORITES_BARS,
    REMOVE_TO_FAVORITE,
    GET_COMMENT,
    POST_COMMENT,
    POST_NOTE,
    CHECK_NOTE,
    SET_FILTERS,
    GET_ALL_BARS_ADMIN,
    GET_ALL_USERS_ADMIN,
    CREATE_BAR_MANAGER,
    VALIDE_BAR_ADMIN,
    MODIFY_STATUT_BAR_ADMIN,
    GET_MY_BAR_MANAGER,
    UPDATE_MY_BAR_MANAGER,
    CREATE_BAR_ADMIN
} from '../actions/BarsActions';

const initialState = {
    allusers: [],
    allbars: [],
    mybarmanager: [],
    filteredBars: [],
    favoriteBars: [],
    commentBars: [],
    errorMessage: '',
    filterByLike: false,
    filterByDistance: false,
    filterByDate: false,
    response: ''
}

const barsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BARS:
            return { ...state, allbars: action.payload }
        case GET_ALL_BARS_ADMIN:
            return { ...state, allbars: action.payload }
        case GET_ALL_USERS_ADMIN:
            return { ...state, allusers: action.payload }
        case GET_FAVORITES_BARS:
            return { ...state, favoriteBars: action.payload }
        case ADD_TO_FAVORITE:
            return { ...state }
        case REMOVE_TO_FAVORITE:
            return { ...state }
        case GET_COMMENT:
            return { ...state, commentBars: action.payload }
        case POST_COMMENT:
            return { ...state, response: action.payload }
        case VALIDE_BAR_ADMIN:
            return { ...state, response: action.payload }
        case POST_NOTE:
            return { ...state, response: action.payload }
        case GET_MY_BAR_MANAGER:
            return { ...state, allbars: action.payload }
        case MODIFY_STATUT_BAR_ADMIN:
            return { ...state, response: action.payload }
        case UPDATE_MY_BAR_MANAGER:
            return { ...state, response: action.payload }
        case CHECK_NOTE:
            return { ...state, response: action.payload }
        case CREATE_BAR_MANAGER:
            return { ...state, response: action.payload }
        case CREATE_BAR_ADMIN:
            return { ...state, response: action.payload }
        case SET_FILTERS:
            return {
                ...state,
                allbars: action.payload,
                filterByLike: action.payloadLike,
                filterByDate: action.payloadDate,
                filterByDistance: action.payloadDistance
            }
        case TOGGLE_ERROR_BARS:
            return { ...state, errorMessage: action.payload }
        default:
            return state;
    }
}

export default barsReducer;
