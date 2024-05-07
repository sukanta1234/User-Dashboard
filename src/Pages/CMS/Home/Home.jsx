import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { profile } from '../../../Toolkit/homeSlice';
import { profile_pic } from '../../../Helper';
import { resetRediect_To } from '../../../Toolkit/authSlice';
import Skeleton from 'react-loading-skeleton'

const Home = () => {
    const dispatch=useDispatch()
    const data=useSelector((state)=>state.home);
    console.log(data.data);
    useEffect(()=>{
        dispatch(profile())
    },[dispatch])
    useEffect(()=>{
      dispatch(resetRediect_To(null))

    },[dispatch])
  return (
    <Container sx={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
       {data.status==="loading"?(<><Skeleton style={{height:"400px",width:"600px"}}/></>):(<>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height:"300px",width:"300px" }}
        image={profile_pic(data.data.profile_pic)}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.data.first_name + data.data.last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.data.email}
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent:"center"}}>
        <Button size="small" variant='outlined' color='success'>Share</Button>
        
      </CardActions>
    </Card>
       </>)}
    </Container>
  )
}

export default Home
