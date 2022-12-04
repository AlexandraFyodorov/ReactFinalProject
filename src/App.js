import Customers from "./Customers";
import {Routes,Route} from 'react-router-dom'
import Menu from "./Menu";
import Products from "./Products";
import Purchases from "./Purchases";
function App() {
  return (
    <div className="App">
      <Menu/>
      <Routes>
        <Route path='products' element={<Products/>}/>
        <Route path='customers' element={<Customers/>}/>
        <Route path='purchases' element={<Purchases/>}/>
      </Routes>
    </div>
  );
}

export default App;
