import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import {useDispatch, useStore} from "react-redux";
import {setCards as actionSetCards} from "../actions/cards";


export const SettingsModal = (props) => {
    const store = useStore();
    const dispatch = useDispatch();
    const [cards, setCards] = useState([
        {id: 1, title: 'Пример 1', value: false, isActive: false},
        {id: 2, title: 'Пример 2', value: false, isActive: false},
        {id: 3, title: 'Пример 3', value: '15512341', isActive: false},
        {id: 4, title: 'Пример 4', value: '123123', isActive: false},
    ]);
    store.subscribe(() => {
        const state = store.getState();
        const newCards = [];
        cards.forEach((item) => {
            if (state.cards.some((card) => card.id === item.id)) {
                newCards.push({...item, isActive: true})
            } else {
                newCards.push({...item, isActive: false});
            }
        })
        setCards(newCards);
    })

    const handlerClick = (item) => {
        const newCards = [...cards]
        const index = newCards.findIndex(({ id }) => id === item.id);
        newCards[index].isActive = !newCards[index].isActive;
        setCards(newCards);
    };
    const handlerSubmitClick = () => {
        const newCards = [];
        cards.forEach((card) => card.isActive ? newCards.push(card) : '');
       dispatch(actionSetCards(newCards));
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
                <Button variant="primary" onClick={() => {handlerSubmitClick()}}>
                    Применить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
