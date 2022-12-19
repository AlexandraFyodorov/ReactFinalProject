import { useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateDoc,doc, deleteDoc } from 'firebase/firestore';
import db from './firebase';


function EditProduct() {
  const location = useLocation()
  const productID = location.state
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  let productName=products.filter((products) => products.id === productID).map(x=>x.Name)
  let productPrice=products.filter((products) => products.id === productID).map(x=>x.Price)
  let productQuantity=products.filter((products) => products.id === productID).map(x=>x.Quantity)
  const [productData, setProductData] = useState({Name: '', Price: 0, Quantity:0 });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = { Name: productData.Name, Price: productData.Price, Quantity: productData.Quantity }
    await updateDoc(doc(db, 'Products', productID), obj);
  }
 const DeleteProduct=async()=>{
  purchases.filter(purchases=>purchases.ProductID===productID).map(async (x)=>{
    return(<div key={x.id}>{await deleteDoc(doc(db, 'Purchases', x.id))}</div>)
  })
  
  await deleteDoc(doc(db, 'Products', productID))
  
  
  
 }

  return (
    <div className="App">
      <br /><br />
      <h2>Edit Product</h2>
 
      <form style={{ padding: '2px', margin: '5px', width: '200px' }} onSubmit={handleSubmit}>
        Product Name:{' '}
        <input type='text' defaultValue={productName} onChange={(e) => setProductData({ ...productData, Name: e.target.value })} />
        <br />
        Price:{' '}
        <input type='number' defaultValue={productPrice} onChange={(e) => setProductData({ ...productData, Price: e.target.value })} />
        <br />
        Quantity:{' '}
        <input type='number' defaultValue={productQuantity} onChange={(e) => setProductData({ ...productData, Quantity: e.target.value })} />
        <br />
       
        <br /><br />
        <button type='submit'>Update</button><br /><br />
        <button onClick={DeleteProduct}>Delete</button>
      </form>
      
      <h2>Customers List</h2>
      <ul>
        {
          customers.map((user) => {
            return (
              <tr key={user.id}>
                {
                  purchases.filter((purchases) => purchases.ProductID === productID && purchases.CustomerID === user.id).map((x) => {
                    return (
                      <tr key={x.id}>
                        <li><Link to={`/editCustomer`} state={user.id} >{user.firstName}</Link></li>
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

export default EditProduct;