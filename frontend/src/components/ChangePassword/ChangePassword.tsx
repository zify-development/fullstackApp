import React, { useContext } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const ChangePassword = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" color="textPrimary">
        Změna hesla
      </Typography>
    </div>
  );
};

export default ChangePassword;
