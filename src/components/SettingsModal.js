import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import {useDispatch, useStore} from "react-redux";
import {addCard, deleteCard} from "../actions/cards";


export const SettingsModal = (props) => {
    const store = useStore();
    const dispatch = useDispatch();
    const [itemsArray, setItemsArray] = useState([
        {id: 1, title: 'Пример 1', value: false, isActive: false},
        {id: 2, title: 'Пример 2', value: false, isActive: false},
        {id: 3, title: 'Пример 3', value: '15512341', isActive: false},
        {id: 4, title: 'Пример 4', value: '123123', isActive: false},
    ]);
    store.subscribe(() => {
        const state = store.getState();
        const newItemsArray = [];
        itemsArray.forEach((item) => {
            if (state.cards.some((card) => card.id === item.id)) {
                newItemsArray.push({...item, isActive: true})
            } else {
                newItemsArray.push({...item, isActive: false});
            }
        })
        setItemsArray(newItemsArray);
    })

    const handlerClick = (item) => {
        if (item.isActive) {
            dispatch(deleteCard(item.id));
        } else {
            dispatch(addCard(item));
        }
    };

    return (
        <Modal show={props.show} onHide={props.onHide} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Сушилка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-wrap">
                    {itemsArray.map((item) => {
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
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
