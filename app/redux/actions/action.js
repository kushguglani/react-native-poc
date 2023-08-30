import { ADD_USER, REMOVE_ALL_USER, ADD_DEVICE, REMOVE_DEVICE } from "../constant";

export const addUser = user => ({
    type: ADD_USER,
    payload: user
})
export const addDevice = device => ({
    type: ADD_DEVICE,
    payload: device
})

export const removeUser = user => ({
    type: REMOVE_ALL_USER,
    payload: user
})
export const removeDevice = number => ({
    type: REMOVE_DEVICE,
    payload: number
})