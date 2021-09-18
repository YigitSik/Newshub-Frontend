import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { BaseURL } from "../../helpers/properties";
import { TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();


  function validateForm() {
    let condition1 = email.length > 0 && password.length > 0;
    let condition2 = password === passwordVerification;
    return condition1&&condition2;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validateForm)
    {

      axios.post(BaseURL+"/user/register",
        { "username": email, "password": password },
        { headers: { "Content-Type": "application/json" } })
        .then(response => {

            if(response !=null)
            {
              if(response.status==200)
              {
                history.push("/")
                alert("You Have Succesfully Registered")
              }
            }

        })
        .catch(err => console.log(err));

    }

  }

  return (
    <div className="container mt-2 p-5">
     
      <Typography variant="h4" >Register</Typography>
            <hr />

      <form noValidate onSubmit={handleSubmit} autoComplete="off">
        <Grid >
          <Grid >
            <TextField required label="E-Mail" value={email}  onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid >
            <TextField required label="Password" type="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
          </Grid>
          <Grid >
            <TextField required label="Password Repeat" type="password" value={passwordVerification}  onChange={(e) => setPasswordVerification(e.target.value)} />
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