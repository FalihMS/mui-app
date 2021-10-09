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
    marginBlock:theme.spacing(3)
  },
  table: {
    minWidth: 700,
  },
}));

function ButtonList(){
  const classes = useStyles()

  return(
    <Box className={classes.buttonList}>
      <Button component="a" href="/work-order/create" variant="contained" color="primary">Buat Perintah Kerja</Button>
    </Box>
  )
}

function CustomizedTables() {
  const [rows, setRows] = useState([])
  const classes = useStyles();
  useEffect(()=>{
    fetch("http://localhost:8000/order")
    .then(res =>res.json())
    .then(
      (result)=>{
        setRows(result)
      }
    )
  },[])
  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nama</StyledTableCell>
            <StyledTableCell align="right">Plat Nomor</StyledTableCell>
            <StyledTableCell align="right">Tipe Kendaraan</StyledTableCell>
            <StyledTableCell align="right">Odometer</StyledTableCell>
            <StyledTableCell align="right">Aksi</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.plate_number}</StyledTableCell>
              <StyledTableCell align="right">{row.type}</StyledTableCell>
              <StyledTableCell align="right">{row.odometer}</StyledTableCell>
              <StyledTableCell align="right">
                <Button component="a" href={"/printer/pkb/"+ row.id} style={{marginRight:10}} variant="contained" color="primary">Cetak PKB</Button>
                <Button component="a" href={"/printer/pkb/"+ row.id} variant="contained" color="primary">Cetak Bukti Bayar</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ListWorkOrderPage(props) {
    if(props.location.state !== undefined){
      alert(props.location.state)
    }

    return(
      <Box>
        <Typography variant="h4" color="primary">Manajemen Perintah Kerja</Typography>
        <ButtonList/>
        <CustomizedTables/>
      </Box>
    )
  }
  
  export default ListWorkOrderPage;
  