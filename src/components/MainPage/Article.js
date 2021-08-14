import axios from 'axios'
import { setAuthorizationToken } from '../../helpers/setAuthorizationToken';
import React, { useEffect, useState } from 'react'
import { Card, Button, CardGroup, Row, Image, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setArticles } from '../../redux/articleSlice';
import { setModalStatus } from '../../redux/userSlice';
import { useHistory } from 'react-router';
import "./mainPage.css"




export default function Article() {

    const article = useSelector((state) => state.article.articles)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

    const dispatch = useDispatch();
    const history = useHistory();



    useEffect(() => {

        axios({
            method: 'get',
            url: 'http://localhost:8080/news/tr',
            responseType: 'json'
        })
            .then(function (response) {
                dispatch(setArticles(response.data))
            }).catch(e => {

                if (e.response.status == 403) {
                    localStorage.removeItem("jwtToken");
                    setAuthorizationToken(false);
                    history.push("/")
                }

            })

    }, [])

    function favHandler(index, element) {

        if (isAuthenticated) {
            console.log(element)

            const heart = document.getElementById("article:" + index)

            if (heart.getAttribute("src") == "heartActive.png")
                heart.setAttribute("src", "heartDisabled.png")
            else heart.setAttribute("src", "heartActive.png")

            axios.post("http://localhost:8080/favourite/add", element)
                .then((response) => {

                    console.log(response)

                }).catch((e) => {

                    console.log(e)

                })

        }
        else {
            dispatch(setModalStatus({ modal: true, modalMessage: "Please Authenticate First" }));
        }

    }


    function renderList(element, index) {

        return (

            <div key={index} style={{ width: '19rem' }} >
                <Card >
                    <Card.Header>
                        {element.author}
                    </Card.Header>
                    <Card.Img variant="top" src={element.urlToImage} />
                    <Card.Body>
                        <Card.Title>{element.title}</Card.Title>
                        <Card.Text>
                            {element.description}
                        </Card.Text>
                        <Row >
                            <Col >
                                <Button variant="none"  > <a href={element.url} style={{ textDecoration: "none" }} target="_blank">Read More</a></Button>
                            </Col>
                            <Col>
                                <Image id={"article:" + index} className="favIcon mx-2" onClick={() => favHandler(index, element)} src="heartDisabled.png" rounded />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>

        );

    }

    return (
        <div className="container mt-5 p-5">

            <div className="d-flex flex-wrap justify-content-center">
                <CardGroup>
                    {article == null || !(article.articles.length > 0) ? <img src="noresult.png" /> : article.articles.map(renderList)}
                </CardGroup>
            </div>


        </div>
    )
}
