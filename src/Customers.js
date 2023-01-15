import { useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom'

function Customers() {
  const purchases = useSelector((state) => state.purchases);
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();

  return (
    <div className="App">
      <br /><br />
      <h2>Customers</h2>
      <table border='1'>
        <tbody>
          <th style={{ color: 'green', padding: '10px' }}>Customer Name</th>
          <th style={{ color: 'green', padding: '10px' }}>List of products</th>
          <th style={{ color: 'green', padding: '10px' }}>List of dates</th>
          {
          customers.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>
                  {
                    products.map((item) => {
                      return (
                        <tr key={item.id}>
                          {
                            purchases.filter((purchases) => purchases.ProductID === item.id && purchases.CustomerID === user.id).map((x) => {
                              return (
                                <tr key={x.id}>
                                  <li>{item.Name}</li>
                                </tr>
                              )
                            })
                          }
                        </tr>
                      )
                    })
                  }
                </td>
                <td>
                  {
                    purchases.filter((purchases) => purchases.CustomerID === user.id).map((x) => {
                      return (
                        <tr key={x.id}>
                          <li>{x.Date}</li>
                        </tr>
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