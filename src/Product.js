import { useSelector } from 'react-redux';
import { Link , useNavigate } from 'react-router-dom'

function Product({ product }) {
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  const navigate = useNavigate();


  return (
    <div style={{ border: '3px solid green', width: '250px', padding: '10px', margin: '10px'}}>
      <h2>Product data</h2>
      Product name:{' '}<Link to={`/editProduct`} state={product.id}>{product.Name}</Link>
      <br /><br />
      Price:{' '}{product.Price}{' '}NIS<br /><br />
      Quantity:{' '}{product.Quantity}<br /><br />
      <div style={{ border: '3px solid green', width: '200px', padding: '10px', margin: '10px'}}>
      <h3>Customers</h3>
        {
          customers.map((user) => {
            return (
              <div key={user.id}>
                {
                  purchases.filter((purchases) => purchases.CustomerID === user.id && purchases.ProductID === product.id).map((item) => {
                    return (
                      <div key={item.id}> <Link to={`/editCustomer`} state={user.id} >{user.firstName}</Link>
                        <div>Purchased date:{' '}{item.Date}</div>
                        <button onClick={()=>navigate(`/buyProduct`,{userID: user.id})} >ADD</button>
                      </div>
                      
                    ) 
                  })
                }    
              </div>
            )
          })
        }
        
        

    </div>
    </div>
  );
}

export default Product;