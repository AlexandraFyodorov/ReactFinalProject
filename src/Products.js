import { useSelector } from 'react-redux';
import Product from './Product';
import { Container } from '@mui/system';
import Paper from '@mui/material/Paper';
function Products() {
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);
  return (
    <Container>
      <br /><br />
      <Paper sx={{ width: 500 }} style={{ padding: 0.5, textAlign: "center", }} elevation={3}><h4>Total Amount of purchased products: {purchases.length}</h4></Paper>
      <br />
      <ul>
        {products.map((item) => {
          return <Product key={item.id} product={item} />
        })
        }
      </ul>
    </Container>
  );
}

export default Products;
