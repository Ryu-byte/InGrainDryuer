import '../css/Content.css';
import {Container, Row} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import contentImg from '../img/content_img.jpg';
import {CustomCard} from "./CustomCard";
import { useDispatch, useSelector } from "react-redux";
import React, {useState} from "react";
import {SettingsModal} from "./SettingsModal";
import { changeIsActive, setCards } from "../actions/cards";
import {SettingsCardModal} from "./SettingsCardModal";

export const Content = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [currentCard, setCurrentCard] = useState({});
    const cards = useSelector(state => state.cards);
    const visibleCards = [];
    const onDeleteCard = (card) => {
        dispatch(changeIsActive(card))
    }
    const onSubmit = (changedCards) => {
        dispatch(setCards(changedCards))
        setShow(false);
    }
    cards.forEach(card => {
        if(card.isActive === true) {
            visibleCards.push(
                <CustomCard key={card.id} card={card} onDeleteCard={onDeleteCard} show={setShow} currentCard={setCurrentCard}/>)
        }
    })
    return (
        <Container className={'content'} fluid>
            <Row className={'content_left-panel'}>
                <DropdownButton variant="secondary" id="dropdown-basic-button" title="Объекты" className="mr-1">
                    <Dropdown.Item onClick={() => {
                        setShow('settingsModal')
                    }}>Сушилка</Dropdown.Item>
                </DropdownButton>
                <DropdownButton variant="secondary" id="dropdown-basic-button" title="Отчеты">
                    <Dropdown.Item>Работа ТС</Dropdown.Item>
                    <Dropdown.Item>Сушилка</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                </DropdownButton>
            </Row>
            { visibleCards }
            <div className="content-img">
                <img
                    src={contentImg}
                    alt="Схема зерносушилки"
                />
            </div>
            <SettingsModal
                show={show === 'settingsModal'}
                onOpenSettingsCardModal = {() => {setShow('settingsCardModal')}}
                onClose={() => {setShow('close')}}
                onSubmit={onSubmit}
                cards={cards}
                currentCard={setCurrentCard}
            />
            <SettingsCardModal
                show={show === 'settingsCardModal'}
                onClose={() => {setShow('close')}}
                currentCard={currentCard}
            />
        </Container>
    )
};
