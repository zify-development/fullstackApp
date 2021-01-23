import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";

interface IFUserTableData {
  _id: string;
  email: string;
  createdDate: Date;
  blocked: boolean;
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
  const data = props.data;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead classes={{ root: classes.tableHeader }}>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Datum registrace</TableCell>
            <TableCell align="left">Blokace</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: IFUserTableData) => (
            <TableRow key={row._id}>
              <TableCell align="left" component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="left" style={{ width: 160 }}>
                {row.email}
              </TableCell>
              <TableCell align="left" style={{ width: 160 }}>
                {row.createdDate}
              </TableCell>
              <TableCell align="left" style={{ width: 160 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={row.blocked}
                      onChange={() => console.warn("change")}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label=""
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
