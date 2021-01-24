import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  Avatar,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Link, useHistory } from "react-router-dom";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { IFLoginFormValues } from "../types/FormTypes";
import { loginUser, IFUser } from "../services/userAPI";
import { useUserData } from "../contexts/userContext";

interface IFStateAlert {
  message?: string;
  type?: "error" | "success";
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(http://icoders.cz/img/intro-bg.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "auto",
    backgroundPosition: "cover",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  link: {
    color: "#16409f",
  },
}));

const SignInPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<IFStateAlert>({});

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleLogin = async (data: IFUser) => {
    let login = await loginUser.login(data);
    const token = login.data?.token;
    if (token && !login.error) {
      sessionStorage.setItem("token", token);
      history.push("/profile/info");
    } else {
      setAlert(login.statusMessage);
      setOpen(true);
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Přihlášení
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors: Partial<IFLoginFormValues> = {};
              if (!values.email) {
                errors.email = "Povinné pole";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Nevalidní emailová adresa";
              }
              if (!values.password) {
                errors.password = "Povinné pole";
              } else if (values.password.length < 8) {
                errors.password = "Heslo musí mít minimálně 8 znaků";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                handleLogin(values);
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
                  id="email"
                  label="Zadejte email"
                  name="email"
                  autoComplete="email"
                />
                <br />
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Zadejte heslo"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
                  Přihlásit se
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              {/* <Link to="/forgotPasword">
                Zapomenuté heslo?
              </Link> */}
            </Grid>
            <Grid item>
              <Link className={classes.link} to="/register">
                Nemáte účet? Registrace
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default SignInPage;
