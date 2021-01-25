import React, { useState } from "react";
import { Button, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { createUserInfo, updateUserInfo } from "../../../services/userInfoAPI";
import { IFUserInfoFormValues } from "../../../types/FormTypes";
import { useUserData } from "../../../contexts/userContext";
import { IFAlert } from "../../../types/AlertTypes";
import Alert from "../../Alert";

interface IFUserInfoFormikProps {
  userToken?: string | null;
  formValues: IFUserInfoFormValues | undefined;
  updatedForm: (updated: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    maxWidth: "500px",
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
}));

const UserInfoFormik = (props: IFUserInfoFormikProps) => {
  const { userToken, formValues, updatedForm } = props;
  const defaultValues = {
    firstName: "",
    lastName: "",
    age: null,
    id: "",
  };

  const [alert, setAlert] = useState<IFAlert>({});
  const userInfoStore = useUserData().context.userInfoData;

  const initialValues = formValues ?? defaultValues;
  const handleSubmitUserInfoData = async (data: IFUserInfoFormValues) => {
    if (!formValues?.firstName && userToken) {
      const createUserInfoData = await createUserInfo.create(data, userToken);
      setAlert(createUserInfoData.statusMessage);
      if (createUserInfoData) {
        userInfoStore.setUserInfoData(createUserInfoData.userInfo);
      }
    } else if (userToken) {
      const updateUserInfoData = await updateUserInfo.update(data, userToken);
      setAlert(updateUserInfoData.statusMessage);
      if (updateUserInfoData) {
        userInfoStore.setUserInfoData(updateUserInfoData.userInfo);
      }
    }
    updatedForm(true);
  };

  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validate={(values) => {
          const errors: Partial<IFUserInfoFormValues> = {};
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
            handleSubmitUserInfoData(values);
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="firstName"
              label="Jméno"
              name="firstName"
            />
            <br />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="lastName"
              label="Příjmení"
              id="lastName"
            />
            <br />
            <Field
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="age"
              label="Věk"
              type="number"
              id="age"
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
      {alert && alert.message && <Alert alert={alert} showAlert={true} />}
    </>
  );
};

export default UserInfoFormik;
