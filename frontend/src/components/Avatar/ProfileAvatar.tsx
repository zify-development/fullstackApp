import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    black: {
      color: theme.palette.common.white,
      backgroundColor: grey[900],
    },
  })
);

const ProfileAvatar = (props: any) => {
  const { email } = props;
  const classes = useStyles();
  const upperCasedEmail = email && email.toUpperCase();
  return (
    <div className={classes.root}>
      <Avatar
        alt={upperCasedEmail}
        src="/broken-image.jpg"
        className={classes.black}
      />
    </div>
  );
};

export default ProfileAvatar;
