import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
// import { Formik, Form, Field } from 'formik';
// import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import { IFLoginFormValues } from '../types/FormTypes';
import ProfileAppBar from '../components/profile/ProfileAppBar';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

 const ProfilePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [userData, setUserData] = useState(history.location.state)
  console.warn(userData, "history");
  return (
    <div className={classes.root}>
      <ProfileAppBar />
      {/* <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <ProfileAvatar />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid> */}
    </div>
  );
}

export default ProfilePage;



