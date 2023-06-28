import React, { useState } from "react";
import moment from "moment";

// Assets
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import Swal from "sweetalert2";

export default function TableDashboard({
  items,
  deleteFn,
  setItemSelected,
  setModalEdit,
  modalEdit,
  getFn,
  optionsTableHeader,
  optionsTableBody,
  deleteProperty,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRenderProperties = (row, option) => {
    switch (option) {
      case "hasFlash":
        return row[option] ? "Si" : "No";
      case "filmTypes":
        return row[option].join(",\n");
      case "availableCameras":
        return row[option].join(",\n");
      case "init_date":
        return moment(row[option]).format("DD-MM-YYYY");
      default:
        return row[option];
    }
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFn(row[deleteProperty]);
        getFn();
        Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
          window.location.reload()
        );
      }
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, items?.length - page * rowsPerPage);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {optionsTableHeader.map((option, i) => (
              <TableCell key={i}>{option}</TableCell>
            ))}
            <TableCell align="right" colSpan="2">
              Options
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.length > 0 &&
            items
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {optionsTableBody.map((option, i) => (
                    <>
                      <TableCell key={i}>
                        {handleRenderProperties(row, option)}
                      </TableCell>
                    </>
                  ))}
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setItemSelected(row);
                        setModalEdit(!modalEdit);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDelete(row)}>
                      <DeleteIcon />
                    </IconButton>{" "}
                  </TableCell>
                </TableRow>
              ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
