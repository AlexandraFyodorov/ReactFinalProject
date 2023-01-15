import { useSelector } from 'react-redux';
import { Link  } from 'react-router-dom'

function Product({ product }) {
  const customers = useSelector((state) => state.customers);
  const purchases = useSelector((state) => state.purchases);
  let quantity = product.Quantity;
  if(quantity===0)
  {
    quantity='Out of stock'
  }



  return (
    <div style={{ border: '3px solid green', width: '250px', padding: '10px', margin: '10px'}}>
      <h2>Product data</h2>
      Product name:{' '}<Link to={`/editProduct`} state={product.id}>{product.Name}</Link>
      <br /><br />
      Price:{' '}{product.Price}{' '}NIS<br /><br />
      Quantity:{' '}{quantity}<br /><br />
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
                        <Link to={`/buyProduct`} state={user.id} >
                        <button>ADD</button>
                        </Link>
                        
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