/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  List,
  ListItem,
  ListItemText,
  InputAdornment
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import uniqid from 'uniqid';

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

function ModalForm(props) {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState('');
  const data = props.dataset;

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelectedItem(data[index].value);
  };

  function exitModal() {
    props.changeInput(data[selectedIndex].key, data[selectedIndex].value);
    props.handleClose();
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.openState}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <Fade in={props.openState}>
        <div className={classes.paper}>
          <Typography variant="h5" color="primary" style={{ marginBlock: 20 }}>
            Pilih Posisi
          </Typography>
          <Typography style={{ marginBlock: 20 }}>
            Posisi Dipilih: {selectedItem === '' ? '' : selectedItem}
          </Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            label="Cari Posisi"
            variant="outlined"
            size="small"
            style={{ width: 450, marginBlock: 10 }}
          />
          <List
            style={{
              border: '1px solid grey',
              marginBottom: 10,
              position: 'relative',
              overflow: 'auto',
              height: 300
            }}>
            {data.map((item, key) => (
              <ListItem
                button
                selected={selectedIndex === key}
                onClick={(event) => handleListItemClick(event, key)}>
                <ListItemText primary={item.value} />
              </ListItem>
            ))}
          </List>
          <Button
            onClick={exitModal}
            variant="contained"
            style={{ margin: 'auto' }}
            color="primary">
            Pilih Posisi
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}

function ModalPelanggan(props) {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState('');
  const data = props.dataset;

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelectedItem(data[index].value);
  };

  function exitModal() {
    props.changeInput(data[selectedIndex].key, data[selectedIndex].value);
    props.handleClose();
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.openState}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <Fade in={props.openState}>
        <div className={classes.paper}>
          <Typography variant="h5" color="primary" style={{ marginBlock: 20 }}>
            Pilih Nomor Handphone
          </Typography>
          <Typography style={{ marginBlock: 20 }}>
            Nomor Handphone Dipilih: {selectedItem === '' ? '' : selectedItem}
          </Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            label="Cari Posisi"
            variant="outlined"
            size="small"
            style={{ width: 450, marginBlock: 10 }}
          />
          <List
            style={{
              border: '1px solid grey',
              marginBottom: 10,
              position: 'relative',
              overflow: 'auto',
              height: 300
            }}>
            {data.map((item, key) => (
              <ListItem
                button
                selected={selectedIndex === key}
                onClick={(event) => handleListItemClick(event, key)}>
                <ListItemText primary={item.value} />
              </ListItem>
            ))}
          </List>
          <Button
            onClick={exitModal}
            variant="contained"
            style={{ margin: 'auto' }}
            color="primary">
            Pilih Posisi
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}

function ModalKendaraan(props) {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState('');
  const dataKendaraan = props.dataset;

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelectedItem(dataKendaraan[index].value);
  };

  function exitModal() {
    props.changeInput(dataKendaraan[selectedIndex].key, dataKendaraan[selectedIndex].value);
    props.handleClose();
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.openState}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <Fade in={props.openState}>
        <div className={classes.paper}>
          <Typography variant="h5" color="primary" style={{ marginBlock: 20 }}>
            Pilih Model Kendaraan
          </Typography>
          <Typography style={{ marginBlock: 20 }}>
            Model Kendaraan Dipilih: {selectedItem === '' ? '' : selectedItem}
          </Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            label="Cari Posisi"
            variant="outlined"
            size="small"
            style={{ width: 450, marginBlock: 10 }}
          />
          <List
            style={{
              border: '1px solid grey',
              marginBottom: 10,
              position: 'relative',
              overflow: 'auto',
              height: 300
            }}>
            {dataKendaraan.map((item, key) => (
              <ListItem
                button
                selected={selectedIndex === key}
                onClick={(event) => handleListItemClick(event, key)}>
                <ListItemText primary={item.value} />
              </ListItem>
            ))}
          </List>
          <Button
            onClick={exitModal}
            variant="contained"
            style={{ margin: 'auto' }}
            color="primary">
            Pilih Kendaraan
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}

