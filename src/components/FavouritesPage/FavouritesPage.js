import axios from 'axios';
import React, { useEffect } from 'react'
import { setFavourites } from '../../redux/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, CardGroup, Row, Image, Col } from 'react-bootstrap';




export default function FavouritesPage() {


    const dispatch = useDispatch();
    const article = useSelector((state) => state.article)

    console.log(article)



    useEffect(() => {

        console.log(localStorage.getItem("jwtToken").jwt)

        axios({
            method: 'get',
            url: 'http://localhost:8080/favourite/getAll',
            responseType: 'json'
        })
            .then(function (response) {
                dispatch(setFavourites(response.data))
            });

    }, [])


    function favHandler(index, element) {

        console.log(element)

        const heart = document.getElementById("article:" + index)

        if (heart.getAttribute("src") == "heartActive.png") {
            heart.setAttribute("src", "heartDisabled.png")

            axios.put("http://localhost:8080/favourite/delete" + "/" + element.favoriteId)
                .then((response) => {
                    console.log(response)
                }).catch((e) => {
                    console.log(e)
                })

        }
        else {
            heart.setAttribute("src", "heartActive.png")

            axios.post("http://localhost:8080/favourite/add", element)
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


    console.log(article.favourites)

    return (
        <div className="container mt-5 p-5">

            <div className="d-flex flex-wrap justify-content-center">
                <CardGroup>
                    {article.favourites == null ? <img src="noresult.png" /> : article.favourites.map(renderList)}
                </CardGroup>
            </div>
        </div>
    )
}
