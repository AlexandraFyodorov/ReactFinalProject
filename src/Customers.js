import {useState, useEffect} from 'react';
import {collection, doc, onSnapshot, query, QuerySnapshot} from 'firebase/firestore';
import db from './firebase';
function Customers() {
  const [customers, setCustomers]=useState([]);
  

  useEffect(()=>{
    //Customers
    const q = query(collection(db,'Customers'));
    onSnapshot(q,(QuerySnapshot)=>{
      setCustomers(
        QuerySnapshot.docs.map((doc)=>{
          return{
            id:doc.id,
            ...doc.data(),
          };
        })
      );
    });
  },[]);
  

  return (
    <div className="App">
      <br/><br/><br/>
      <h2>Customers</h2>

      <table border='1'>
        <tbody>
          <th style={{color:'green', padding:'10px'}}>Customer Name</th>
          <th style={{color:'green', padding:'10px'}}>List of products</th>
          <th style={{color:'green', padding:'10px'}}>List of dates</th>
          {customers.map((user)=>{
            return (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>
                  <li>hello</li>
                  <li>hello</li>
                </td>
                <td>
                  <li>1.12.2022</li>
                  <li>3.12.2022</li>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      <br/><br/>
      <button>Buy Product</button>
    </div>
  );
}

export default Customers;
