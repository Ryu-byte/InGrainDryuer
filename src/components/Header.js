import '../css/Header.css';
import logo from '../logo.svg'
import {Container, NavDropdown, Nav} from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';


export const Header = () => {
    return (
        <Container fluid className="header p-0">
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
                            <NavDropdown.Item >Настройки</NavDropdown.Item>
                            <NavDropdown.Item>Выбор фона</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={() => {
                                let elementsPosition = {};
                                const elements = document.querySelectorAll('.custom-card')
                                elements.forEach((item, index) => {

                                    elementsPosition[`element${index + 1}`] = item.getBoundingClientRect()
                                })
                            }}>Выход из учетной записи</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
};

