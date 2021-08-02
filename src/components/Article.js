import axios from 'axios'
import React, { useEffect } from 'react'
import { Card, Button, CardGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setArticles } from '../redux/articleSlice';



export default function Article() {

    const article = useSelector((state) => state.article.articles)
    const dispatch = useDispatch();


    useEffect(() => {

        axios({
            method: 'get',
            url: 'http://localhost:8080/news/tr',
            responseType: 'json'
        })
            .then(function (response) {
                dispatch(setArticles(response.data))
            });

    }, [])


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
                        <Row>
                        <Button variant="none"> <a href={element.url} target="_blank" className="btn btn-primary">Read</a></Button>
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
                    {  article == null || !(article.articles.length > 0) ? <img src="noresult.png"/> :article.articles.map(renderList)}
                </CardGroup>
            </div>


        </div>
    )
}
