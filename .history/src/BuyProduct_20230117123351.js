import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation,Link } from 'react-router-dom';
import { updateDoc,doc,collection, addDoc } from 'firebase/firestore';
import db from './firebase';

function BuyProduct() {
  const location = useLocation()
  const userID = location.state
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const [addData, setAddData] = useState({ productId: '', customerId: '', date: new Date().toLocaleDateString('en-CA') });
  let userName="Select customer...";

  if(userID)
  {
    userName=customers.filter((customers) => customers.id === userID).map(x=>x.firstName+' '+x.lastName)
    
  }
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
    <div className="App">
      <br /><br />
      <h2>Store</h2>      
      <form onSubmit={handleSubmit}>
        Customers:
        <select style={{ padding: '2px', margin: '5px'}}  name='customerId' onChange={handleChange} required>
        <option value={userID}>{userName}</option>
          {
            customers.map(customer => {
              return <option value={customer.id} key={customer.id}>{customer.firstName + ' ' + customer.lastName}</option>
            })
          }
        </select>  <br />
        Products:
        <select style={{ padding: '2px', margin: '5px'}} name='productId' onChange={handleChange} required >
          <option value=''>Select product...</option>
          {
            products.filter(products=>products.Quantity>0).map(product => {
              return <option value={product.id} key={product.id}>{product.Name}</option>
            })
          }
        </select>  <br />

        <button type='submit'>BUY</button>
      </form>


    </div>
  );
}

export default BuyProduct;