import '../css/SettingsCardModal.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {CardImage} from "./CardImage";
import SettingsIcon from "@material-ui/icons/Settings";
import {NavDropdown} from "react-bootstrap";





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
            <div>
                {props.currentCard.value}
            </div>
            <div>
                <NavDropdown title={
                    'Тип переключателя'
                } id="collasible-nav-dropdown">
                    <NavDropdown.Item onClick={() => {props.onChangeCardType(props.currentCard, 'digital')}}>Цифры</NavDropdown.Item>
                    <NavDropdown title={'Переключатель'}>
                        <NavDropdown.Item onClick={() => {props.onChangeCardType(props.currentCard, 'discrete')}}>Тип 1</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {props.onChangeCardType(props.currentCard, 'discrete2')}}>Тип 2</NavDropdown.Item>
                    </NavDropdown>
                </NavDropdown>
            </div>
            <CardImage card={props.currentCard} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onClose}>
                Отменить
            </Button>
            <Button variant="primary">
                Применить
            </Button>
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
                    Закрыть
                </Button>
            </Modal.Footer>
        </div>
    }
    return ReactDOM.createPortal (
        <Modal show={props.show} onHide={props.onClose}>
            { modalContent }
        </Modal>,  document.getElementById('root-modal'))
}