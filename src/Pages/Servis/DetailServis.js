import { Typography, Box, Paper, Grid, Button, Modal, Fade, Backdrop, TextField, List, ListItem, ListItemText, InputAdornment  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from 'axios'

const useStyles = makeStyles((theme)=>({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  boxInput:{
    marginBlock:theme.spacing(3),
    padding:theme.spacing(3),
  }
}));

function ModalForm(props){
  const classes = useStyles()
  
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState('');
  const data = props.dataset

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelectedItem(data[index].value)
  };

  function exitModal(){
    props.changeInput(data[selectedIndex].key, data[selectedIndex].value)
    props.handleClose()
  }

  return(
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.openState}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
    <Fade in={props.openState}>
      <div className={classes.paper}>
      <Typography variant="h5" color="primary" style={{marginBlock:20}}>Pilih Posisi</Typography>
      <Typography style={{marginBlock:20}}>Posisi Dipilih: {selectedItem === '' ? '': selectedItem }</Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          label="Cari Posisi"
          variant="outlined" 
          size="small" 
          style={{width:450, marginBlock:10}}/>
        <List style={{border:"1px solid grey", marginBottom:10,position: 'relative',overflow: 'auto',height: 300,}}>
          {data.map((item, key) => (
              <ListItem
              button
              selected={selectedIndex === key}
              onClick={(event) => handleListItemClick(event, key)}
            >
              <ListItemText primary={item.value}/>
            </ListItem>
            ))}
          
          
        </List>
        <Button onClick={exitModal} variant="contained" style={{margin:"auto"}} color="primary">Pilih Posisi</Button>
      </div>
    </Fade>
  </Modal>    
  )
}

function InputForm(props){

  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    id:props.ServiceData.id,
    name:props.ServiceData.name,
    email:props.ServiceData.email,
    phone_no:props.ServiceData.phone_no,
    address:props.ServiceData.address,
    role_id:props.ServiceData.role_id
  })
  const data = [
    {
      key:"1",
      value:"Kasir"
    },
    {
      key:"2",
      value:"Mekanik"
    },
    {
      key:"3",
      value:"Admin Gudang"
    },
    {
      key:"4",
      value:"Owner"
    }
  ]
  const [posisi, setPosisi] = useState([props.ServiceData.role_id, data[props.ServiceData.role_id].value])
  const history = useHistory()


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles()


  async function onSubmit(event){
    event.preventDefault()
    await fetch('http://localhost:8000/staff/'+ inputData.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data:inputData})
    }).then(res =>{
      if(res.status == 200){
        history.push({ 
          pathname: '/staff',
          state: "Success"
         })
      }else{
        history.push({ 
          pathname: '/staff',
          state: "Failed"
         })  
      }
    })
    
  }

  return(
    <Grid container direction="column" component={Paper} className={classes.boxInput}>
      <Typography variant="h5" color="primary" style={{marginBottom:20}}>Update Karyawan</Typography>
      <Box display="flex" style={{marginBlock:10}}>
        <TextField onChange={(event)=>{setInputData({...inputData, name: event.target.value}); event.preventDefault()}} value={inputData.name} label="Nama Karyawan" variant="outlined" size="small" style={{width:450}}/>
      </Box>
      <Box display="flex" style={{marginBlock:10}}>
        <TextField onChange={(event)=>{setInputData({...inputData, email: event.target.value}); event.preventDefault()}} value={inputData.email} label="Email" variant="outlined" size="small" style={{width:450}}/>
      </Box>
      <Box display="flex" style={{marginBlock:10}}>
        <TextField onChange={(event)=>{setInputData({...inputData, phone_no: event.target.value}); event.preventDefault()}} value={inputData.phone_no} label="Nomor HP" variant="outlined" size="small" style={{width:450}}/>
      </Box>
      <Box display="flex" style={{marginBlock:10}}>
        <TextField onChange={(event)=>{setInputData({...inputData, address: event.target.value}); event.preventDefault()}} value={inputData.address} label="Alamat Rumah" variant="outlined" size="small" style={{width:450}}/>
      </Box>
      <Box display="flex" style={{marginBlock:10}}>
        <TextField onChange={(event)=>{setInputData({...inputData, role_id: event.target.value}); event.preventDefault()}} value={inputData.role_id}  label="Posisi" variant="outlined" value={posisi === '' ? "Pilih Melalui Tombol" : posisi[0]} size="small" style={{display:'none'}}/>        
        <TextField readOnly label="Posisi" variant="outlined" value={posisi.length === 0 ? "Pilih Melalui Tombol" : posisi[1]} size="small" style={{width:450}}/>
        <Button onClick={handleOpen} variant="contained" color="primary" style={{marginLeft:10}}>Pilih Posisi</Button>
      </Box>
      <Box display="flex" style={{marginBlock:10}}>
        <Button onClick={(event)=>onSubmit(event)} variant="contained" color="primary">Masukan Data</Button>
      </Box>
      <ModalForm dataset={data} openState={open} handleClose={()=>handleClose()} changeInput={(key, item)=>{setPosisi([key, item], setInputData({...inputData, role_id: key}))}}/>
    </Grid>
  )
}

function DisplayDetail(props){
    const classes = useStyles()
    const service = props.ServiceData
    const data = [
      {
        key:"1",
        value:"Kasir"
      },
      {
        key:"2",
        value:"Mekanik"
      },
      {
        key:"3",
        value:"Admin Gudang"
      },
      {
        key:"4",
        value:"Owner"
      }
    ]
    
    return(
      <Grid container direction="row" component={Paper} className={classes.boxInput}>
        
        <Grid>
            <Typography color="primary" style={{marginBottom:20, marginRight:20}}>ID Service</Typography>
            <Typography color="primary" style={{marginBottom:20, marginRight:20}}>Nama Service</Typography>
            <Typography color="primary" style={{marginBottom:20, marginRight:20}}>Description</Typography>
            <Typography color="primary" style={{marginBottom:20, marginRight:20}}>Flat Rate</Typography>
        </Grid>
        <Grid>
            <Typography style={{marginBottom:20, fontWeight:'bold'}}>: {service.id}</Typography>
            <Typography style={{marginBottom:20}}>: {service.name}</Typography>      
            <Typography style={{marginBottom:20}}>: {service.description}</Typography>    
            <Typography style={{marginBottom:20}}>: {service.flat_rate}</Typography>     
        </Grid>
      </Grid>
    )
  }
  
function DetailServis(props) {
    let { id } = useParams();

    const [master, setMaster] = useState({})
    const [updateState, setUpdateState] = useState(0)
    
    const classes = useStyles();

    const handleChangeUpdate = (event) =>{
        event.preventDefault()
        setUpdateState((updateState-1)*-1)
    }

    useEffect(()=>{
        axios
        .get(`http://localhost:8000/service/${id}`)
        .then((response) => {
            setMaster(response.data);
            console.log(response)
        })
    },[])

    return(
      <Box>
        <Typography variant="h5" color="primary" style={{marginBottom:20}}>Detail Service</Typography>
        <Button onClick={(event)=>handleChangeUpdate(event)} variant="outlined" color={updateState === 1 ? 'secondary':'primary'}>{updateState ? 'Cancel Update':'Update Service'}</Button>
        {
            updateState === 1 ? <InputForm ServiceData={master}/> : <DisplayDetail ServiceData={master}/>
        }
        {/* <InputForm/> */}
      </Box>
    )
  }
  
export default DetailServis;
