import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setArticles, setCountry, setCategory } from '../redux/articleSlice';
import {countries,categories} from  "../helper/uiData"

export default function SearchBar() {


    const article = useSelector((state) => state.article.articles)
    const country = useSelector((state) => state.article.country)
    const category = useSelector((state) => state.article.category)

    const dispatch = useDispatch();


    function selectCategory(e) {
        dispatch(setCategory(e.target.innerText.toLowerCase()));
    }

    function selectCountry(e) {
        dispatch(setCountry(e.target.attributes.value.value));
    }

    function search(e) {

        let query = document.getElementById("searchInput").value;

        axios({
            method: 'get',
            url: 'http://localhost:8080/query/' + country + '/' + query,
            responseType: 'json'
        }).then(function (response) {
           
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
            console.log(category)
            console.log(country)
            dispatch(setArticles(response.data))
        });

    }, [category, country])


    

    return (


        <div>

            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand href="#">News Hub</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        className="me-auto"
                    >
                        {categories.map((category, idx) => (<Nav.Link key={idx} onClick={selectCategory}>{category.name}</Nav.Link> ) )}

                        <Nav className="mx-3">
                            <NavDropdown title="Country" id="navbarScrollingDropdown">
                                {countries.map((country,idx) => (<NavDropdown.Item onClick={selectCountry} key={idx} value={country.value}>{country.name}</NavDropdown.Item>))}
    
                            </NavDropdown>
                        </Nav>

                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                id="searchInput"
                            />
                            <Button variant="outline-success" onClick={search}>Search</Button>
                        </Form>
                    </Nav>

                </Navbar.Collapse>
        
            </Navbar>


        </div>
    )
}
