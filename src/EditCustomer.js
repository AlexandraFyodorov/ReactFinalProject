import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import db from './firebase';
import { async } from '@firebase/util';

function EditCustomer() {
  const location = useLocation()
  const userID = location.state
  const products = useSelector((state) => state.products);
  //const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  const [userData, setUserData] = useState({ firstName: '', lastName: '', City: '' });
  //let UserFirstName = customers.filter((customers) => customers.id === userID).map((x)=>{return<div key={x.id}>{x.firstName}</div>})
  //let UserLastName = customers.filter((customers) => customers.id === userID).map((x)=>{return<div key={x.id}>{x.lastName}</div>})
  //let UserCity = customers.filter((customers) => customers.id === userID).map((x)=>{return<div key={x.id}>{x.City}</div>})


  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = { firstName: userData.firstName, lastName: userData.lastName, City: userData.City }
    await updateDoc(doc(db, 'Customers', userID), obj);
  }
  const DeleteUser = async () => {
    await deleteDoc(doc(db, 'Customers', userID))
  }

  return (
    <div className="App">
      <br /><br />
      <h2>Edit Customer</h2>
      <form style={{ padding: '2px', margin: '5px', width: '100px' }} onSubmit={handleSubmit}>
        First Name:{' '}
        <input type='text' value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
        <br />
        Last Name:{' '}
        <input type='text' value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
        <br />
        City:{' '}
        <select onChange={(e) => setUserData({ ...userData, City: e.target.value })}>
          <option value='' >Choose a City</option>
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




    </div>
  );
}

export default EditCustomer;