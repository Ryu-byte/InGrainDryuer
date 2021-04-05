import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import {useDispatch, useStore} from "react-redux";
import {setCards as actionSetCards} from "../actions/cards";


export const SettingsModal = (props) => {
    const store = useStore();
    let state = store.getState();
    const dispatch = useDispatch();
    const [cards, setCards] = useState(state.cards);
    store.subscribe(() => {
        state = store.getState();
        setCards(state.cards)
        console.log(state.cards)
    })

    const handlerClick = (item) => {
        const newCards = [...cards];
        const index = cards.findIndex(({id}) => id === item.id);
        newCards[index].isActive = !newCards[index].isActive;
        setCards(newCards);
    };
    const handlerSubmitClick = () => {
        dispatch(actionSetCards(cards))
        props.onHide();
    }
    const cardList = cards.map((item) => {
        return (
            <div
                id={`selected-${item.id}`}
                key={item.id}
                onClick={() => handlerClick(item)}
                className={`card mb-2 p-3 ${item.isActive ? 'bg-danger' : ''}`}
            >
                {item.title}
            </div>

        )
    })

    return (
        <Modal show={props.show} onHide={props.onHide} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Сушилка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-wrap">
                    {cardList}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Отменить
                </Button>
                <Button variant="primary" onClick={() => {
                    handlerSubmitClick()
                }}>
                    Применить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
