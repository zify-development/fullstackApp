import React, { SyntheticEvent, useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { IFAlert } from "../../types/AlertTypes";

interface IFAlertProps {
  alert: IFAlert;
  showAlert: boolean;
}
const Alert = (props: IFAlertProps) => {
  const { alert, showAlert } = props;
  const [open, setOpen] = useState(showAlert);

  const AlertComponent = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <AlertComponent onClose={handleClose} severity={alert.type}>
        {alert.message}
      </AlertComponent>
    </Snackbar>
  );
};

export default Alert;
