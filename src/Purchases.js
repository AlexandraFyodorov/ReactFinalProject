import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
function Purchases() {
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const navigate = useNavigate();
  const [data, setData] = useState({ productId: '', customerId: '', date: '' });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage['productId'] = data.productId;
    sessionStorage['customerId'] = data.customerId;
    sessionStorage['date'] = data.date;
    navigate(`/purchasesTable`);
  }
  return (
    <Container>
      <br /><br />
      <FormControl sx={{ m: 1, width: 300, }}>
        <InputLabel id="demo-multiple-products-label" >Products</InputLabel>
        <Select labelId="demo-multiple-products-label" id="demo-multiple-products"
          defaultValue='' name='productId' onChange={handleChange} input={<OutlinedInput label="Products" />}>
          {
            products.map(product => {
              return <MenuItem value={product.id} key={product.id}>{product.Name}</MenuItem>
            })
          }
        </Select>  <br />
      </FormControl>
      <FormControl sx={{ m: 1, width: 300, }}>
        <InputLabel id="demo-multiple-customers-label" >Customers</InputLabel>
        <Select labelId="demo-multiple-customers-label" id="demo-multiple-customers"
          defaultValue='' name='customerId' onChange={handleChange} input={<OutlinedInput label="Customers" />}>
          {
            customers.map(customer => {
              return <MenuItem value={customer.id} key={customer.id}>{customer.firstName + ' ' + customer.lastName}</MenuItem>
            })
          }
        </Select>  <br />
      </FormControl>
      <input style={{ padding: 18.5, marginTop: 8, width: 260, borderColor: 'lightgrey ', borderWidth: 1, borderRadius: 5 }} defaultValue=' ' type='date' name='date' onChange={handleChange} /><br /><br />
      <Button variant="outlined" size="large" type='submit' color="primary" onClick={handleSubmit}>Search</Button>
      <br /><br />
      <Outlet />
    </Container>
  );
}
export default Purchases;