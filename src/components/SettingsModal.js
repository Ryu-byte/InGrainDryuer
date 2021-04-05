import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';


export const SettingsModal = (props) => {
    const [changeCards, setChangeCards] = useState([]);
    useEffect(() => {
        setChangeCards(props.cards)
    }, [props.cards])

    const handlerClick = (item) => {
        const newChangeCards = [...changeCards];
        const index = newChangeCards.findIndex(({id}) => id === item.id);
        newChangeCards[index].isActive = !newChangeCards[index].isActive;
        setChangeCards(newChangeCards);
    };
    const handlerSubmitClick = () => {
        props.onSubmit(changeCards);
    }
    const cardList = changeCards.map((item) => {
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
        <Modal show={props.show} onHide={() => props.onHide(false)} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Сушилка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-wrap">
                    {cardList}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onHide(false)}>
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
