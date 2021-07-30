import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Card, Button, CardGroup, Row } from 'react-bootstrap';



export default function Article() {

    const [article, setArticles] = useState(null);

    useEffect(() => {

        axios({
            method: 'get',
            url: 'http://localhost:3000/news/tr/health',
            responseType: 'json'
        })
            .then(function (response) {
                console.log(response.data)
                setArticles(response.data);
            });

    }, [])


    function renderList(element, index) {


        console.log(element);

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
                    {article != null ? article.articles.map(renderList) : "Ops!"}
                </CardGroup>
            </div>


        </div>
    )
}
