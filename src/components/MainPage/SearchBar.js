import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setArticles, setCountry, setCategory } from '../../redux/articleSlice';
import { countries, categories } from "../../helpers/uiData"
import { Link, useHistory } from 'react-router-dom';
import "./mainPage.css"
import { setAuthorizationToken } from "../../helpers/setAuthorizationToken";
import { setAuthentication } from '../../redux/userSlice';



export default function SearchBar() {


    const article = useSelector((state) => state.article.articles)
    const country = useSelector((state) => state.article.country)
    const category = useSelector((state) => state.article.category)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

    let history = useHistory();
    const dispatch = useDispatch();

    try {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken.length > 0) {
            setAuthorizationToken(jwtToken);
            dispatch(setAuthentication(true))
        }
    } catch { }

    function selectCategory(e) {
        dispatch(setCategory(e.target.innerText.toLowerCase()));
    }

    function selectCountry(e) {
        dispatch(setCountry(e.target.attributes.value.value));
    }

    function search(e) {

        let query = document.getElementById("searchInput").value;

        query = encodeURIComponent(query)

        axios({
            method: 'get',
            url: 'http://localhost:8080/query/' + country + "/" + query,
            responseType: 'json'
        }).then(function (response) {
            console.log(response)
            dispatch(setArticles(response.data))
        });
    }

    useEffect(() => {

        console.log("efect")

        axios({
            method: 'get',
            url: 'http://localhost:8080/category/' + country + '/' + category,
            responseType: 'json'
        }).then(function (response) {
            console.log(response)
            dispatch(setArticles(response.data))
        });

    }, [category, country])


    return (


        <div>

            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand className="mx-3" onClick={() => history.push("/")}>News Hub</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="m-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll

                    >
                        {categories.map((category, idx) => (<Nav.Link key={idx} onClick={selectCategory}>{category.name}</Nav.Link>))}

                        <Nav className="mx-3">
                            <NavDropdown title="Country" id="navbarScrollingDropdown">
                                {countries.map((country, idx) => (<NavDropdown.Item onClick={selectCountry} key={idx} value={country.value}>{country.name}</NavDropdown.Item>))}

                            </NavDropdown>
                        </Nav>

                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                id="searchInput"
                            />
                            <Button variant="outline-success" className="mx-2" onClick={search}>Search</Button>
                        </Form>
                    </Nav>

                </Navbar.Collapse>

                {isAuthenticated ?
                    <Nav className="mx-3">
                        <Link to="/favourites" className="btn "><Image src="bookmark.png" className="favIcon" /></Link>
                        <Link to="/user" className="btn "><Image src="user.png" className="favIcon" /></Link>
                    </Nav>
                    :
                    <Nav className="mx-3">
                        <Link to="/login" className="btn "><Navbar.Text>Login</Navbar.Text></Link>
                        <Link to="/register" className="btn "><Navbar.Text>Register</Navbar.Text></Link>
                    </Nav>
                }

            </Navbar>


        </div >
    )
}
