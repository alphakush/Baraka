import {
  ADD_TO_FAVORITE,
  GET_ALL_BARS,
  TOGGLE_ERROR_BARS,
  GET_FAVORITES_BARS,
  REMOVE_TO_FAVORITE,
  GET_COMMENT,
  POST_COMMENT,
  SET_FILTERS
} from '../actions/BarsActions';

const initialState = {
    allbars: [],
    filteredBars: [],
    favoriteBars: [],
    commentBars: [],
    errorMessage: '',
    filterByLike: false,
    filterByDistance: false,
    filterByDate: false
}

const barsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BARS:
            return { ...state, allbars: action.payload }
        case GET_FAVORITES_BARS:
            return { ...state, favoriteBars: action.payload }
        case ADD_TO_FAVORITE:
            //TODO : à adapter
        case REMOVE_TO_FAVORITE:
            //TODO /à adapter
        case GET_COMMENT:
            //TODO à faire getComment
            return { ...state, commentBars: action.payload }
        case POST_COMMENT:
            return { ...state, response: action.payload }
        case SET_FILTERS:
            return { ...state,
              allbars: action.payload,
              filterByLike : action.payloadLike,
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
