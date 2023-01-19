import { useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom'

function Customers() {
  const purchases = useSelector((state) => state.purchases);
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  let customerToShow = customers;
  let productsToShow = purchases;
  let dateToShow = purchases

  return (
    <div className="App">
      <br /><br />
      <h2>Customers</h2>
      <table border='1'>
        <tbody>
          <tr style={{ color: 'blue', padding: '10px' }}>
            <td>Customer Name</td>
            <td>List of products</td>
            <td>List of dates</td>
          </tr>
          {
           customerToShow.map((user) => {

            return (
              <tr key={user.id}>
                <td>{user.firstName + " " + user.lastName}</td>
                  <td>
                    {
                      
                      productsToShow.filter(productsToShow=>productsToShow.CustomerID===user.id).map((item) => {
                        return (
                          <div key={item.id}>
                            {
                              <div>{
                                products.filter(products => products.id === item.ProductID).map(x => {
                                  return <div key={x.id}>
                                    {x.Name}
                                  </div>
                                })
                              }</div>
                            }
                          </div>
                        )
                      })
                    }
                  </td>
                  <td>
                    {
                      dateToShow.filter(dateToShow=>dateToShow.CustomerID===user.id).map((x) => {
                        return (
                          <div key={x.id}>
                            <div>{x.Date}</div>
                          </div>
                        )
                      })
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <br /><br />
      <button onClick={()=>navigate(`/buyProduct`)}>Buy Product</button>
    </div>
  );
}

export default Customers;