import React from 'react';
import { Button, LinearProgress  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { getUsersInfo, IFUserInfo, createUserInfo, updateUserInfo } from '../../../services/userInfoAPI';

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      maxWidth: '500px',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const UserInfoFormik = () => {
    const classes = useStyles();
    return (
        <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              myMotivation: '',
              age: null
            }}
            validate={values => {
              const errors: Partial<IFUserInfo> = {};
              // if (!values.email) {
              //   errors.email = 'Povinné pole';
              // } else if (
              //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              // ) {
              //   errors.email = 'Nevalidní emailová adresa';
              // }
              // if (!values.password) {
              //   errors.password = 'Povinné pole';
              // } else if(values.password.length < 8) {
              //   errors.password = 'Heslo musí mít minimálně 8 znaků';
              // }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                // hanleLogin(values);
                  console.warn(values, "values");
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
                  id="firstName"
                  label="Zadejte jmémo"
                  name="firstName"
                  autoComplete="firstName"
                />
                <br />
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="lastName"
                  label="Zadejte příjmení"
                  id="lastName"
                  autoComplete="lastName"
                />
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="myMotivation"
                  label="Vaše motivace"
                  name="myMotivation"
                  autoComplete="myMotivation"
                />
                <br />
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="age"
                  label="Zadejte věk"
                  id="age"
                  autoComplete="age"
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
                  Uložit
                </Button>
              </Form>
            )}
        </Formik>
    )
}

export default UserInfoFormik;
