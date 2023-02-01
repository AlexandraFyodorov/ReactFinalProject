import { useSelector } from 'react-redux';
import { Link  } from 'react-router-dom'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import shadows from '@mui/material/styles/shadows';


function Product({ product }) {
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  let quantity = product.Quantity;
  if(quantity===0)
  {
    quantity='Out of stock'
  }
  return (
    
    <Card sx={{width:300, maxHeight:300 ,padding:1, margin:2, background:'#eeeeee'}} elevation={3}>
      <CardMedia height="140">
        <h5 >Price:{' '}{product.Price}{' '}NIS</h5>
      Quantity:{' '}{quantity}
      <Typography gutterBottom variant="h5" component="div" style={{ padding: 0.5, textAlign: "center", }}>
      <Link to={`/editProduct`} state={product.id}>{product.Name}</Link>
      </Typography>
      
      </CardMedia>
      <CardContent>
      
      
      <h3>Customers</h3>
        {
          customers.map((user) => {
            return (
              <div key={user.id}>
                {
                  purchases.filter((purchases) => purchases.CustomerID === user.id && purchases.ProductID === product.id).map((item) => {
                    return (
                      <div key={item.id}> <Link to={`/editCustomer`} state={user.id} >{user.firstName}</Link>
                        <div>Purchased date:{' '}{item.Date}</div>
                        <Link to={`/buyProduct`} state={user.id} >
                          <CardActions>
                          <Button variant="outlined" color="primary"  size="small">ADD</Button>
                          </CardActions>
                        </Link>            
                      </div> 
                    ) 
                  })
                }    
              </div>
            )
          })
        }

      </CardContent>
    
    </Card>
  );
}

export default Product;