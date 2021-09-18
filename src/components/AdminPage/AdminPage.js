import React, { useState, useEffect } from 'react'
import { setModalStatus } from '../../redux/modalSlice';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import UserTable from './UserTable';
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
        <div className=" p-3">

            <h4>Admin Page</h4>
            <hr />

            <UserTable {...userData} />

        </div>
    )
}
