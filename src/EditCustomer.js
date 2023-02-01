import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {updateDoc, doc, deleteDoc } from 'firebase/firestore';
import db from './firebase';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function EditCustomer() {
  const location = useLocation()
  const userID = location.state
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);
  const customers = useSelector((state) => state.customers);
  const userFname=customers.filter((customers) => customers.id === userID).map(x=>x.firstName)
  const userLname=customers.filter((customers) => customers.id === userID).map(x=>x.lastName)
  const userCity=customers.filter((customers) => customers.id === userID).map(x=>x.City)
  

  const [userData, setUserData] = useState({ firstName: String(userFname), lastName: String(userLname), City: String(userCity) });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = { firstName: userData.firstName, lastName: userData.lastName, City: userData.City }
    await updateDoc(doc(db, 'Customers', userID), obj);
  }
  const DeleteUser = async () => {
    purchases.filter(purchases=>purchases.CustomerID===userID).map(async (x)=>{
      return(<div key={x.id}>{await deleteDoc(doc(db, 'Purchases', x.id))}</div>)
    })
    await deleteDoc(doc(db, 'Customers', userID))
  }
  

  return (
    <Container>
      <br /><br />
      <h2>Edit Customer</h2>
      


      <form style={{ padding: '2px', margin: '5px', width: '100px' }} onSubmit={handleSubmit}>
        First Name:{' '}
        <input type='text' defaultValue={userFname}  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} required/>
        <br />
        Last Name:{' '}
        <input type='text' defaultValue={userLname} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} required/>
        <br />
        City:{' '}
        <select defaultValue={userCity} onChange={(e) => setUserData({ ...userData, City: e.target.value })} required>
          <option value='Haifa'>Haifa</option>
          <option value='Afula'>Afula</option>
          <option value='Eilat'>Eilat</option>
          <option value='Tel Aviv'>Tel Aviv</option>
          <option value='Ramat Gan'>Ramat Gan</option>
          <option value='Arad'>Arad</option>
          <option value='Hadera'>Hadera</option>
          <option value='Holon'>Holon</option>
          <option value='Ber Sheva'>Ber Sheva</option>
          <option value='Givataim'>Givataim</option>
        </select>
        <br /><br />
        <button type='submit'>Update</button>
        <button onClick={DeleteUser}>Delete</button>
      </form>
      <h2>Purchases List</h2>
      <ul>
        {
          products.map((item) => {
            return (
              <tr key={item.id}>
                {
                  purchases.filter((purchases) => purchases.ProductID === item.id && purchases.CustomerID === userID).map((x) => {
                    return (
                      <tr key={x.id}>
                        <li><Link to={`/editProduct`} state={item.id} >{item.Name}</Link></li>
                      </tr>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </ul>




    </Container>
  );
}

export default EditCustomer;