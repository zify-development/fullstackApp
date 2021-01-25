import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Button, Grid, LinearProgress, Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { getUserDataByToken, updatePassword } from "../../services/userAPI";
import { IFAlert } from "../../types/AlertTypes";
import Alert from "../Alert";

interface IFChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#ffc000",
      color: "#000",
      "&:hover, &:focus": {
        backgroundColor: "#ebb100",
      },
    },
  })
);

const ChangePassword = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState();
  const [alert, setAlert] = useState<IFAlert>({});
  const token = sessionStorage.getItem("token");

  const handleChangePassword = async (data: IFChangePassword) => {
    if (token) {
      const updatedPassword = await updatePassword.update(data, token);
      setAlert(updatedPassword.statusMessage);
      if (!updatedPassword.error) {
        setUserData(updatedPassword.data);
      }
    }
  };

  const getUserData = async () => {
    if (token) {
      const data = await getUserDataByToken.getData(token);
      if (data) {
        setUserData(data);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Typography variant="h4" align="center" color="textPrimary">
          Změna hesla
        </Typography>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validate={(values) => {
            const errors: Partial<IFChangePassword> = {};
            if (!values.oldPassword) {
              errors.oldPassword = "Povinné pole";
            }
            if (!values.newPassword) {
              errors.newPassword = "Povinné pole";
            } else if (values.newPassword.length < 8) {
              errors.newPassword = "Heslo musí mít minimálně 8 znaků";
            }
            if (!values.confirmNewPassword) {
              errors.confirmNewPassword = "Povinné pole";
            } else if (values.newPassword !== values.confirmNewPassword) {
              errors.confirmNewPassword = "Hesla se musí shodovat";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              handleChangePassword(values);
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className={classes.form}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="oldPassword"
                label="Staré heslo"
                type="password"
                id="oldPassword"
              />
              <br />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="Nové heslo"
                type="password"
                id="newPassword"
              />
              <br />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmNewPassword"
                label="Nové heslo znovu"
                type="password"
                id="confirmNewPassword"
              />
              {isSubmitting && <LinearProgress />}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Změnit heslo
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {alert && alert.message && <Alert alert={alert} showAlert={true} />}
    </div>
  );
};

export default ChangePassword;
