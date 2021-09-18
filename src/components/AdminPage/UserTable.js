import React, { useState } from 'react'
import axios from 'axios';
import { BaseURL } from '../../helpers/properties';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default function UserTable(props) {


    function deleteUser(user) {

        console.log(user.username);

        axios.post(BaseURL + "/user/delete", { "username": user.username },
            { headers: { "Content-Type": "application/json" } })
            .then(response => {

                console.log(response);
            })
            .catch(err => console.log(err));

    }

    function mapUsers(key) {

        return (

            <TableBody>

                <TableRow key={key}>
                    <TableCell align="right">{props[key].userId}</TableCell>
                    <TableCell align="right">{props[key].username}</TableCell>
                    <TableCell align="right">{props[key].favourites.length}</TableCell>
                    <TableCell align="right"><img onClick={() => deleteUser(props[key])} src="remove.png" style={{ width: "1rem" }}></img></TableCell>
                </TableRow>

            </TableBody>

        )

    }

    const useStyles = makeStyles({
        // table: {
        //     minWidth: 400,
        //     width: '100%',
        //     borderCollapse: 'collapse',
        //     padding: '2px',
        //     border: '1px solid #ccc',
        //     textAlign: 'left'
        // },
    });

    const classes = useStyles();

    return (
        <div >

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">#</TableCell>
                            <TableCell align="right">User Name</TableCell>
                            <TableCell align="right">Favourites</TableCell>
                        </TableRow>
                    </TableHead>
                    {Object.keys(props).map(mapUsers)}
                </Table>
            </TableContainer>

        </div>
    )
}
