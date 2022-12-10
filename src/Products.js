import { useSelector } from 'react-redux';
import Product from './Product';

function Products() {
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);
  

 
 

  return (
    <div className="App">
      <br/><br/><br/>
      <h2>Products</h2>
      Total Amount of purchased products: {purchases.length}
      <br/>
      <ul>
          {products.map((item)=>{
            return <Product key={item.id} product={item}/>
          })
          }
        
      </ul>
      

    
    </div>
  );
}

export default Products;
