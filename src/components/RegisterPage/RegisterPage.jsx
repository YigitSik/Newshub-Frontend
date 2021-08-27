import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./RegisterPage.css"
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../../redux/userSlice";
import { BaseURL } from "../../helpers/properties";

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
    <div className="RegisterPage">
      <Form onSubmit={handleSubmit}>
      <h2 className="mb-3">Register</h2>
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
          <Form.Label>Password Verification</Form.Label>
          <Form.Control
            type="password"
            value={passwordVerification}
            onChange={(e) => setPasswordVerification(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" size="lg" type="submit" disabled={!validateForm()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}