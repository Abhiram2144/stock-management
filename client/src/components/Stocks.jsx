import axios from "axios";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// import Stock from "./Stock";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));



// get all stocks
const fetchStocks = async () => {
  return await axios.get("http://localhost:8080/").then((res) => res.data);
};

const deleteHandler = async(id) => {
    await axios.delete(`http://localhost:8080/${id}`).then((res)=>res.data)
    .then(()=>{
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            showConfirmButton: false,
            timer: 1500
        });
    })
    window.location.reload(false)
}

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    fetchStocks().then((data) => setStocks(data.stocks));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="center">Options</StyledTableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {stocks.map((stock,id)=>{
            return(
                <StyledTableRow key={stock.name}>
                <StyledTableCell component="th" scope="row">
                  {stock.name}
                </StyledTableCell>
                <StyledTableCell align="center">{stock.price}</StyledTableCell>
                <StyledTableCell align="center">{stock.date}</StyledTableCell>
                <StyledTableCell align="left">{stock.description}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/stocks/${stock._id}`}><Button color="secondary">Edit</Button></Link>
                  <Button variant="outlined" color="error"
                  onClick={()=>{deleteHandler(stock._id)}}>
                    Delete
                  </Button>
                </StyledTableCell>
      </StyledTableRow>
            );
            
        })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Stocks;
