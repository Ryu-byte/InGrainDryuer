import '../css/SettingsCardModal.css';
import React from 'react';
import ReactDOM from 'react-dom';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";




export const SettingsCardModal = (props) => {
    let modalContent = null;
    if(Object.keys(props.currentCard).length > 0) {
        modalContent = <div>
            <Modal.Header closeButton>
            <Modal.Title>
                {props.currentCard.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.currentCard.value}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onClose}>
                Close
            </Button>
            <Button variant="primary">Understood</Button>
        </Modal.Footer>
        </div>
    } else {
        modalContent = <div>
            <Modal.Header closeButton />
            <Modal.Body>
                Карточка не найдена
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </div>
    }
    return ReactDOM.createPortal (
        <Modal show={props.show} onHide={props.onClose}>
            { modalContent }
        </Modal>,  document.getElementById('root-modal'))
}