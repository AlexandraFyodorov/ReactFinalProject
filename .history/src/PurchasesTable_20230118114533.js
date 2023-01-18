import { useSelector } from 'react-redux';



function PurchasesTable() {

  const purchases = useSelector((state) => state.purchases);
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);

  const product = sessionStorage['productId']; //ID
  const customer = sessionStorage['customerId']; //ID
  const date = sessionStorage['date']; //Date

  let customerToShow = customers
  let productsToShow = purchases;
  let dateToShow = purchases
debugger
  if (customer) {
    //customerToShow = purchases.find((element) => {return element.CustomerID === customer})
    customerToShow = purchases.filter((purchases) => purchases.CustomerID === customer)
    customerToShow=customerToShow[0];
    console.log(customerToShow)
    productsToShow = purchases.filter((purchases) => purchases.CustomerID === customer)
    dateToShow = purchases.filter((purchases) => purchases.CustomerID === customer)
    if (product) {
      productsToShow = purchases.filter((purchases) => purchases.CustomerID === customer && purchases.ProductID === product)
      dateToShow = productsToShow
    }

    if (date) {
      dateToShow = purchases.filter((purchases) => purchases.CustomerID === customer && purchases.Date === date)
      productsToShow = purchases.filter((purchases) => purchases.CustomerID === customer && purchases.Date === date)
    }
  }
  else if (product) {
    
    productsToShow = purchases.filter((purchases) => purchases.ProductID === product)
    dateToShow = productsToShow
    if(date)
    {
      dateToShow = purchases.filter((purchases) => purchases.ProductID === product && purchases.Date === date)
    }
  }
  else if (date) {
    dateToShow = purchases.filter((purchases) =>  purchases.Date === date)
    productsToShow = purchases.filter((purchases) =>  purchases.Date === date)
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
                  <td>{
                   customers.filter(customers => customers.id === user.CustomerID).map(x => {
                    return <div key={x.id}>
                      {x.firstName+" "+x.lastName}
                    </div>
                  })
                  }</td>
                  <td>
                    {
                      
                      productsToShow.filter(productsToShow=>productsToShow.CustomerID===user.CustomerID).map((item) => {
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
                      dateToShow.filter(dateToShow=>dateToShow.CustomerID===user.CustomerID).map((x) => {
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
    </div>
  );
}
export default PurchasesTable;