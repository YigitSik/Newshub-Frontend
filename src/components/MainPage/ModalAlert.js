import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setModalStatus } from '../../redux/modalSlice';
import { useHistory } from 'react-router';

export default function ModalAlert() {

    const modalStatus = useSelector((state) => state.modal.modalStatus)
    const modalMessage = useSelector((state) => state.modal.modalMessage)


    console.log(modalStatus);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleClose = () => dispatch(setModalStatus({ modalStatus: false }));

    function redirectLogin() {
        handleClose()
        history.push("/login")
    }

    return (
        <div>

            <Modal show={modalStatus} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Attenttion!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={redirectLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
