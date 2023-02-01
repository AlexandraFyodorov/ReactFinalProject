import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation,Link } from 'react-router-dom';
import { updateDoc,doc,collection, addDoc } from 'firebase/firestore';
import db from './firebase';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function BuyProduct() {
  const location = useLocation()
  const userID = location.state
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const [addData, setAddData] = useState({ productId: '', customerId: '', date: new Date().toLocaleDateString('en-CA') });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setAddData({ ...addData, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemName = products.filter(products=>products.id===addData.productId).map(x=>x.Name)
    const itemPrice = products.filter(products=>products.id===addData.productId).map(x=>x.Price)
    const itemQuantity = products.filter(products=>products.id===addData.productId).map(x=>x.Quantity)
    const obj = { Name: String(itemName) , Price: parseInt(itemPrice), Quantity: parseInt(itemQuantity-1) }
    if(userID)
    {
      await addDoc(collection(db, 'Purchases'), { CustomerID: userID, Date: addData.date, ProductID: addData.productId });
    }
    else{
      await addDoc(collection(db, 'Purchases'), { CustomerID: addData.customerId, Date: addData.date, ProductID: addData.productId });
    }
    //update Quantuty
    await updateDoc(doc(db, 'Products', addData.productId), obj);
  }
  return (
    <Container>
      <br /><br />
      <FormControl sx={{ m: 1, width: 300, }}>
        <InputLabel id="demo-multiple-Customers-label"  defaultValue={userID}>Customers</InputLabel>
        <Select labelId="demo-multiple-Customers-label" id="demo-multiple-Customers"
          defaultValue={userID} name='customerId' onChange={handleChange} input={<OutlinedInput label="Customers" />}>
          {
            customers.map(customer => {
              return <MenuItem value={customer.id} key={customer.id}>{customer.firstName + ' ' + customer.lastName}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300, }}>
        <InputLabel id="demo-multiple-products-label" >Products</InputLabel>
        <Select labelId="demo-multiple-products-label" id="demo-multiple-products"
          defaultValue='' name='productId' onChange={handleChange} input={<OutlinedInput label="Products" />}>
          {
            products.filter(products=>products.Quantity>0).map(product => {
              return <MenuItem value={product.id} key={product.id}>{product.Name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <Button sx={{ m: 1, width: 200, padding:1.7}} variant="outlined" size="large" type='submit' color="primary" onClick={handleSubmit}>BUY</Button>
    </Container>
  );
}

export default BuyProduct;