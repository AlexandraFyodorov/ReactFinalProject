
import Customers from "./Customers";
import { Routes, Route } from 'react-router-dom'
import Menu from "./Menu";
import Products from "./Products";
import Purchases from "./Purchases";
import PurchasesTable from "./PurchasesTable";
import GetFromDBToRedux from "./GetFromDBToRedux";
import BuyProduct from "./BuyProduct";
import EditCustomer from "./EditCustomer";
import EditProduct from "./EditProduct";
function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path='products' element={<Products />} />
        <Route path='customers' element={<Customers />} />
        <Route path='purchases' element={<Purchases />}/>     
        <Route path='purchasesTable' element={<PurchasesTable />} />
        <Route path='buyProduct' element={<BuyProduct />} />
        <Route path='editCustomer' element={<EditCustomer />} />
        <Route path='editProduct' element={<EditProduct/>}/>
      </Routes>
      <GetFromDBToRedux />
    </div>
  );
}

export default App;