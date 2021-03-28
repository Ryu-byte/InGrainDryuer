import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useDispatch, useStore } from "react-redux";
import { addCard, deleteCard } from "../actions/cards";


export const SettingsModal =(props) => {
    const store = useStore();
    const dispatch = useDispatch();
    const [itemsArray, setItemsArray] = useState([
        { id: 1, title: 'Первая', isActive: false },
        { id: 2, title: 'Вторая', isActive: false },
        { id: 3, title: 'Третья', isActive: false },
        { id: 4, title: 'Четвертая', isActive: false },
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
        console.log(itemsArray);
        if (item.isActive) {
            dispatch(deleteCard(item.id));
        } else {
            dispatch(addCard(item));
        }
    };
    return (
    <Modal show={props.show} onHide={props.onHide} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="flex flex-wrap">
                { itemsArray.map((item) => {
                    return <div
                        id={`selected-${item.id}`}
                        key={item.id}
                        onClick={() => handlerClick(item)}
                        className={`card mb-2 p-3 ${item.isActive ? 'bg-danger' : ''}`}
                    >
                        { item.title }
                    </div>
                }) }
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
