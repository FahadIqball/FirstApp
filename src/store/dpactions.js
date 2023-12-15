// actions/imageActions.js
export const setImageUrl = url => ({
  type: 'SET_IMAGE_URL',
  payload: url,
});

// reducers/imageReducer.js
const initialState = {
  imageUrl: null,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IMAGE_URL':
      return {
        ...state,
        imageUrl: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
