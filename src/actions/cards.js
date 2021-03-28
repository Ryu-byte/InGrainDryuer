import { ADD_CARD, DELETE_CARD } from "../actionTypes";

export const addCard = (card) => ({ type: ADD_CARD, card})
export const deleteCard = (id) => ({ type: DELETE_CARD, id})
