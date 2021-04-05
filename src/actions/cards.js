import {CHANGE_IS_ACTIVE, SET_CARDS} from "../actionTypes";

export const setCards = (cards) => ({ type: SET_CARDS, cards})
export const changeIsActive = (card) => ({type: CHANGE_IS_ACTIVE, card})

