import {CHANGE_IS_ACTIVE, SET_CARDS} from '../actionTypes'

const cards = (state = [], action) => {
    switch (action.type) {
        case SET_CARDS:
            return action.cards
        case CHANGE_IS_ACTIVE:
            const index = state.findIndex((element) => element.id === action.card.id)
            state[index].isActive = !state[index].isActive
            return state;
        default:
            return state;
    }
}

export default cards;
