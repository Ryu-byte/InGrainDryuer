import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';


export const SettingsModal =(props) => {
    return (
    <Modal show={props.show} onHide={props.onHide} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Close
            </Button>
            <Button variant="primary">
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);
}
