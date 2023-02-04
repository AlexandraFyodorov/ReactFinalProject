import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import db from './firebase';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, ListItem } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const style = {
  maxWidth: 360,
  bgcolor: '#fafafa',
  padding: 2
};

function EditProduct() {
  const location = useLocation()
  const productID = location.state
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);

  let productName = products.filter((products) => products.id === productID).map(x => x.Name)
  let productPrice = products.filter((products) => products.id === productID).map(x => x.Price)
  let productQuantity = products.filter((products) => products.id === productID).map(x => x.Quantity)

  const [productData, setProductData] = useState({ Name: String(productName), Price: parseInt(productPrice), Quantity: parseInt(productQuantity) });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = { Name: String(productData.Name), Price: parseInt(productData.Price), Quantity: parseInt(productData.Quantity) }
    await updateDoc(doc(db, 'Products', productID), obj);
  }
  const DeleteProduct = async () => {
    purchases.filter(purchases => purchases.ProductID === productID).map(async (x) => {
      return (<div key={x.id}>{await deleteDoc(doc(db, 'Purchases', x.id))}</div>)
    })
    await deleteDoc(doc(db, 'Products', productID))
  }
  return (
    <Container>
      <br /><br />
      <Paper sx={{ width: 1110 }} style={{ padding: 0.5, textAlign: "center", margin: 10 }} elevation={3}><h3>Edit Product</h3></Paper>
      <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, }} noValidate autoComplete="off">
        <TextField label="Product Name" id="outlined-product-name" defaultValue={productName} onChange={(e) => setProductData({ ...productData, Name: e.target.value })} />
        <TextField type='number' label="Price" id="outlined-price" defaultValue={productPrice} onChange={(e) => setProductData({ ...productData, Price: e.target.value })} />
        <TextField type='number' label="Quantity" id="outlined-quantity" defaultValue={productQuantity} onChange={(e) => setProductData({ ...productData, Quantity: e.target.value })} />

        <Button sx={{ m: 1, padding: 1, margin: 2, marginLeft: 15 }} variant="outlined" size="small" type='submit' color="primary" onClick={handleSubmit}>Update</Button>
        <Button sx={{ m: 1, padding: 1 }} variant="outlined" size="small" color="primary" onClick={DeleteProduct}>Delete</Button>
      </Box>
      <br />
      <Typography variant='h6'>Customers List</Typography>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {
          customers.map((user) => {
            return (
              <li key={`section-${user.id}`}>
                <ul>
                  {
                    purchases.filter((purchases) => purchases.ProductID === productID && purchases.CustomerID === user.id).map((x) => {
                      return (
                        <ListItem divider key={`item-${x.id}-${x}`}>
                          <ListItemText primary={<Link to={`/editCustomer`} state={user.id} >{user.firstName}{' '}{user.lastName}</Link>} />
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

    </Container>
  );
}

export default EditProduct;