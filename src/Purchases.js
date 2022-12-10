import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate} from 'react-router-dom'

function Purchases() {

  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const navigate = useNavigate();
  const [data, setData] = useState({ productId: '', customerId: '', date: '' });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    sessionStorage['productId']=data.productId;
    sessionStorage['customerId']=data.customerId;
    sessionStorage['date']=data.date;
    navigate(`/purchasesTable`);
  }


  return (
    <div >
      <br /><br />
      <h2>Purchases</h2>
      <form onSubmit={handleSubmit}>
        Products:
        <select style={{ padding: '2px', margin: '5px', width: '100px' }} defaultValue='' name='productId' onChange={handleChange}>
        <option value=""></option>
          {
            products.map(product => {
              return <option value={product.id} key={product.id}>{product.Name}</option>
            })
          }
        </select>  <br />
        Customers:
        <select style={{ padding: '2px', margin: '5px', width: '100px' }} defaultValue='' name='customerId' onChange={handleChange}>
        <option value=""></option>
          {
            customers.map(customer => {
              return <option value={customer.id} key={customer.id}>{customer.firstName + ' ' + customer.lastName}</option>
            })
          }
        </select>  <br />
        Date:
        <input style={{ padding: '2px', margin: '5px', width: '100px' }} defaultValue=' ' type='date' name='date' onChange={handleChange} /><br /><br />
        <button type='submit'>Search</button>
      </form>
      <br /><br />
      <Outlet/>
    </div>
    
  );
}

export default Purchases;