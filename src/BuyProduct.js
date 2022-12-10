import { useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';
import db from './firebase';

function BuyProduct() {

  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const [addData, setAddData] = useState({ productId: '', customerId: '', date: new Date().toLocaleDateString('en-CA') });
  

  const handleChange = (e) => {
    let { name, value } = e.target;
    setAddData({ ...addData, [name]: value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
   
      await addDoc(collection(db, 'Purchases'),  { CustomerID: addData.customerId, Date: addData.date, ProductID: addData.productId });
   
    
    
  }

  return (
    <div className="App">
      <br /><br />
      <h2>Store</h2>
      
      <form onSubmit={handleSubmit}>
        Products:
        <select style={{ padding: '2px', margin: '5px', width: '100px' }} name='productId' onChange={handleChange} required >
        <option value=''>Select..</option>
          {
            products.map(product => {
              return <option value={product.id} key={product.id}>{product.Name}</option>
            })
          }
        </select>  <br />
        Customers:
        <select style={{ padding: '2px', margin: '5px', width: '100px' }} name='customerId' onChange={handleChange} required>
        <option value=''>Select..</option>
          {
            customers.map(customer => {
              return <option value={customer.id} key={customer.id}>{customer.firstName + ' ' + customer.lastName}</option>
            })
          }
        </select>  <br />
        <button type='submit'>BUY</button>
      </form>


    </div>
  );
}

export default BuyProduct;