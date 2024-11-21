// reducer.js
import { SAVE_IMAGES } from './actions';

const initialState = {
  imagesList: [],
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_IMAGES:
      return {
        ...state,
        imagesList: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
