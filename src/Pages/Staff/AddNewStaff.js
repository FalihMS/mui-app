import { Typography, Box, Paper, Grid, Button, Modal, Fade, Backdrop, TextField, List, ListItem, ListItemText, InputAdornment  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Search } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";

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

function InputForm(){

  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    name:'',
    email:'',
    phone_no:'',
    address:'',
    role_id:''
  })
  const [posisi, setPosisi] = useState([])
  const history = useHistory()
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles()


  
  async function onSubmit(event){
    event.preventDefault()
    await fetch('http://localhost:8000/staff', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data:inputData})
    }).then(res =>{
      if(res.status === 201){
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
      <Typography variant="h5" color="primary" style={{marginBottom:20}}>Tambah Karyawan</Typography>
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

function AddNewStaff() {
    return(
      <Box>
        <InputForm/>
      </Box>
    )
  }
  
export default AddNewStaff;
