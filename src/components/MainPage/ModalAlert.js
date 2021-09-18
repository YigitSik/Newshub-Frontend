import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModalStatus } from '../../redux/modalSlice';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'



export default function ModalAlert() {

    const modalStatus = useSelector((state) => state.modal.modalStatus)
    const modalMessage = useSelector((state) => state.modal.modalMessage)


    const dispatch = useDispatch();
    const history = useHistory();

    const handleClose = () => dispatch(setModalStatus({ modalStatus: false }));

    function redirectLogin() {
        handleClose()
        history.push("/login")
    }

    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();


    return (
        <Grid
            alignItems='center'
            justifyContent='center'
        >

            <Modal
                open={modalStatus}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                <div style={{ "alignItems": "center" }} className={classes.paper}>
                    <h2 id="simple-modal-title">Attention!</h2>
                    <p id="simple-modal-description">
                        {modalMessage}
                    </p>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={redirectLogin}>
                        Login
                    </Button>

                </div>
            </Modal>

        </Grid>
    )
}
