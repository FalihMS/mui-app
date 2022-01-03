/* eslint-disable react/prop-types */
import { Typography, Box, Paper, Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
// import FormControl from '@mui/material/FormControl';
// import Autocomplete from '@mui/material/Autocomplete';

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

function InputForm(props) {
  const [inputData, setInputData] = useState({
    id: props.ServiceData.id,
    name: props.ServiceData.name,
    description: props.ServiceData.description,
    flat_rate: props.ServiceData.flat_rate
  });
  const history = useHistory();
  const classes = useStyles();

  async function onSubmit(event) {
    event.preventDefault();
    if (inputData.name === '' || inputData.name.length > 60) {
      console.log('Error Name');
    } else if (inputData.description === '' || inputData.description.length > 60) {
      console.log('Error description');
    } else if (inputData.flat_rate === '' || !regx.test(inputData.flat_rate)) {
      console.log('Error flat_rate');
    } else {
      axios
        .put(`http://localhost:8000/service/${inputData.id}`, {
          name: inputData.name,
          description: inputData.description,
          flat_rate: inputData.flat_rate
        })
        .then((res) => {
          if (res.status === 201) {
            history.push({
              pathname: '/service',
              state: 'Success'
            });
          } else {
            history.push({
              pathname: '/service',
              state: 'Failed'
            });
          }
        });
    }
  }

  async function onDelete(event) {
    event.preventDefault();

    axios.delete(`http://localhost:8000/service/${inputData.id}`).then((res) => {
      if (res.status === 200) {
        history.push({
          pathname: '/service',
          state: 'Berhasil Hapus Data'
        });
      } else {
        history.push({
          pathname: '/service',
          state: 'Gagal Hapus Data'
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
          label="Nama Service"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
          error={inputData.name === '' || inputData.name.length > 60}
          helperText={
            inputData.name === ''
              ? 'Masukkan Nama Service!'
              : inputData.name.length > 60
              ? 'Nama Service Tidak Boleh Lebih dari 60 Karakter!'
              : ''
          }
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, description: event.target.value });
            event.preventDefault();
          }}
          value={inputData.description}
          label="Description"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
          error={inputData.description === '' || inputData.description.length > 60}
          helperText={
            inputData.description === ''
              ? 'Masukkan Deskripsi Service'
              : inputData.description.length > 60
              ? 'Deskripsi Service Tidak Boleh Lebih dari 60 Karakter!'
              : ''
          }
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, flat_rate: event.target.value });
            event.preventDefault();
          }}
          value={inputData.flat_rate}
          label="Flat Rate"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
          error={inputData.flat_rate === '' || !regx.test(inputData.flat_rate)}
          helperText={
            inputData.flat_rate === ''
              ? 'Masukkan Harga!'
              : !regx.test(inputData.flat_rate)
              ? 'Harga Harus Angka!'
              : ''
          }
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
  const service = props.ServiceData;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/service/`).then((response) => {
      setData(response.data);
    });
  }, []);

  console.log(data);

  return (
    <Grid container direction="row" component={Paper} className={classes.boxInput}>
      <Grid>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          ID Service
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Nama Service
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Description
        </Typography>
        <Typography color="primary" style={{ marginBottom: 20, marginRight: 20 }}>
          Flat Rate
        </Typography>
      </Grid>
      <Grid>
        <Typography style={{ marginBottom: 20, fontWeight: 'bold' }}>: {service.id}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {service.name}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {service.description}</Typography>
        <Typography style={{ marginBottom: 20 }}>: {service.flat_rate}</Typography>
      </Grid>
      {/* <Grid>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}>
            {data.map((name) => (
              <MenuItem key={name.id} value={name.name} style={getStyles(name, personName, theme)}>
                {name.name}
              </MenuItem>
            ))}
          </Select>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={data}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="filterSelectedOptions" placeholder="Favorites" />
            )}
          />
        </FormControl>
      </Grid> */}
    </Grid>
  );
}

function DetailServis() {
  let { id } = useParams();

  const [master, setMaster] = useState({});
  const [updateState, setUpdateState] = useState(0);

  const handleChangeUpdate = (event) => {
    event.preventDefault();
    setUpdateState((updateState - 1) * -1);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/service/${id}`).then((response) => {
      setMaster(response.data);
      console.log(response);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" color="primary" style={{ marginBottom: 20 }}>
        Detail Service
      </Typography>
      <Button
        component="a"
        href={'/service/'}
        style={{ marginRight: 10 }}
        variant="outlined"
        color="primary">
        Kembali
      </Button>
      <Button
        onClick={(event) => handleChangeUpdate(event)}
        variant="outlined"
        color={updateState === 1 ? 'secondary' : 'primary'}>
        {updateState ? 'Cancel Update' : 'Update Service'}
      </Button>
      {updateState === 1 ? (
        <InputForm ServiceData={master} />
      ) : (
        <DisplayDetail ServiceData={master} />
      )}
      {/* <InputForm/> */}
    </Box>
  );
}

export default DetailServis;
