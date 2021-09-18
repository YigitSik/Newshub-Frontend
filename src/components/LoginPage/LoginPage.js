import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthentication, setIsAdmin } from '../../redux/userSlice';
import login from "../../services/authService"
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorStatus] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(email)
    console.log(password);

    if (email && password) {

      login(email, password)
        .then(details => {

          if (details != null && details[0]) {
            dispatch(setAuthentication(true))

            console.log(details[1].isAdmin)
            console.log(details[1])

            if (details[1].isAdmin) {

              history.push("/admin")
              dispatch(setIsAdmin(true))
            }
            else {
              history.push("/")
            }
            setErrorStatus(false);
          }
          else {
            setErrorStatus(true);
          }

        })
        .catch(err => console.log(err));

    }

  }

  return (
    <div className="container mt-2 p-5">

      <Typography variant="h4" >Login</Typography>
      <hr />

      <form noValidate onSubmit={handleSubmit} autoComplete="off">
        <Grid >
          <Grid >
            <TextField required label="E-Mail" value={email} error={error} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid >
            <TextField required label="Password" type="password" value={password} error={error} onChange={(e) => setPassword(e.target.value)} />
          </Grid>
          <Grid container >
            <Button className="mt-3" variant="contained" color="primary" size="lg" type="submit" disabled={!validateForm()}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

    </div>



  );
}