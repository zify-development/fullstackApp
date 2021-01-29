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
  const { email, style, image } = props;
  const classes = useStyles();
  console.warn(image, "image in Avatar component");
  const upperCasedEmail = email && email.toUpperCase();
  return (
    <div className={classes.root}>
      <Avatar
        alt={upperCasedEmail}
        src={image}
        className={classes.black}
        style={style ?? {}}
      />
    </div>
  );
};

export default ProfileAvatar;
