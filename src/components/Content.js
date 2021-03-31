import '../css/Content.css';
import {Container, Row} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import contentImg from '../img/content_img.jpg';
import { CustomCard } from "./CustomCard";
import { useStore } from "react-redux";
import React, { useState } from "react";
import {SettingsModal} from "./SettingsModal";

export const Content = (props) => {
    const [show, setShow] = useState(false);
    const store = useStore();
    const [cards, setCards] = useState([])
    store.subscribe(() => {
        const state = store.getState();
        if (state.cards.length > 0) {
            setCards(state.cards.map((card) => {
                return <CustomCard key={card.id} item={card}/>
            }));
        } else {
            setCards([])
        }
    });

    return (
        <Container className={'content'} fluid>
            <Row>
                <DropdownButton variant="secondary" id="dropdown-basic-button" title="Объекты" className="mr-1">
                    <Dropdown.Item  onClick={()=>{setShow(true)}}>Сушилка</Dropdown.Item>
                </DropdownButton>
                <DropdownButton variant="secondary" id="dropdown-basic-button" title="Отчеты">
                    <Dropdown.Item>Работа ТС</Dropdown.Item>
                    <Dropdown.Item>Сушилка</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                </DropdownButton>
            </Row>
            <div className="content-img">
                <img
                    src={contentImg}
                    alt="Схема зерносушилки"
                />
                { cards }
            </div>
            <SettingsModal show={show} onHide={()=>{setShow(false)}}/>
        </Container>
    )
};
