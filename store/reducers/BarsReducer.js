import { BARS } from '../../data/data';
import { TOGGLE_FAVORITE } from '../actions/BarsActions';

const initialState = {
    token: null,
    bars: BARS,
    filteredBars: BARS,
    favoriteBars: []
}

const barsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteBars.findIndex(bars );
        default:
            return state;

    }

}

export default barsReducer;