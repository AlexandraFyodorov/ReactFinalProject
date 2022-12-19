import { useSelector } from 'react-redux';



function PurchasesTable() {

  const purchases = useSelector((state) => state.purchases);
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);

  const product = sessionStorage['productId'];
  const customer = sessionStorage['customerId'];
  const date = sessionStorage['date'];

  let customerToShow = customers;
  let productsToShow = products;
  let dateToShow = purchases;

  if (customer) {
    customerToShow = customers.filter((customers) => customers.id === customer)
  }
  if (product) {
    productsToShow = products.filter((products) => products.id === product);
  }
  if (date) {
    dateToShow = purchases.filter((purchases) => purchases.Date === date)
  }




  return (
    <div >

      <h2>Purchases Table</h2>

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
                  <td>{user.firstName}</td>
                  <td>
                    {
                      productsToShow.map((item) => {
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
    </div>
  );
}
export default PurchasesTable;