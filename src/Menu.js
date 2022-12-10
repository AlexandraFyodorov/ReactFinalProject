import {Link} from 'react-router-dom'
function Menu() {
  return (
    <div className="App">
      <h1 style={{merging:'50px', paddingLeft:'215px'}}>Menu</h1>
      <strong style={{merging:'50px', padding:'50px'}}><Link to={`/products`}>Products</Link>{' '}</strong>
      <strong style={{merging:'50px', padding:'50px'}}><Link to={`/purchases`}>Purchases</Link>{' '}</strong>
      <strong style={{merging:'50px', padding:'50px'}}><Link to={`/customers`}>Customers</Link>{' '}</strong>
    </div>
  );
}

export default Menu;