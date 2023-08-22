import { ADD_USER, REMOVE_ALL_USER } from "../constant";

export const addUser = user => ({
    type: ADD_USER,
    payload: user
})

export const removeUser = user => ({
    type: REMOVE_ALL_USER,
    payload: user
})