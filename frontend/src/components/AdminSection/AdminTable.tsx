import React, { SyntheticEvent, useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import {
  Checkbox,
  FormControlLabel,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  Button,
  Snackbar,
} from "@material-ui/core";
import { updateUser } from "../../services/userAPI";

interface IFUserTableData {
  _id: string;
  email: string;
  createdDate: Date;
  blocked: boolean;
  password: string;
}

interface IFStateAlert {
  message?: string;
  type?: "error" | "success";
}

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: "#ffc000",
  },
  table: {
    minWidth: 500,
  },
});

export const AdminTable = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<IFStateAlert>({});
  const data = props.data;
  const changeData = props.changeData;
  const token = sessionStorage.getItem("token");

  const handleChangeBlocked = async (data: IFUserTableData) => {
    const currentData = {
      ...data,
      blocked: !data.blocked,
    };
    if (token) {
      const updateUserData = await updateUser.update(currentData, token);
      changeData(true);
      setAlert(updateUserData.statusMessage);
      setOpen(true);
    }
  };

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead classes={{ root: classes.tableHeader }}>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Datum registrace</TableCell>
            <TableCell align="left">Blokace</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: IFUserTableData) => (
            <TableRow key={row._id}>
              <TableCell
                align="left"
                component="th"
                scope="row"
                style={{ width: 100 }}
              >
                {row._id}
              </TableCell>
              <TableCell align="left" style={{ width: 100 }}>
                {row.email}
              </TableCell>
              <TableCell align="left" style={{ width: 100 }}>
                {moment(row.createdDate.toString())
                  .subtract(10, "days")
                  .calendar()}
              </TableCell>
              <TableCell align="left" style={{ width: 100 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={row.blocked}
                      name="checkedB"
                      color="primary"
                      disabled={true}
                    />
                  }
                  label=""
                />
              </TableCell>
              <TableCell
                align="left"
                component="th"
                scope="row"
                style={{ width: 100 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleChangeBlocked(row)}
                >
                  {row.blocked ? "Odblokovat" : "Zablokovat"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};
