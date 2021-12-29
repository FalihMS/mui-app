/* eslint-disable react/prop-types */
import { useTheme, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TableCell,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Search } from '@material-ui/icons';
import useTable from '../../Components/useTable';

const useStyles = makeStyles((theme) => ({
  buttonList: {
    marginBlock: theme.spacing(3)
  },
  table: {
    minWidth: 500
  },
  searchInput: {
    width: '75%'
  }
}));

const headCells = [
  { id: 'name', label: 'Nama' },
  { id: 'phone_no', label: 'Nomor Telepon' },
  { id: 'email', label: 'Email' },
  { id: 'address', label: 'Alamat' },
  { id: 'join_address', label: 'Tanggal Masuk' },
  { id: 'aksi', label: 'Aksi', disableSorting: true }
];

function ButtonList() {
  const classes = useStyles();

  return (
    <Box className={classes.buttonList}>
      <Button component="a" href="/mekanik/create" variant="contained" color="primary">
        Tambah Karyawan
      </Button>
    </Box>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

function CustomizedTables() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });

  const { TblContainer, TblHead, TblPagination, tableMekanik } = useTable(
    data,
    headCells,
    filterFn
  );

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else return items.filter((x) => x.name.toLowerCase().includes(target.value));
      }
    });
  };
  useEffect(() => {
    fetch('http://localhost:8000/service/mechanic')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <TextField
            label="Cari Mekanik"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {tableMekanik().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone_no}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.join_date.slice(0, 16)}</TableCell>
                <TableCell>
                  <Button
                    component="a"
                    href={'/print/pkb' + item.id}
                    style={{ marginRight: 10 }}
                    variant="contained"
                    color="primary">
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}

function ListMekanik(props) {
  if (props.location.state !== undefined) {
    alert(props.location.state);
  }

  return (
    <Box>
      <Typography variant="h4" color="primary">
        Manajemen Mekanik
      </Typography>
      <ButtonList />
      <CustomizedTables />
    </Box>
  );
}

export default ListMekanik;
