import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import db from './firebase';
import { Container } from '@mui/system';
import { Button, ListItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
const style = {
  maxWidth: 360,
  bgcolor: '#fafafa',
  padding: 2
};
function EditCustomer() {
  const location = useLocation()
  const userID = location.state
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);
  const customers = useSelector((state) => state.customers);
  const userFname = customers.filter((customers) => customers.id === userID).map(x => x.firstName)
  const userLname = customers.filter((customers) => customers.id === userID).map(x => x.lastName)
  const userCity = customers.filter((customers) => customers.id === userID).map(x => x.City)
  const [userData, setUserData] = useState({ firstName: String(userFname), lastName: String(userLname), City: String(userCity) });

  let productToShow = [];

  let purchasesToShow = purchases.filter(purchases => purchases.CustomerID === userID)
  purchasesToShow.forEach(data => {
    const firstEl = products.filter(products => products.id === data.ProductID)
    productToShow.push(firstEl[0])
  })
  let myArrSerialized = productToShow.map(e => JSON.stringify(e));
  const mySetSerialized = new Set(myArrSerialized);
  const myUniqueArrSerialized = [...mySetSerialized];
  productToShow = myUniqueArrSerialized.map(e => JSON.parse(e))
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = { firstName: userData.firstName, lastName: userData.lastName, City: userData.City }
    await updateDoc(doc(db, 'Customers', userID), obj);
  }
  const DeleteUser = async () => {
    purchases.filter(purchases => purchases.CustomerID === userID).map(async (x) => {
      return (<div key={x.id}>{await deleteDoc(doc(db, 'Purchases', x.id))}</div>)
    })
    await deleteDoc(doc(db, 'Customers', userID))
  }
  return (
    <Container>
      <br /><br />
      <Paper sx={{ width: 1110 }} style={{ padding: 0.5, textAlign: "center", margin: 10 }} elevation={3}><h3>Edit Customer</h3></Paper>
      <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, }} noValidate autoComplete="off">
        <TextField required label=" First Name" id="outlined-first-name" defaultValue={userFname} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} required />
        <TextField required label="Last Name" id="outlined-last-name" defaultValue={userLname} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} required />
        <FormControl required sx={{ m: 1, width: 300, }}>
          <InputLabel id="demo-simple-select-required-label" >City</InputLabel>
          <Select labelId="demo-simple-select-required-label" id="demo-simple-select-required-label"
            defaultValue={userCity} name='cityid' onChange={(e) => setUserData({ ...userData, City: e.target.value })} required input={<OutlinedInput label="City" />}>
            <MenuItem value='Haifa'>Haifa</MenuItem>
            <MenuItem value='Afula'>Afula</MenuItem>
            <MenuItem value='Eilat'>Eilat</MenuItem>
            <MenuItem value='Tel Aviv'>Tel Aviv</MenuItem>
            <MenuItem value='Ramat Gan'>Ramat Gan</MenuItem>
            <MenuItem value='Hadera'>Hadera</MenuItem>
            <MenuItem value='Holon'>Holon</MenuItem>
            <MenuItem value='Ber Sheva'>Ber Sheva</MenuItem>
            <MenuItem value='Givataim'>Givataim</MenuItem>
          </Select>  <br />
        </FormControl>
        <Button sx={{ m: 1, padding: 1, margin: 2, marginLeft: 10 }} variant="outlined" size="small" type='submit' color="primary" onClick={handleSubmit}>Update</Button>
        <Button sx={{ m: 1, padding: 1 }} variant="outlined" size="small" color="primary" onClick={DeleteUser}>Delete</Button>
      </Box>
      <Typography variant='h6'>Purchases List</Typography>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {
          productToShow.map((item) => {
            return (
              <ListItem divider key={`item-${item.id}-${item}`}>
                <ListItemText primary={<Link to={`/editProduct`} state={item.id} >{item.Name}</Link>} />
              </ListItem>
            )
          })
        }
      </List>
    </Container>
  );
}
export default EditCustomer;