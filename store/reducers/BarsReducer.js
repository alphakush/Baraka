import { ADD_TO_FAVORITE, GET_ALL_BARS, TOGGLE_ERROR_BARS, GET_FAVORITES_BARS } from '../actions/BarsActions';

const initialState = {
    allbars: [],
    filteredBars: [],
    favoriteBars: [],
    errorMessage: '',
}

const barsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BARS:
            return { ...state, allbars: action.payload }
        case GET_FAVORITES_BARS:            
            return { ...state, favoriteBars: action.payload }
        case ADD_TO_FAVORITE:
            const existingIndex = state.favoriteBars.findIndex(bars);
        case TOGGLE_ERROR_BARS:
            return { ...state, errorMessage: action.payload }
        default:
            return state;

    }
}

export default barsReducer;