function InputNopolForm() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [posisi, setPosisi] = useState([]);
  const history = useHistory();
  const [row, setRow] = useState([]);

  useEffect(() => {
    const data = [];
    fetch('http://localhost:8000/customer/vehicle')
      .then((res) => res.json())
      .then((result) => {
        result.forEach((element) => {
          data.push({
            key: data.length,
            id: element.id,
            value: element.plate_number,
            vehicle_model: element.vehicle_model
          });
        });
        setRow(data);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function onSubmit(event) {
    event.preventDefault();
    history.push({
      pathname: '/pkb/create/' + row[selectedRow.key].id,
      state: 'Success'
    });
  }

  const classes = useStyles();

  return (
    <Grid container direction="column" component={Paper} className={classes.boxInput}>
      <Typography color="primary" style={{ marginBottom: 20 }}>
        Data Kendaraan
      </Typography>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          readOnly
          label="Nomor Polisi"
          variant="outlined"
          value={posisi.length === 0 ? 'Pilih Nomor Polisi' : posisi[1]}
          size="small"
          style={{ width: 450 }}
        />
        <Button onClick={handleOpen} variant="contained" color="primary" style={{ marginLeft: 10 }}>
          Cari Nomor Polisi
        </Button>
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          readOnly
          label="Model Kendaraan"
          variant="outlined"
          value={posisi.length === 0 ? 'Pilih Nomor Polisi' : selectedRow.vehicle_model}
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <Button onClick={(event) => onSubmit(event)} variant="contained" color="primary">
          Masukan Data
        </Button>
      </Box>
      <ModalForm
        dataset={row}
        openState={open}
        handleClose={() => handleClose()}
        changeInput={(key, item) => {
          setPosisi([key, item]);
          setSelectedRow(row[key]);
        }}
      />
    </Grid>
  );
}

function InputKendaraanForm() {
  const [open, setOpen] = useState(false);
  const [buka, setBuka] = useState(false);
  const [inputData, setInputData] = useState({
    plate_number: '',
    engine_number: '',
    chasis_number: '',
    id_pelanggan: '',
    id_kendaraan: ''
  });
  const [posisi, setPosisi] = useState([]);
  const [posisiKendaraan, setPosisiKendaraan] = useState([]);
  const history = useHistory();
  const [row, setRow] = useState([]);
  const [rowKendaraan, setRowKendaraan] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuka = () => {
    setBuka(true);
  };

  const handleTutup = () => {
    setBuka(false);
  };

  const classes = useStyles();

  useEffect(() => {
    const data = [];
    const dataKendaraan = [];

    fetch('http://localhost:8000/customer/')
      .then((res) => res.json())
      .then((result) => {
        result.forEach((element) => {
          data.push({ key: element.id, value: element.phone_no, name: element.name });
        });
        setRow(data);
      });

    fetch('http://localhost:8000/customer/vehicle/model')
      .then((res) => res.json())
      .then((result) => {
        result.forEach((element) => {
          dataKendaraan.push({
            key: element.id,
            value: element.type,
            plate_number: element.plate_number,
            engine_number: element.engine_number,
            chasis_number: element.chasis_number
          });
        });
        setRowKendaraan(dataKendaraan);
      });
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    let uniqid = uniqid('VH-');
    axios
      .post('http://localhost:8000/customer/vehicle', {
        id: uniqid,
        customer_id: inputData.id_pelanggan,
        vehicle_model_id: inputData.id_kendaraan,
        // vehicle_model_id:1,
        plate_number: inputData.plate_number,
        engine_number: inputData.engine_number,
        chasis_number: inputData.chasis_number
      })
      .then((res) => {
        if (res.status === 201) {
          history.push({
            pathname: '/pkb/create/' + uniqid,
            state: 'Success'
          });
        } else {
          history.push({
            pathname: '/work-order',
            state: 'Failed'
          });
        }
      });
  }

  return (
    <Grid container direction="column" component={Paper} className={classes.boxInput}>
      <Typography color="primary" style={{ marginBottom: 20 }}>
        Tambah Data Kendaraan
      </Typography>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          readOnly
          label="Nomor Handphone"
          variant="outlined"
          value={posisi.length === 0 ? 'Pilih Nomor Handphone' : posisi[1]}
          size="small"
          style={{ width: 450 }}
        />
        <Button onClick={handleOpen} variant="contained" color="primary" style={{ marginLeft: 10 }}>
          Cari Nomor Handphone
        </Button>
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          readOnly
          label="Nama Pelanggan"
          variant="outlined"
          value={posisi.length === 0 ? 'Pilih Nama Pelanggan' : selectedRow.name}
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          readOnly
          label="Model Kendaraan"
          variant="outlined"
          value={posisiKendaraan.length === 0 ? 'Pilih Model Kendaraan' : posisiKendaraan[1]}
          size="small"
          style={{ width: 450 }}
        />
        <Button onClick={handleBuka} variant="contained" color="primary" style={{ marginLeft: 10 }}>
          Cari Model Kendaraan
        </Button>
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, plate_number: event.target.value });
            event.preventDefault();
          }}
          value={inputData.plate_number}
          label="Nomor Polisi"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, engine_number: event.target.value });
            event.preventDefault();
          }}
          value={inputData.engine_number}
          label="Nomor Mesin"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, chasis_number: event.target.value });
            event.preventDefault();
          }}
          value={inputData.chasis_number}
          label="Nomor Rangka"
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
      <ModalPelanggan
        dataset={row}
        openState={open}
        handleClose={() => handleClose()}
        changeInput={(key, item) => {
          setPosisi(
            [key, item],
            setSelectedRow(row[key]),
            setInputData({ ...inputData, id_pelanggan: key })
          );
        }}
      />
      <ModalKendaraan
        dataset={rowKendaraan}
        openState={buka}
        handleClose={() => handleTutup()}
        changeInput={(key, item) => {
          setPosisiKendaraan([key, item], setInputData({ ...inputData, id_kendaraan: key }));
        }}
      />
    </Grid>
  );
}

