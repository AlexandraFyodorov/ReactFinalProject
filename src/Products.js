import {useState, useEffect} from 'react';
import {collection, doc, onSnapshot, query, QuerySnapshot} from 'firebase/firestore';
import db from './firebase';
import Product from './Product';


function Products() {
  const [products, setProducts]=useState([]);

  useEffect(()=>{
    const q = query(collection(db,'Products'));
    onSnapshot(q,(QuerySnapshot)=>{
      setProducts(
        QuerySnapshot.docs.map((doc)=>{
          return{
            id:doc.id,
            ...doc.data(),
          };
        })
      );
    });
  },[])
  

  return (
    <div className="App">
      <br/><br/><br/>
      <h2>Products</h2>
      Total Amount of purchased products: {0}
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
