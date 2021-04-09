import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

export const SettingsModal = (props) => {
    const [changeCards, setChangeCards] = useState([]);
    useEffect(() => {
        setChangeCards(props.cards)
    }, [props.cards])
    let cardImage;
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
                className={`card mb-2 p-3 ${item.isActive ? 'bg-danger' : ''}`}
            >
                <div
                    onClick={() => handlerClick(item)}
                >
                    {item.title}
                </div>
                <SettingsRoundedIcon fontSize={'small'} onClick={() => {
                    props.currentCard(item)
                    props.onOpenSettingsCardModal()
                }}/>
            </div>

        )
    })

    return ReactDOM.createPortal(
        <Modal show={props.show} onHide={props.onClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Сушилка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-wrap">
                    {cardList}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Отменить
                </Button>
                <Button variant="primary" onClick={handlerSubmitClick}>
                    Применить
                </Button>
            </Modal.Footer>
        </Modal>, document.getElementById('root-modal')
    );
}
