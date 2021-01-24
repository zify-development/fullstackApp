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
import AdminSection from "../components/AdminSection";

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
  const userInfoStore = useUserData().context.userInfoData;
  const [updateForm, setUpdateForm] = useState(false);
  const token = sessionStorage.getItem("token");

  const getUserInfoData = async () => {
    if (token) {
      const getInfo = await getUserInfo.get(token);
      if (getInfo) {
        userInfoStore.setUserInfoData(getInfo);
      }
    } else {
      return;
    }
  };

  const getUserData = async () => {
    if (token) {
      const data = await getUserDataByToken.getData(token);
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
        userToken={token}
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
    const admin = userStore.data?.role === "admin";

    return (
      <Switch>
        <Route path="/profile/info" component={UserInfo} />
        <Route path="/profile/settings" component={Settings} />
        <Route path="/profile/changePassword" component={ChangePassword} />
        {admin && <Route path="/profile/admin" component={AdminSection} />}
      </Switch>
    );
  };

  return (
    <div className={classes.root}>
      <ProfileAppBar userEmail={userStore.data?.email} />
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
