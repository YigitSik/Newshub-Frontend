import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import { Link } from 'react-router-dom';
import { setIsCardView } from '../../redux/articleSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Drawer() {

  const [state, setState] = useState(false);
  const [isGetAppHidden, setIsGetAppHidden] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const isCardView = useSelector((state) => state.article.isCardView)

  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  window.addEventListener('beforeinstallprompt', function (event) {
    console.log('beforeinstallprompt fired');
    // event.preventDefault();
    setDeferredPrompt(event);
  });

  React.useEffect(() => {

    if (deferredPrompt && (!window.matchMedia('(display-mode: standalone)').matches)) {
      setIsGetAppHidden(false);
    }
    else {
      setIsGetAppHidden(true);
    }

  }, [deferredPrompt])

  function GetApp() {

    if (deferredPrompt) {
      deferredPrompt.prompt();
      console.log(deferredPrompt);

      deferredPrompt.userChoice.then(function (choiceResult) {
        console.log(choiceResult.outcome);

        if (choiceResult.outcome === 'dismissed') {
          console.log('User cancelled installation');
        } else {
          console.log('User added to home screen');
        }

      });

      setDeferredPrompt(null)
    }

  }

  function changeDisplay() {
    dispatch(setIsCardView(!isCardView));
  }

  const list = () => (
    <Box
      role="presentation"
    >
      <List>

        <Link to="/" style={{ "textDecoration": "none", "color": "black" }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home Screen" />
          </ListItem>
        </Link>

        <ListItem button onClick={changeDisplay} >
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="Change Layout" />
        </ListItem>

        <ListItem button onClick={GetApp} hidden={isGetAppHidden}>
          <ListItemIcon>
            <AddToHomeScreenIcon />
          </ListItemIcon>
          <ListItemText primary="Get This App" />
        </ListItem>


      </List>
    </Box>
  );

  return (
    <div>

      <React.Fragment>
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="left"
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>

    </div>
  );
}
