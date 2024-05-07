import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteApi, productApi } from '../../../Toolkit/productSlice';
import { Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { product } from '../../../Helper';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'

const Product = () => {
    const dispatch=useDispatch();
    const data=useSelector((state)=>state.product)
    // console.log(data.pdata,"pdata");
    useEffect(()=>{
        dispatch(productApi())
    },[])
    const handleDlete=(id)=>{
        const formData=new FormData();
        formData.append("id",id)
        dispatch(deleteApi(formData)).then(()=>dispatch(productApi()))
        Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
    }
    const isConfirmed=(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                handleDlete(id)
              
            }
          });

    }
   
  return (
    <Container>
      <Grid container sx={{marginTop:"30px"}}>
     {data.status==="loading"?(<>
     <h1><Skeleton style={{height:"400px", width:"500px"}}/></h1>
     </>):(<>
      {data.pdata?.map((item)=>(
            <Grid item lg={3} sx={{margin:"5px"}} md={4} sm={12}>
               <Card sx={{ maxWidth: 345 }}>
             <CardMedia
               sx={{ height:"250px"}}
               image={product(item.image)}
               title="green iguana"
             />
             <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                 {item.title}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                {item.description}
               </Typography>
             </CardContent>
             <CardActions sx={{justifyContent:"center"}}>
               <Button size="small" onClick={(()=>isConfirmed(item._id))}>Delete</Button>
               <Button size="small" component={Link} to={`/Product/${item._id}`}>Edit</Button>
             </CardActions>
           </Card>
            </Grid>

        ))}
     </>)}
      </Grid>
        
    </Container>
  )
}

export default Product
