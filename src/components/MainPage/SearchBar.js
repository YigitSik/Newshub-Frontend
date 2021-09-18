import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setArticles, setCountry, setCategory, setSplashScreen, setCurrentPage } from '../../redux/articleSlice';
import { countries, categories } from "../../helpers/uiData"
import { Link, useHistory, useLocation } from 'react-router-dom';
import { setAuthorizationToken } from "../../helpers/setAuthorizationToken";
import { setAuthentication, setIsAdmin } from '../../redux/userSlice';
import { logout } from '../../services/authService';
import { BaseURL } from '../../helpers/properties';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import GetAppIcon from '@material-ui/icons/GetApp';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Grid from '@material-ui/core/Grid';
import Drawer from './Drawer';


export default function SearchBar() {

    const article = useSelector((state) => state.article.articles)
    const country = useSelector((state) => state.article.country)
    const category = useSelector((state) => state.article.category)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const splashScreen = useSelector((state) => state.article.splashScreen)
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
        dispatch(setSplashScreen(false));

        if (location.pathname != "/") {
            history.push("/")
        }

    }

    function selectCountry(e) {

        console.log(e)
        dispatch(setCountry(e.target.attributes.value.value));
        handleCountryClose();

        if (location.pathname != "/") {
            history.push("/")
        }
    }

    function search(e) {

        if (e.key == "Enter") {

            let query = document.getElementById("searchBox").value

            query = encodeURIComponent(query)

            axios({
                method: 'get',
                url: BaseURL + '/query/' + country + "/" + query,
                responseType: 'json'
            }).then(function (response) {

                if (response != null) {
                    console.log(response)
                    dispatch(setArticles(response.data))
                    dispatch(setSplashScreen(false));
                }

            });

            if (location.pathname != "/") {
                history.push("/")
            }

            dispatch(setCurrentPage(1));

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
            url: BaseURL + '/category/' + country + '/' + category,
            responseType: 'json'
        }).then(function (response) {

            if (response != null) {
                console.log(response)
                dispatch(setArticles(response.data))
                dispatch(setSplashScreen(false));
            }

        });

    }, [category, country])



    const useStyles = makeStyles((theme) => ({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }));

    const classes = useStyles();

    const [countryAnchorEl, setCountryAnchorEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleCountryClick = (event) => {
        setCountryAnchorEl(event.currentTarget);
    };

    const handleCountryClose = () => {
        setCountryAnchorEl(null);
    };



    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {isAdmin ? <Link to="/admin" className="btn">Admin Page</Link> : null}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {isAuthenticated ?

                <div>
                    <MenuItem>

                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge >
                                <BookmarkIcon />
                            </Badge>
                        </IconButton>
                        <Link to="/favourites" style={{ "textDecoration": "none", "color": "black" }}>
                            <p>Bookmark</p>
                        </Link>
                    </MenuItem>

                    <MenuItem onClick={handleProfileMenuOpen}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <p>Profile</p>
                    </MenuItem>
                </div>
                :
                <div>
                    <MenuItem >
                        <Link to="/login" style={{ "textDecoration": "none", "color": "black" }}>
                            <p>Login</p>
                        </Link>
                    </MenuItem>
                    <MenuItem >
                        <Link to="/register" style={{ "textDecoration": "none", "color": "black" }}>
                            <p>Register</p>
                        </Link>
                    </MenuItem>
                </div>

            }

        </Menu>
    );


    return (


        <div  >


            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                        >
                            <Drawer />
                        </IconButton>
                        <Typography className={classes.title} onClick={() => history.push("/")} variant="h6" noWrap>
                            NewsHub
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                onKeyDown={search}
                                id="searchBox"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>




                        <Button aria-controls="simple-menu" variant="contained" color="primary" aria-haspopup="true" onClick={handleCountryClick} >
                            Country
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={countryAnchorEl}
                            keepMounted
                            onClose={handleCountryClose}
                            open={Boolean(countryAnchorEl)}
                        >
                            {countries.map((country, idx) => (<MenuItem onClick={selectCountry} key={idx} value={country.value}>{country.name}</MenuItem>))}
                        </Menu>




                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>

                            {isAuthenticated ?

                                <div>

                                    <Link to="/favourites" className="btn ">
                                        <IconButton color="inherit">
                                            <Badge >
                                                <BookmarkIcon />
                                            </Badge>
                                        </IconButton>
                                    </Link>

                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </div>
                                :
                                <Grid container>

                                    <MenuItem >
                                        <Link to="/login" style={{ "textDecoration": "none", "color": "white" }}>
                                            <p>Login</p>
                                        </Link>
                                    </MenuItem>


                                    <MenuItem >
                                        <Link to="/register" style={{ "textDecoration": "none", "color": "white" }}>
                                            <p>Register</p>
                                        </Link>
                                    </MenuItem>


                                </Grid>

                            }

                        </div>

                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>

                </AppBar>
                {renderMobileMenu}
                {renderMenu}


            </div>


            <AppBar position="static" color="default">
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {categories.map((category, idx) => (<Tab label={category.name} key={idx} onClick={selectCategory} />))}
                </Tabs>

            </AppBar>



        </div>

    )
}
