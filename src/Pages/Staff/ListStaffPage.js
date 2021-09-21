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
      <Button component="a" href="/staff/create" variant="contained" color="primary">Tambah Karyawan</Button>
    </Box>
  )
}

function CustomizedTables() {
  const [rows, setRows] = useState([])
  const classes = useStyles();
  useEffect(()=>{
    fetch("http://localhost:8000/staff")
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
            <StyledTableCell align="right">Nomor HP</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Alamat</StyledTableCell>
            <StyledTableCell align="right">Aksi</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.phone_no}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.address}</StyledTableCell>
              <StyledTableCell align="right">
                <Button component="a" href={"/staff/"+ row.id} variant="outlined" color="primary">Lihat Detail</Button>
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
        <Typography variant="h4" color="primary">Manajemen Karyawan</Typography>
        <ButtonList/>
        <CustomizedTables/>
      </Box>
    )
  }
  
  export default ListStaffPage;
  