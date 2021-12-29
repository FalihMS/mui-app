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
    id: props.mekanikData.id,
    name: props.mekanikData.name,
    email: props.mekanikData.email,
    phone_no: props.mekanikData.phone_no,
    address: props.mekanikData.address,
    role_id: props.mekanikData.role_id
  });
  const history = useHistory();
  const classes = useStyles();

  async function onSubmit(event) {
    event.preventDefault();

    axios
      .put(`http://localhost:8000/service/mechanic/${inputData.id}`, {
        name: inputData.name,
        email: inputData.email,
        phone_no: inputData.phone_no,
        address: inputData.address,
        join_date: Date.now()
      })
      .then((res) => {
        if (res.status === 201) {
          history.push({
            pathname: '/mekanik',
            state: 'Success'
          });
        } else {
          history.push({
            pathname: '/mekanik',
            state: 'Failed'
          });
        }
      });
  }

  return (
    <Grid container direction="column" component={Paper} className={classes.boxInput}>
      <Typography variant="h5" color="primary" style={{ marginBottom: 20 }}>
        Update Karyawan
      </Typography>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, name: event.target.value });
            event.preventDefault();
          }}
          value={inputData.name}
          label="Nama Karyawan"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, email: event.target.value });
            event.preventDefault();
          }}
          value={inputData.email}
          label="Email"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, phone_no: event.target.value });
            event.preventDefault();
          }}
          value={inputData.phone_no}
          label="Nomor HP"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, address: event.target.value });
            event.preventDefault();
          }}
          value={inputData.address}
          label="Alamat Rumah"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
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

function DisplayDetail(props) {
  const classes = useStyles();
  const produk = props.mekanikData;
  return (
    <Grid container direction="row" component={Paper} className={classes.boxInput}>
      <Grid>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          ID Mekanik
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Nama Mekanik
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Nomor Telepon
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Email
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Alamat
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Joined Date
        </Typography>
      </Grid>
      <Grid>
        <Typography style={{ marginBottom: 20, fontWeight: 'bold' }}>: {produk.id}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {produk.name}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {produk.phone_no}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {produk.email}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {produk.address}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {produk.join_date}</Typography>
        {/* <Typography style={{marginBottom:20}}>: {staff.address}</Typography>   */}
      </Grid>
    </Grid>
  );
}

function DetailMekanik() {
  let { id } = useParams();

  const [master, setMaster] = useState({});
  const [updateState, setUpdateState] = useState(0);

  const handleChangeUpdate = (event) => {
    event.preventDefault();
    setUpdateState((updateState - 1) * -1);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/service/mechanic/${id}`).then((response) => {
      setMaster(response.data);
      console.log(response);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" color="primary" style={{ marginBottom: 20 }}>
        Detail Mekanik
      </Typography>
      <Button
        component="a"
        href={'/mekanik/'}
        style={{ marginRight: 10 }}
        variant="outlined"
        color="primary">
        Kembali
      </Button>
      <Button
        onClick={(event) => handleChangeUpdate(event)}
        variant="outlined"
        color={updateState === 1 ? 'secondary' : 'primary'}>
        {updateState ? 'Cancel Update' : 'Update Mekanik'}
      </Button>
      {updateState === 1 ? (
        <InputForm mekanikData={master} />
      ) : (
        <DisplayDetail mekanikData={master} />
      )}
      {/* <InputForm/> */}
    </Box>
  );
}

export default DetailMekanik;
