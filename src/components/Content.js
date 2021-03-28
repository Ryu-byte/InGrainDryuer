import '../css/Content.css';
import { Container, Row } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import contentImg from '../img/content_img.jpg';
import { CustomCard } from "./CustomCard";
import { useStore } from "react-redux";
import React, { useState } from "react";

export const Content = (props) => {
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
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <DropdownButton variant="secondary" id="dropdown-basic-button" title="Отчеты">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
            </Row>
            <div className="content-img">
                <img
                    src={contentImg}
                    alt="Схема зерносушилки"
                />
                { cards }
            </div>
        </Container>
    )
};
