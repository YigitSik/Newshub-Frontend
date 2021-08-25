import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Image, OverlayTrigger, Popover } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setArticles, setCountry, setCategory } from '../../redux/articleSlice';
import { countries, categories } from "../../helpers/uiData"
import { Link, useHistory, useLocation } from 'react-router-dom';
import "./mainPage.css"
import { setAuthorizationToken } from "../../helpers/setAuthorizationToken";
import { setAuthentication, setIsAdmin } from '../../redux/userSlice';
import { logout } from '../../services/authService';



export default function SearchBar() {


    const article = useSelector((state) => state.article.articles)
    const country = useSelector((state) => state.article.country)
    const category = useSelector((state) => state.article.category)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const isAdmin = useSelector((state) => state.user.isAdmin)


    const history = useHistory();
    const location = useLocation();
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

        if (location.pathname != "/") {
            history.push("/")
        }

    }

    function selectCountry(e) {
        dispatch(setCountry(e.target.attributes.value.value));

        if (location.pathname != "/") {
            history.push("/")
        }
    }

    function search(e) {

        let query = document.getElementById("searchInput").value;

        query = encodeURIComponent(query)

        axios({
            method: 'get',
            url: '/query/' + country + "/" + query,
            responseType: 'json'
        }).then(function (response) {

            if (response != null) {
                console.log(response)
                dispatch(setArticles(response.data))
            }

        });

        if (location.pathname != "/") {
            history.push("/")
        }
    }

    function handleLogout() {

        logout();
        dispatch(setAuthentication(false))
        dispatch(setIsAdmin(false))
        history.push("/")

    }

    useEffect(() => {

        console.log("efect")

        axios({
            method: 'get',
            url: '/category/' + country + '/' + category,
            responseType: 'json'
        }).then(function (response) {

            if (response != null) {
                console.log(response)
                dispatch(setArticles(response.data))
            }

        });

    }, [category, country])




    return (


        <div>

            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand className="btn mx-3" onClick={() => history.push("/")}>News Hub</Navbar.Brand>
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
                        <NavDropdown title={<img src="user.png" className="favIcon" />} id="navbarScrollingDropdown">
                            {isAdmin ? <Link to="/admin" className="btn">Admin Page</Link> : null}
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
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
