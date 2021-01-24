import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ProfileAvatar from "../Avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: "#ffc000",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    sectionDesktop: {
      display: "flex",
    },

    logoCircle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "65px",
      height: "65px",
      background: "#fff",
      borderRadius: "50%",
      margin: "5px 0",
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    },
    logoImage: {
      width: "auto",
      height: "55px",
    },
  })
);

const ProfileAppBar = (props: any) => {
  const { userEmail } = props;
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" classes={{ root: classes.appBar }}>
        <Toolbar>
          <div className={classes.logoCircle}>
            <img
              className={classes.logoImage}
              src="http://icoders.cz/img/icoders-logo.png"
              alt="logo"
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <ProfileAvatar email={userEmail} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ProfileAppBar;
