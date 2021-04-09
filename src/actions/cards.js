import {CHANGE_IS_ACTIVE, SET_CARDS, CHANGE_CARD_TYPE} from "../actionTypes";

export const setCards = (cards) => ({ type: SET_CARDS, cards})
export const changeIsActive = (card) => ({type: CHANGE_IS_ACTIVE, card})
export const changeCardType = (card, cardType) => ({ type: CHANGE_CARD_TYPE, card, cardType})