function InputPelangganForm() {
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    cust_id: uniqid('CST-'),
    vehicle_id: uniqid('VH-'),
    name: '',
    email: '',
    phone_no: '',
    address: '',
    plate_number: '',
    engine_number: '',
    chasis_number: '',
    role_id: ''
  });
  const [posisiKendaraan, setPosisiKendaraan] = useState([]);
  const [rowKendaraan, setRowKendaraan] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const dataKendaraan = [];
    fetch('http://localhost:8000/customer/vehicle/model')
      .then((res) => res.json())
      .then((result) => {
        result.forEach((element) => {
          dataKendaraan.push({
            key: element.id,
            value: element.type,
            plate_number: element.plate_number,
            engine_number: element.engine_number,
            chasis_number: element.chasis_number
          });
        });
        setRowKendaraan(dataKendaraan);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  async function onSubmit(event) {
    event.preventDefault();
    axios
      .post('http://localhost:8000/customer', {
        id: inputData.cust_id,
        name: inputData.name,
        email: inputData.email,
        phone_no: inputData.phone_no,
        address: inputData.address,
        community_member: 0
      })
      .then((res) => {
        if (res.status === 201) {
          // history.push({
          //   pathname: '/work-order',
          //   state: "Success"
          // })
        } else {
          // history.push({
          //   pathname: '/work-order',
          //   state: "Failed"
          // })
        }
      });
    axios
      .post('http://localhost:8000/customer/vehicle', {
        id: inputData.vehicle_id,
        customer_id: inputData.cust_id,
        vehicle_model_id: inputData.role_id,
        // vehicle_model_id:1,
        plate_number: inputData.plate_number,
        engine_number: inputData.engine_number,
        chasis_number: inputData.chasis_number
      })
      .then((res) => {
        if (res.status === 201) {
          history.push({
            pathname: `/pkb/create/${inputData.vehicle_id}`,
            state: 'Success'
          });
        } else {
          history.push({
            pathname: '/work-order',
            state: 'Failed'
          });
        }
      });
  }
  console.log(inputData.role_id);
  return (
    <Grid container direction="column" component={Paper} className={classes.boxInput}>
      <Typography color="primary" style={{ marginBottom: 20 }}>
        Tambah Data Pelanggan
      </Typography>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, name: event.target.value });
            event.preventDefault();
          }}
          value={inputData.name}
          label="Nama Pelanggan"
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
        <TextField
          readOnly
          label="Model Kendaraan"
          variant="outlined"
          value={posisiKendaraan.length === 0 ? 'Pilih Model Kendaraan' : posisiKendaraan[1]}
          size="small"
          style={{ width: 450 }}
        />
        <Button onClick={handleOpen} variant="contained" color="primary" style={{ marginLeft: 10 }}>
          Cari Model Kendaraan
        </Button>
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, plate_number: event.target.value });
            event.preventDefault();
          }}
          value={inputData.plate_number}
          label="Nomor Polisi"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, engine_number: event.target.value });
            event.preventDefault();
          }}
          value={inputData.engine_number}
          label="Nomor Mesin"
          variant="outlined"
          size="small"
          style={{ width: 450 }}
        />
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <TextField
          onChange={(event) => {
            setInputData({ ...inputData, chasis_number: event.target.value });
            event.preventDefault();
          }}
          value={inputData.chasis_number}
          label="Nomor Rangka"
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
      <ModalKendaraan
        dataset={rowKendaraan}
        openState={open}
        handleClose={() => handleClose()}
        changeInput={(key, item) => {
          setPosisiKendaraan([key, item], setInputData({ ...inputData, role_id: key }));
        }}
      />
    </Grid>
  );
}

