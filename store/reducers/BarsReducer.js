import { BARS } from '../../data/data';
import { TOGGLE_FAVORITE, GET_ALL_BARS, TOGGLE_ERROR_BARS } from '../actions/BarsActions';

const initialState = {
    allbars: [],
    filteredBars: BARS,
    favoriteBars: [],
    errorMessage: '',
}

const barsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BARS:
            return {...state,allbars: action.payload }
        case TOGGLE_ERROR_BARS:
            return {...state,errorMessage: action.payload }
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteBars.findIndex(bars );
        default:
            return state;

    }
}

export default barsReducer;