import React, { useState } from "react";
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthentication, setIsAdmin } from '../../redux/userSlice';
import login from "../../services/authService"



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
    <div className="Login">

      <Form onSubmit={handleSubmit}>
        <h2 className="mb-3">Login</h2>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? "border-danger" : ""}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "border-danger" : ""}
          />
        </Form.Group>
        {error ? <p className="text-danger">Bad Credentials</p> : ""}
        <Button className="mt-3" size="lg" type="submit" disabled={!validateForm()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}