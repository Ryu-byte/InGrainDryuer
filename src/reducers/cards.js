import { ADD_CARD, DELETE_CARD } from '../actionTypes'

const cards = (state = [], action) => {
    switch (action.type) {
        case ADD_CARD: {
            return [...state, action.card];
        }
        case DELETE_CARD: {
            const index = state.findIndex((card) => card.id === action.id);
            const newState = [...state];
            newState.splice(index, 1)
            return newState
        }
        default:
            return state;
    }
}

export default cards;
