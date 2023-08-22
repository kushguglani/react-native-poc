import { ADD_USER, REMOVE_ALL_USER } from "../constant"

const initialState = {
    userDetails: []
  };
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER: {
            return {
                ...state,
                userDetails: [...state?.userDetails, action.payload]
            }
        }
        case REMOVE_ALL_USER: {
            return {
                ...state,
                userDetails: []
            }
        }
        default:
            return state;
    }
}