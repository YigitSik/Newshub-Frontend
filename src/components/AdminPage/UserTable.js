import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios';


export default function UserTable(props) {


    function deleteUser(user) {

        console.log(user.username);

        axios.post("http://localhost:8080/user/delete", { "username": user.username },
            { headers: { "Content-Type": "application/json" } })
            .then(response => {

                console.log(response);
            })
            .catch(err => console.log(err));

    }

    function mapUsers(key) {

        return (

            <tr>
                <td>{props[key].userId}</td>
                <td>{props[key].username}</td>
                <td>{props[key].favourites.length}</td>
                <td><img onClick={() => deleteUser(props[key])} src="remove.png" style={{ width: "1rem" }}></img></td>
            </tr>

        )

    }

    return (
        <div>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Favourites</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(props).map(mapUsers)}
                </tbody>
            </Table>

        </div>
    )
}
