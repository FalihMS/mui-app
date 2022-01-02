/* eslint-disable react/prop-types */
import { Typography, Box, Paper, Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

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

function InputForm(props) {
  const [inputData, setInputData] = useState({
    id: props.produkData.id,
    name: props.produkData.name,
    unit_measurement: props.produkData.unit_measurement,
    category: props.produkData.category,
    recommendation_price: props.produkData.recommendation_price
  });
  const history = useHistory();
  const classes = useStyles();

  async function onSubmit(event) {
    event.preventDefault();

    axios
      .put(`http://localhost:8000/product/${inputData.id}`, {
        name: inputData.name,
        unit_measurement: inputData.unit_measurement,
        category: inputData.category,
        recommendation_price: inputData.recommendation_price
      })
      .then((res) => {
        if (res === 201) {
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

  async function onDelete(event) {
    event.preventDefault();

    axios.delete(`http://localhost:8000/produk/${inputData.id}`).then((res) => {
      if (res.status === 200) {
        history.push({
          pathname: '/produk',
          state: 'Berhasil Hapus Data'
        });
      } else {
        history.push({
          pathname: '/produk',
          state: 'Gagal Hapus Data'
        });
      }
    });
  }

  return (
    <Grid container direction="column" component={Paper} className={classes.boxInput}>
      <Typography variant="h5" color="primary" style={{ marginBottom: 20 }}>
        Update Produk
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
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, category: event.target.value });
            event.preventDefault();
          }}
          value={inputData.category}
          label="Kategori"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, recommendation_price: event.target.value });
            event.preventDefault();
          }}
          value={inputData.recommendation_price}
          label="Harga Rekomendasi"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <Button
          onClick={(event) => onSubmit(event)}
          variant="contained"
          color="primary"
          style={{ marginRight: 10 }}>
          Masukan Data
        </Button>
        <Button onClick={(event) => onDelete(event)} variant="contained" color="secondary">
          Hapus Data
        </Button>
      </Box>
    </Grid>
  );
}

function DisplayDetail(props) {
  const classes = useStyles();
  const produk = props.produkData;

  return (
    <Grid container direction="row" component={Paper} className={classes.boxInput}>
      <Grid>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          ID Barang
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Nama Barang
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Satuan Ukuran
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Kategori
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Harga Rekomendasi
        </Typography>
        {/* <Typography color="primary" style={{marginBottom:20, marginRight:20}}>Alamat</Typography> */}
      </Grid>
      <Grid>
        <Typography style={{ marginBottom: 20, fontWeight: 'bold' }}>: {produk.id}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {produk.name}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {produk.unit_measurement}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {produk.category}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {produk.recommendation_price}</Typography>
        {/* <Typography style={{marginBottom:20}}>: {staff.address}</Typography>   */}
      </Grid>
    </Grid>
  );
}

function DetailProduk() {
  let { id } = useParams();

  const [master, setMaster] = useState({});
  const [updateState, setUpdateState] = useState(0);

  const handleChangeUpdate = (event) => {
    event.preventDefault();
    setUpdateState((updateState - 1) * -1);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/product/${id}`).then((response) => {
      setMaster(response.data);
      console.log(response);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" color="primary" style={{ marginBottom: 20 }}>
        Detail Barang
      </Typography>
      <Button
        component="a"
        href={'/produk/'}
        style={{ marginRight: 10 }}
        variant="outlined"
        color="primary">
        Kembali
      </Button>
      <Button
        onClick={(event) => handleChangeUpdate(event)}
        variant="outlined"
        color={updateState === 1 ? 'secondary' : 'primary'}>
        {updateState ? 'Cancel Update' : 'Update Barang'}
      </Button>
      {updateState === 1 ? (
        <InputForm produkData={master} />
      ) : (
        <DisplayDetail produkData={master} />
      )}
      {/* <InputForm/> */}
    </Box>
  );
}

export default DetailProduk;
