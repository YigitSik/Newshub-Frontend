import axios from 'axios';
import React, { useEffect } from 'react'
import { articleSlice, setFavourites } from '../../redux/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, CardGroup, Row, Image, Col } from 'react-bootstrap';
import { BaseURL } from '../../helpers/properties';




export default function FavouritesPage() {


    const dispatch = useDispatch();
    const article = useSelector((state) => state.article)


    useEffect(() => {

        axios({
            method: 'get',
            url: BaseURL + '/favourite/get/all',
            responseType: 'json'
        })
            .then(function (response) {
                console.log(...response.data)
                dispatch(setFavourites(response.data))
            });

    }, [])


    function favHandler(index, element) {


        const heart = document.getElementById("article:" + index)

        if (heart.getAttribute("src") == "heartActive.png") {
            heart.setAttribute("src", "heartDisabled.png")

            axios.put(BaseURL + "/favourite/delete" + "/" + element.favoriteId)
                .then((response) => {
                    console.log(response)
                }).catch((e) => {
                    console.log(e)
                })

        }
        else {
            heart.setAttribute("src", "heartActive.png")

            axios.post(BaseURL + "/favourite/add", element)
                .then((response) => {
                    console.log(response)
                }).catch((e) => {
                    console.log(e)
                })
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
                                <Image id={"article:" + index} className="favIcon mx-2" onClick={() => favHandler(index, element)} src="heartActive.png" rounded />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>

        );

    }

    console.log(article)


    return (
        <div className="container mt-5 p-5">

            <h2>Favourites</h2>
            <hr />

            <div className="d-flex flex-wrap justify-content-center">
                <CardGroup>
                    {(article.favourites == null) ? <img src="noresult.png" /> : article.favourites.map(renderList)}
                </CardGroup>
            </div>
        </div>
    );
}
