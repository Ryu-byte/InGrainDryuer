import {CHANGE_CARD_TYPE, CHANGE_IS_ACTIVE, SET_CARDS} from '../actionTypes'

const cards = (state = [], action) => {
    switch (action.type) {
        case SET_CARDS:
            return action.cards
        case CHANGE_IS_ACTIVE:
            const cards = [...state]
            const index = cards.findIndex((element) => element.id === action.card.id)
            cards[index].isActive = !cards[index].isActive
            return cards
        case CHANGE_CARD_TYPE:
           const cardsState = [...state]
           const cardIndex = cardsState.findIndex((element) => element.id === action.card.id)
            cardsState[cardIndex].type = action.cardType
            return cardsState
        default:
            return state;
    }
}

export default cards;
