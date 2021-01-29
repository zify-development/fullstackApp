import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import UserInfoFormik from "../components/Forms/UserInfoFormik";
import { getUserDataByToken } from "../services/userAPI";
import { getUserInfo } from "../services/userInfoAPI";
import { uploadImage, getImagesByToken } from "../services/uploadFileApi";
import Settings from "../components/Settings";
import ChangePassword from "../components/ChangePassword";
import { useUserData } from "../contexts/userContext";
import AdminSection from "../components/AdminSection";
import ProfileAvatar from "../components/Avatar";
import Sidebar from "../components/Sidebar";

export interface IFUserData {
  email?: string;
  _id?: string;
  date?: Date;
  role?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      flexGrow: 1,
    },
    container: {
      height: "calc(100% - 56px)",
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
  // const userImageStore = useUserData().context.userImageData;
  const [updateForm, setUpdateForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const token = Cookies.get("token");

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

  // const getUserImage = async () => {
  //   const userImage = await getImagesByToken.get();
  //   if (userImage) {
  //     userImageStore.setUserImage(userImage);
  //   }
  // };

  useEffect(() => {
    getUserInfoData();
    getUserData();
    // getUserImage();
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
        handleNotification={(notification) =>
          enqueueSnackbar(notification.message, { variant: notification.type })
        }
      />
    );
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.target.files?.[0];
    if (token && uploadFile) {
      const userImageUpload = await uploadImage.upload(uploadFile, token);
      if (userImageUpload) {
        getUserInfoData();
      }
    }
  };

  const UserInfo = () => {
    return (
      <>
        <label htmlFor="upload-file">
          <input
            style={{ display: "none" }}
            id="upload-file"
            name="upload-file"
            type="file"
            onChange={(e) => handleUploadImage(e)}
          />

          <ProfileAvatar
            email={userStore.data?.email}
            image={userInfoStore.infoData?.imageUrl}
            style={{
              fontSize: "70px",
              width: "200px",
              height: "200px",
              marginBottom: "50px",
            }}
          />
        </label>
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
  console.warn(userInfoStore.infoData, "data");
  return (
    <div className={classes.root}>
      <Sidebar
        userEmail={userStore.data?.email}
        userImage={userInfoStore.infoData?.imageUrl}
      >
        <Grid className={classes.container} container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>{renderProfileRoutes()}</Paper>
          </Grid>
        </Grid>
      </Sidebar>
    </div>
  );
};

export default ProfilePage;
