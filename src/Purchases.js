import {useState, useEffect} from 'react';
import {collection, doc, onSnapshot, query, QuerySnapshot} from 'firebase/firestore';
import db from './firebase';
function Purchases() {
  const [purchases, setPurchases]=useState([]);
  const [productById,setProductById]=useState([]);

  useEffect(()=>{
    const q = query(collection(db,'Purchases'));
    onSnapshot(q,(QuerySnapshot)=>{
      setPurchases(
        QuerySnapshot.docs.map((doc)=>{
          return{
            id:doc.id,
            ...doc.data(),
          };
        })
      );
    });

    //products by id
    purchases.map((x)=>{
      return{
        
      }
    })
    const p=query(doc(db,'Products','M9xzJO1zrvhJ8GfSD3lm'));
    onSnapshot(p,(doc)=>{
      setProductById({
        id:doc.id, ...doc.data()
      });
    });
  },[]);



  return (
    <div className="App">
      <br/><br/><br/>
      <h2>Purchases</h2>
      {productById.Name}
    
    </div>
  );
}

export default Purchases;
