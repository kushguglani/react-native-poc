import { ADD_USER, REMOVE_ALL_USER, ADD_DEVICE,REMOVE_DEVICE } from "../constant"

const initialState = {
    userDetails: [],
    activeUser: null,
    devices: [],
    activeDevice: null,
};
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER: {
            return {
                ...state,
                userDetails: [...state?.userDetails, action.payload],
                activeUser: action.payload.id
            }
        }
        case ADD_DEVICE: {
            alert(action.payload?.number)
            return {
                ...state,
                devices: [...state?.devices, action.payload],
                activeDevice: action.payload?.number
            }
        }
        case REMOVE_DEVICE: {
            const devices = state?.devices.filter(function( obj ) {
                return obj.number !== action.payload;
              });
            return {
                ...state,
                devices
            }
        }
        case REMOVE_ALL_USER: {
            return {
                ...state,
                userDetails: [],
                activeUser: null,
                devices: [],
                activeDevice: null,
            }
        }
        default:
            return state;
    }
}