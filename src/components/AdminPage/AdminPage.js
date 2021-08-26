import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import { logout } from "../../services/authService"
import { setModalStatus } from '../../redux/modalSlice';
import { setAuthentication, setIsAdmin } from '../../redux/userSlice';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import UserTable from './UserTable';
import "./AdminPage.css"
import { BaseURL } from '../../helpers/properties';


export default function AdminPage() {


    const [userData, setUserData] = useState(null);

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

        axios({
            method: 'get',
            url: BaseURL + '/user/admin',
            responseType: 'json'
        })
            .then(function (response) {

                setUserData(response.data);

            }).catch((error) => {

                history.push("/")

                dispatch(setModalStatus({ modal: true, modalMessage: "You Don't Have The Admin Privileges" }))

            })

    }, [])



    return (
        <div className="AdminPage">

            <Row>

                <h1>Admin Page</h1>
                <hr />

                <Col>
                    <UserTable {...userData} />
                </Col>
            </Row>
        </div>
    )
}
