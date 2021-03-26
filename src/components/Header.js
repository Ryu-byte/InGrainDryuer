import '../css/Header.css';
import logo from '../logo.svg'
import {Container, NavDropdown, Nav} from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import SettingsIcon from '@material-ui/icons/Settings';
import {SettingsModal} from "./SettingsModal";
import React, { useState } from 'react';


export const Header = () => {
    const [show, setShow] = useState(false);
    return (
        <Container fluid className="p-0">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        alt="InGrainDryer"
                    />
                    <span className="app-name">
                        InGrainDryer
                    </span>
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown title={
                            <SettingsIcon fontSize="large"/>
                        } id="collasible-nav-dropdown" drop="left">
                            <NavDropdown.Item href="#action/3.1" onClick={()=>{setShow(true)}}>Настройки</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Выбор фона</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Выход из учетной записи</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <SettingsModal show={show} onHide={()=>{setShow(false)}}/>
        </Container>
    )
};

