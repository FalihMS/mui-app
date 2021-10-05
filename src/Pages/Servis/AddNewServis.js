import { Typography, Box, Paper, Grid, Button, Modal, Fade, Backdrop, TextField, List, ListItem, ListItemText, InputAdornment  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Search } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from 'axios';
import uniqid from 'uniqid'

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

function InputForm(){

  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    name:'',
    description:'',
    flat_rate:'',
  })
  const history = useHistory()
  const classes = useStyles()


  
  async function onSubmit(event){
    event.preventDefault()
    axios.post('http://localhost:8000/service',{
      id: uniqid("service-"),
      name: inputData.name,
      description: inputData.description,
      flat_rate: inputData.flat_rate
    }).then(res => {
      if(res.status === 201){
        history.push({
          pathname: '/service',
          state: "Success"
        })
      }else{
        history.push({
          pathname: '/service',
          state: "Failed"
        })
      }
    })
    
  }

  return(
    <Grid container direction="column" component={Paper} className={classes.boxInput}>
      <Typography variant="h5" color="primary" style={{marginBottom:20}}>Tambah Service</Typography>
      <Box display="flex" style={{marginBlock:10}}>
        <TextField onChange={(event)=>{setInputData({...inputData, name: event.target.value}); event.preventDefault()}} value={inputData.name} label="Nama Service" variant="outlined" size="small" style={{width:450}}/>
      </Box>
      <Box display="flex" style={{marginBlock:10}}>
        <TextField onChange={(event)=>{setInputData({...inputData, description: event.target.value}); event.preventDefault()}} value={inputData.description} label="Description" variant="outlined" size="small" style={{width:450}}/>
      </Box>
      <Box display="flex" style={{marginBlock:10}}>
        <TextField onChange={(event)=>{setInputData({...inputData, flat_rate: event.target.value}); event.preventDefault()}} value={inputData.flat_rate} label="Flat Rate" variant="outlined" size="small" style={{width:450}}/>
      </Box>
      <Box display="flex" style={{marginBlock:10}}>
        <Button onClick={(event)=>onSubmit(event)} variant="contained" color="primary">Masukan Data</Button>
      </Box>
    </Grid>
  )
}

function AddNewServis() {
    return(
      <Box>
        <InputForm/>
      </Box>
    )
  }
  
export default AddNewServis;
