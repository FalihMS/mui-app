import { Typography, Box, Paper, Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import uniqid from 'uniqid';

const regx = /[0-9]+/i;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  boxInput: {
    marginBlock: theme.spacing(3),
    padding: theme.spacing(3)
  }
}));

function InputForm() {
  const [inputData, setInputData] = useState({
    name: '',
    unit_measurement: '',
    category: '',
    recommendation_price: ''
  });
  const history = useHistory();
  const classes = useStyles();

  async function onSubmit(event) {
    event.preventDefault();

    if (inputData.name === '' || inputData.name.length > 100) {
      console.log('Error Name');
    } else if (inputData.unit_measurement === '' || inputData.unit_measurement.length > 100) {
      console.log('Error unit_measurement');
    } else if (inputData.category === '' || inputData.category.length > 100) {
      console.log('Error category');
    } else if (
      inputData.recommendation_price === '' ||
      !regx.test(inputData.recommendation_price)
    ) {
      console.log('Error recommendation_price');
    } else {
      axios
        .post('http://localhost:8000/product', {
          id: uniqid('PR-'),
          name: inputData.name,
          unit_measurement: inputData.unit_measurement,
          category: inputData.category,
          recommendation_price: inputData.recommendation_price
        })
        .then((res) => {
          if (res.status === 201) {
            history.push({
              pathname: '/produk',
              state: 'Success'
            });
          } else {
            history.push({
              pathname: '/produk',
              state: 'Failed'
            });
          }
        });
    }
  }

  return (
    <Grid container direction="column" component={Paper} className={classes.boxInput}>
      <Typography variant="h5" color="primary" style={{ marginBottom: 20 }}>
        Tambah Produk
      </Typography>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, name: event.target.value });
            event.preventDefault();
          }}
          value={inputData.name}
          label="Nama Barang"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
          error={inputData.name === '' || inputData.name.length > 100}
          helperText={
            inputData.name === ''
              ? 'Masukkan Nama Barang!'
              : inputData.name.length > 100
              ? 'Nama Barang Tidak Boleh Lebih dari 100 Karakter!'
              : ''
          }
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, unit_measurement: event.target.value });
            event.preventDefault();
          }}
          value={inputData.unit_measurement}
          label="Satuan Ukuran"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
          error={inputData.unit_measurement === '' || inputData.unit_measurement.length > 100}
          helperText={
            inputData.unit_measurement === ''
              ? 'Masukkan Satuan Ukuran!'
              : inputData.unit_measurement.length > 100
              ? 'Satuan Ukuran Tidak Boleh Lebih dari 100 Karakter'
              : ''
          }
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, category: event.target.value });
            event.preventDefault();
          }}
          value={inputData.category}
          label="Kategori Barang"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
          error={inputData.category === '' || inputData.category.length > 100}
          helperText={
            inputData.category === ''
              ? 'Masukkan Kategori Barang!'
              : inputData.category.length > 100
              ? 'Kategori Barang Tidak Boleh Lebih dari 100 Karakter!'
              : ''
          }
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, recommendation_price: event.target.value });
            event.preventDefault();
          }}
          value={inputData.recommendation_price}
          label="Rekomendasi Harga"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
          error={
            inputData.recommendation_price === '' || !regx.test(inputData.recommendation_price)
          }
          helperText={
            inputData.recommendation_price === ''
              ? 'Masukkan Rekomendasi Harga Barang!'
              : !regx.test(inputData.recommendation_price)
              ? 'Hanya Boleh Angka!'
              : ''
          }
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <Button onClick={(event) => onSubmit(event)} variant="contained" color="primary">
          Masukan Data
        </Button>
      </Box>
    </Grid>
  );
}

function AddNewProduk() {
  return (
    <Box>
      <InputForm />
    </Box>
  );
}

export default AddNewProduk;
