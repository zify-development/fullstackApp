import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useUserData } from "../../contexts/userContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Settings = () => {
  const classes = useStyles();
  const userCtx = useUserData();

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" color="textPrimary">
        Nastavení
      </Typography>
    </div>
  );
};

export default Settings;
