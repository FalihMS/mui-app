/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import Content from './Content';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Grid,
  Slide,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Icon
} from '@material-ui/core';

import { Menu as MenuIcon } from '@material-ui/icons';
import SideBar from './Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  paper: {
    minHeight: '100vh',
    color: theme.palette.text.secondary
  }
}));

function MainLayout(props) {
  const classes = useStyles();
  const Sidebar = SideBar;

  return (
    <Grid container>
      <Slide direction="right" in={props.openSidebar} mountOnEnter unmountOnExit>
        <Grid item xs={2}>
          <Paper margin={0} padding={0} variant="outlined" square={true} className={classes.paper}>
            <List component="nav" aria-label="main mailbox folders">
              {Sidebar.map((item) => {
                return (
                  <ListItem button component="a" href={item.link}>
                    <ListItemIcon>
                      <Icon>{item.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
      </Slide>
      <Grid item xs>
        <Paper variant="outlined" square={true} className={classes.paper} style={{ padding: 30 }}>
          <Content />
        </Paper>
      </Grid>
    </Grid>
  );
}

const TopAppBar = (props) => {
  const classes = useStyles();

  const menuIconAction = (e) => {
    e.preventDefault();
    props.menuAction((props.MenuState - 1) * -1);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={(e) => menuIconAction(e)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Your App Title
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

function App() {
  const [data, setData] = useState(1);

  return (
    <div>
      <TopAppBar MenuState={data} menuAction={(input) => setData(input)} />
      <MainLayout openSidebar={data} />
    </div>
  );
}

export default App;
