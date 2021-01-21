import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {
  InfoOutlined,
  Settings,
  Lock,
  PowerSettingsNew,
  SupervisorAccount,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useUserData } from "../../contexts/userContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    link: {
      color: "#ffc000",
      textDecoration: "none",
    },
  })
);

const ListMenu = () => {
  const classes = useStyles();
  const userStore = useUserData().context.userData;
  const admin = userStore.data?.role === "admin";
  console.warn(admin, "admin");

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Link className={classes.link} to="/profile/info">
          <ListItem button>
            <ListItemIcon>
              <InfoOutlined />
            </ListItemIcon>
            <ListItemText primary="Informace" />
          </ListItem>
        </Link>
        <Divider />
        <Link className={classes.link} to="/profile/settings">
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Nastavení" />
          </ListItem>
        </Link>
        <Divider />
        <Link className={classes.link} to="/profile/changePassword">
          <ListItem button>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Změna hesla" />
          </ListItem>
        </Link>
        <Divider />
        {admin && (
          <>
            <Link className={classes.link} to="/admin">
              <ListItem button>
                <ListItemIcon>
                  <SupervisorAccount />
                </ListItemIcon>
                <ListItemText primary="Správa aplikace" />
              </ListItem>
            </Link>
          </>
        )}
        <Link className={classes.link} to="/">
          <ListItem button>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText primary="Odhlášení" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
};

export default ListMenu;
