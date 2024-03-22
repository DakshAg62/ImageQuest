import { ADD_NOTES } from './action'; // Corrected import

const initialState = {
  notes: []
};

export const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTES:
      return { ...state, notes: [...state.notes, action.payload] };
    default:
      return state;
  }
};
