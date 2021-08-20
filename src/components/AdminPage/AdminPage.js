import React, { useState, useEffect } from 'react'
import { Form, Button } from "react-bootstrap";
import { logout } from "../../services/authService"
import { setAuthentication, setModalStatus } from '../../redux/userSlice';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';


export default function AdminPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    const history = useHistory()

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    function logoutHandle() {

        logout()
        dispatch(setAuthentication(false))
        history.push("/")

    }


    useEffect(() => {

        axios({
            method: 'get',
            url: 'http://localhost:8080/user/admin',
            responseType: 'json'
        })
            .then(function (response) {

                console.log(response)

            }).catch((error) => {

                history.push("/")

                dispatch(setModalStatus({ modal: true, modalMessage: "You Don't Have The Admin Privileges" }))

            })

    }, [])



    return (
        <div className="UserPage">

            <Form onSubmit={handleSubmit} >
                <h2>AdminPage</h2>
                <hr />

                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>


                <Button className="mt-3 mx-2" size="lg" type="submit" disabled={!validateForm()}>
                    Update
                </Button>
                <Button className="mt-3 mx-2" size="lg" onClick={logoutHandle}>
                    Logout
                </Button>



            </Form>

        </div>
    )
}
