import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Button, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme)=>({
  buttonList:{
    marginBlock:theme.spacing(3),
    display: "flex",
  },
  table: {
    minWidth: 700,
  },
  button:{
    marginRight: 10
  }
}));

function ButtonList(){
  const classes = useStyles()

  return(
    <Box className={classes.buttonList} mx="auto">
      <Button className={classes.button} component="a" href="/produk/create" variant="contained" color="primary">Tambah Produk</Button>
      <Button className={classes.button} component="a" href="/produk/create" variant="contained" color="primary">Barang Masuk</Button>
      <Button className={classes.button} component="a" href="/produk/create" variant="contained" color="primary">Barang Keluar</Button>
    </Box>
  )
}

function CustomizedTables() {
  const [rows, setRows] = useState([])
  const classes = useStyles();
  useEffect(()=>{
    axios
    .get("http://localhost:8000/product")
    .then((response) => {
        setRows(response.data);
    })
  },[])
  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nama Barang</StyledTableCell>
            <StyledTableCell align="right">Satuan Ukuran</StyledTableCell>
            <StyledTableCell align="right">Kategori Barang</StyledTableCell>
            <StyledTableCell align="right">Lokasi Barang</StyledTableCell>
            <StyledTableCell align="right">Aksi</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.unit_measurement}</StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">{row.storage_location}</StyledTableCell>
              <StyledTableCell align="right">
                <Button component="a" href={"/produk/"+ row.id} variant="outlined" color="primary">Lihat Detail</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ListStaffPage(props) {
    if(props.location.state !== undefined){
      alert(props.location.state)
    }

    return(
      <Box>
        <Typography variant="h4" color="primary">Manajemen Produk</Typography>
        <ButtonList/>
        <CustomizedTables/>
      </Box>
    )
  }
  
  export default ListStaffPage;
  