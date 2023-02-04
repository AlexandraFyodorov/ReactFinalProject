import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ListItem } from '@mui/material';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';

function Product({ product }) {
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  let quantity = product.Quantity;
  if (quantity === 0) {
    quantity = 'Out of stock'
  }
  return (
    <Card sx={{ width: 340, padding: 1, margin: 2, background: '#eeeeee' }} elevation={3}>
      <CardMedia height="150">
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h7" component="div">
              Price:{' '}{product.Price}{' '}NIS
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h7" component="div">
              Quantity:{' '}{quantity}
            </Typography>
          </Grid>
        </Grid>
        <Typography gutterBottom variant="h5" component="div" style={{ padding: 0.5, textAlign: "center", }}>
          <Link to={`/editProduct`} state={product.id}>{product.Name}</Link>
        </Typography>
      </CardMedia>
      <CardContent>
        <h4>Customers</h4>
        <List sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          height: 250,
          '& ul': { padding: 0 },
        }}
          subheader={<li />}>
          {
            customers.map((user) => {
              return (
                <li key={`section-${user.id}`}>
                  <ul>
                    {
                      purchases.filter((purchases) => purchases.CustomerID === user.id && purchases.ProductID === product.id).map((item) => {
                        return (
                          <ListItem key={`item-${item.id}-${item}`}>
                            <Grid container alignItems="center">
                              <Grid item xs>
                                <Typography gutterBottom variant="h7" component="div">
                                  <Link to={`/editCustomer`} state={user.id} >{user.firstName}</Link>
                                </Typography>
                              </Grid>
                              <Grid item xs>
                                <Typography gutterBottom variant="h7" component="div">
                                  <h6>Purchased date:{' '}{item.Date}</h6>
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography gutterBottom variant="h7" component="div">
                                  <Link to={`/buyProduct`} state={user.id} >
                                    <CardActions>
                                      <Button variant="outlined" color="primary" size="small">ADD</Button>
                                    </CardActions>
                                  </Link>
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </List>
      </CardContent>
    </Card>
  );
}

export default Product;