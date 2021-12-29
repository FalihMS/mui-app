/* eslint-disable react/prop-types */
import { Typography, Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { Search } from '@material-ui/icons';
// import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3)
//   },
//   boxInput: {
//     marginBlock: theme.spacing(3),
//     padding: theme.spacing(3)
//   }
// }));

const Iframe = (props) => {
  return (
    <div>
      <iframe
        id="iframe"
        src={props.src}
        height={props.height}
        width={props.width}
        frameBorder="0"
      />
    </div>
  );
};

function PrinterPKB() {
  let { id } = useParams();

  // const [master, setMaster] = useState({})

  // useEffect(()=>{

  //   fetch("http://localhost:8000/staff/"+id)
  //   .then(res =>res.json())
  //   .then(
  //     (result)=>{
  //       setMaster(result)
  //     }
  //   )
  // },[])

  return (
    <Box>
      <Typography variant="h5" color="primary" style={{ marginBottom: 20 }}>
        Printer PKB
      </Typography>
      <Iframe src={`http://localhost:8000/printer?t=pkb&id=${id}`} height="1500" width="900" />
    </Box>
  );
}

export default PrinterPKB;
