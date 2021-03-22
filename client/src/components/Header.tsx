import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#403b3c',
    },
    title: {
        flexGrow: 1,
        fontSize: '16px',
        [theme.breakpoints.up('sm')]: {
            fontSize: '16px',
        },
    },
}));

const Header = () => {
  const classes = useStyles();
  const appTitle = 'Billing System'
  return (
      <div className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                      {appTitle}
                  </Typography>
                  <Button color="secondary">Transactions</Button>
              </Toolbar>
          </AppBar>
      </div>
  );
}

export default Header;
