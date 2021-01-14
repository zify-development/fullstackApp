import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import { IFLoginFormValues } from '../types/FormTypes';
import ProfileAppBar from '../components/AppBar';
import UserInfoFormik from '../components/Forms/UserInfoFormik';
import { getUsersInfo, IFUserInfo, createUserInfo, updateUserInfo } from '../services/userInfoAPI';


interface IFUserData {
  email: string,
  _id: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      marginBottom: 0,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

 const ProfilePage = () => {
  const classes = useStyles();
  const history = useHistory<IFUserData>();
  const [userData, setUserData] = useState(history.location.state);
  const [userInfo, setUserInfo] = useState<IFUserInfo>();

  console.warn(userData._id, "id");
  return (
    <div className={classes.root}>
      <ProfileAppBar userEmail={userData.email} />
      <Grid container>
        <Grid item xs={3} >
          <Paper className={classes.paper}>
            side menu
          </Paper>
        </Grid>
        <Grid item xs={9} >
          <Paper className={classes.paper}>
            <Typography variant="h3" align="center" color="textPrimary">
              Osobní informace
            </Typography>
            <UserInfoFormik />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;