function InputPkbForm() {
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    phone_no: '',
    address: '',
    role_id: ''
  });
  const [posisi, setPosisi] = useState([]);
  const history = useHistory();
  const data = [
    {
      key: '1',
      value: 'Kasir'
    },
    {
      key: '2',
      value: 'Mekanik'
    },
    {
      key: '3',
      value: 'Admin Gudang'
    },
    {
      key: '4',
      value: 'Owner'
    }
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  async function onSubmit(event) {
    event.preventDefault();
    await fetch('http://localhost:8000/staff', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: inputData })
    }).then((res) => {
      if (res.status === 201) {
        history.push({
          pathname: '/staff',
          state: 'Success'
        });
      } else {
        history.push({
          pathname: '/staff',
          state: 'Failed'
        });
      }
    });
  }

  return (
    <Grid container direction="column" component={Paper} className={classes.boxInput}>
      <Typography color="primary" style={{ marginBottom: 20 }}>
        Data PKB
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
        <TextField
          readOnly
          label="Posisi"
          variant="outlined"
          value={posisi.length === 0 ? 'Pilih Melalui Tombol' : posisi[1]}
          size="small"
          style={{ width: 450 }}
        />
        <Button onClick={handleOpen} variant="contained" color="primary" style={{ marginLeft: 10 }}>
          Pilih Posisi
        </Button>
      </Box>
      <Box display="flex" style={{ marginBlock: 10 }}>
        <Button onClick={(event) => onSubmit(event)} variant="contained" color="primary">
          Masukan Data
        </Button>
      </Box>
      <ModalForm
        dataset={data}
        openState={open}
        handleClose={() => handleClose()}
        changeInput={(key, item) => {
          setPosisi([key, item], setInputData({ ...inputData, role_id: key }));
        }}
      />
    </Grid>
  );
}

function AddNewWorkOrder() {
  const [selectInput, setSelectInput] = useState(0);
  const [vehicle] = useState(undefined);

  return (
    <Box>
      <Typography variant="h5" color="primary" style={{ marginBottom: 20 }}>
        Buat Perintah Kerja
      </Typography>

      <Button
        onClick={() => {
          setSelectInput(1);
        }}
        style={{ marginRight: 10 }}
        variant="outlined"
        color="primary">
        Cari Nomor Polisi
      </Button>
      <Button
        onClick={() => {
          setSelectInput(2);
        }}
        style={{ marginRight: 10 }}
        variant="outlined"
        color="primary">
        Input Kendaraan Baru
      </Button>
      <Button
        onClick={() => {
          setSelectInput(3);
        }}
        style={{ marginRight: 10 }}
        variant="outlined"
        color="primary">
        Input Pelanggan Baru
      </Button>

      {selectInput === 1 ? <InputNopolForm /> : ''}
      {selectInput === 2 ? <InputKendaraanForm /> : ''}
      {selectInput === 3 ? <InputPelangganForm /> : ''}

      {vehicle !== undefined ? <InputPkbForm /> : ''}
    </Box>
  );
}

export default AddNewWorkOrder;
