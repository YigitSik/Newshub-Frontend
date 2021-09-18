import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setArticles, setSplashScreen } from '../../redux/articleSlice';
import { setAuthentication } from '../../redux/userSlice';
import { setModalStatus } from '../../redux/modalSlice';
import { useHistory } from 'react-router';
import { logout } from '../../services/authService';
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
import PaginationComponent from './PaginationComponent';


export default function Article() {

    const article = useSelector((state) => state.article.articles)
    const currentArticle = useSelector((state) => state.article.currentArticles)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const splashScreen = useSelector((state) => state.article.splashScreen)
    const isCardView = useSelector((state) => state.article.isCardView)

    const dispatch = useDispatch();
    const history = useHistory();


    axios.interceptors.response.use(function (response) {

        return response;
    }, function (error) {

        if (error.response.status == 403) {
            dispatch(setModalStatus(true, "You Don't Have Permission"))
            history.push("/login")
            dispatch(setAuthentication(false))
            logout()
        }

    });


    useEffect(() => {

        if (article == null) {

            axios({
                method: 'get',
                url: BaseURL + '/news/tr',
                responseType: 'json'
            })
                .then(function (response) {
                    if (response != null) {
                        dispatch(setArticles(response.data))

                        dispatch(setSplashScreen(false));

                    }

                })
        }

    }, [])

    function favHandler(index, element) {

        if (isAuthenticated) {
            console.log(element)

            const heart = document.getElementById("article:" + index)

            if (heart.getAttribute("src") == "heartActive.png")
                heart.setAttribute("src", "heartDisabled.png")
            else heart.setAttribute("src", "heartActive.png")

            axios.post(BaseURL + "/favourite/add", element)
                .then((response) => {

                    console.log(response)

                }).catch((e) => {

                    console.log(e)

                })

        }
        else {
            dispatch(setModalStatus({ modalStatus: true, modalMessage: "You Need To Login First" }));
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


        if (isCardView) {
            return (
                <div key={index} style={{ width: '18rem', margin: '1rem .15em' }} >

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
                                    <img id={"article:" + index} className="favIcon mx-2" style={{ "width": "1rem", "height": "1rem" }} onClick={() => favHandler(index, element)} src="heartDisabled.png" rounded />
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>

                </div>

            );
        }
        else {
            return (
                <div key={index} style={{ margin: '1rem .15em' }} >

                    <Card style={{ display: 'inline-list-item', backgroundColor: '#F5F5F5' }}>

                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" color="textPrimary" component="h5">
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
                                    <img id={"article:" + index} className="favIcon mx-2" style={{ "width": "1rem", "height": "1rem" }} onClick={() => favHandler(index, element)} src="heartDisabled.png" rounded />
                                </Grid>
                            </Grid>
                        </CardActions>

                    </Card>
                </div>
            );

        }


    }



    return (
        <div >
            <div className="container mt-2 p-5">

                <Typography variant="h4" >Top Headlines</Typography>
                <hr />

                <div className="d-flex flex-wrap justify-content-center">
                    {splashScreen
                        ? <img src="splash.jpg" className="img-fluid" /> : article == null || currentArticle == null || !(article.articles.length > 0)
                            ? <img className="img-fluid" src="noresult.png" /> : currentArticle.map(renderList)}
                </div>

            </div >
            <div style={{ backgroundColor: "#3F51B5", position: "fixed", bottom: "0", width: "100%" }}>
                {article != null ? <PaginationComponent /> : null}
            </div>
        </div>

    )
}
