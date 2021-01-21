import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ProfileAppBar from "../components/AppBar";
import UserInfoFormik from "../components/Forms/UserInfoFormik";
import ListMenu from "../components/ListMenu";
import { getUserDataByToken } from "../services/userAPI";
import { getUserInfo } from "../services/userInfoAPI";

import Settings from "../components/Settings";
import ChangePassword from "../components/ChangePassword";
import { useUserData } from "../contexts/userContext";

export interface IFUserData {
  email?: string;
  _id?: string;
  date?: Date;
  role?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      display: "flex",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      marginBottom: 0,
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    button: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#ffc000",
      color: "#000",
      "&:hover, &:focus": {
        backgroundColor: "#ebb100",
      },
    },
  })
);

const ProfilePage = () => {
  const classes = useStyles();
  const userStore = useUserData().context.userData;
  const userTokenStore = useUserData().context.userToken;
  const userInfoStore = useUserData().context.userInfoData;
  const [updateForm, setUpdateForm] = useState(false);
  console.warn(userTokenStore.autorizateToken, "data from token");

  const getUserInfoData = async () => {
    const autorizedToken = userTokenStore.autorizateToken;
    if (autorizedToken) {
      const getInfo = await getUserInfo.get(autorizedToken);
      if (getInfo) {
        userInfoStore.setUserInfoData(getInfo);
      }
    } else {
      return;
    }
  };

  const getUserData = async () => {
    const autorizedToken = userTokenStore.autorizateToken;
    if (autorizedToken) {
      const data = await getUserDataByToken.getData(autorizedToken);
      if (data) {
        userStore.setUserData(data);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getUserInfoData();
    getUserData();
  }, []);
  const renderUserData = () => {
    return (
      <Grid item xs={12}>
        <Typography variant="body1" align="left" color="textPrimary">
          Příjmení: {userInfoStore.infoData?.lastName}
        </Typography>
        <Typography variant="body1" align="left" color="textPrimary">
          Jméno: {userInfoStore.infoData?.firstName}
        </Typography>
        <Typography variant="body1" align="left" color="textPrimary">
          Věk: {userInfoStore.infoData?.age}
        </Typography>
        <Button
          classes={{ root: classes.button }}
          onClick={() => setUpdateForm(true)}
        >
          Upravit
        </Button>
      </Grid>
    );
  };

  const renderUserFormik = () => {
    return (
      <UserInfoFormik
        formValues={userInfoStore.infoData}
        userToken={userTokenStore.autorizateToken}
        updatedForm={(updated) => setUpdateForm(!updated)}
      />
    );
  };
  console.warn(userInfoStore.infoData, "data info");

  const UserInfo = () => {
    return (
      <>
        <Typography variant="h4" align="center" color="textPrimary">
          Osobní informace
        </Typography>
        {userInfoStore.infoData?.firstName && !updateForm
          ? renderUserData()
          : renderUserFormik()}
      </>
    );
  };

  const renderProfileRoutes = () => {
    return (
      <Switch>
        <Route path="/profile/info" component={UserInfo} />
        <Route path="/profile/settings" component={Settings} />
        <Route path="/profile/changePassword" component={ChangePassword} />
      </Switch>
    );
  };

  return (
    <div className={classes.root}>
      <ProfileAppBar />
      <Grid container>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <ListMenu />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>{renderProfileRoutes()}</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
