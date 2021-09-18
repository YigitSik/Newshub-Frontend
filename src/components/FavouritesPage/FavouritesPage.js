import axios from 'axios';
import React, { useEffect } from 'react'
import { articleSlice, setFavourites } from '../../redux/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BaseURL } from '../../helpers/properties';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



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
                if (response != null) {
                    dispatch(setFavourites(response.data))
                }
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

    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
    });

    const classes = useStyles();


    function renderList(element, index) {

        return (

            <div key={index} style={{ width: '19rem', margin: '1rem .15em' }} >

                <Card className={classes.root}>
                    <CardHeader
                        title={element.author}
                    />
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={element.urlToImage}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {element.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {element.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Grid container spacing={2}
                            justifyContent="space-evenly">
                            <Grid item spacing={1}>
                                <Button variant="none"> <a href={element.url} style={{ textDecoration: "none" }} target="_blank">Read More</a></Button>
                            </Grid>
                            <Grid item spacing={1}>
                                <img id={"article:" + index} className="favIcon mx-2" style={{ "width": "1rem", "height": "1rem" }} onClick={() => favHandler(index, element)} src="heartActive.png" rounded />
                            </Grid>
                        </Grid>
                    </CardActions>
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

                {(article.favourites == null) ? <img src="noresult.png" /> : article.favourites.map(renderList)}

            </div>
        </div>
    );
}
