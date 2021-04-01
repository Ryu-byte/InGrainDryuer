import { SET_CARDS } from '../actionTypes'

const cards = (state = [], action) => {
    switch (action.type) {
        case SET_CARDS:
            return action.cards

        default:
            return state;
    }
}

export default cards;
