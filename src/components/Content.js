import '../css/Content.css';
import {Container, Row} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import contentImg from '../img/content_img.jpg';
import {CustomCard} from "./CustomCard";
import {useDispatch, useStore} from "react-redux";
import React, {useState} from "react";
import {SettingsModal} from "./SettingsModal";
import {changeIsActive} from "../actions/cards";

export const Content = (props) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const onDeleteCard = (card) => {
        dispatch(changeIsActive(card))
        console.log(card)
    }
    let visibleCards = [];
    props.cards.forEach(card => {
        if(card.isActive === true) {
            visibleCards.push(<CustomCard key={card.id} card={card} onDeleteCard={onDeleteCard} />)
        }
    })
    return (
        <Container className={'content'} fluid>
            <Row className={'content_left-panel'}>
                <DropdownButton variant="secondary" id="dropdown-basic-button" title="Объекты" className="mr-1">
                    <Dropdown.Item onClick={() => {
                        setShow(true)
                    }}>Сушилка</Dropdown.Item>
                </DropdownButton>
                <DropdownButton variant="secondary" id="dropdown-basic-button" title="Отчеты">
                    <Dropdown.Item>Работа ТС</Dropdown.Item>
                    <Dropdown.Item>Сушилка</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                </DropdownButton>
            </Row>
            {visibleCards}
            <div className="content-img">
                <img
                    src={contentImg}
                    alt="Схема зерносушилки"
                />
            </div>
            <SettingsModal show={show} onHide={() => {
                setShow(false)
            }}/>
        </Container>
    )
};
