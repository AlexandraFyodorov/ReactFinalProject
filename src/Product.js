import {useState, useEffect} from 'react';
import {collection, doc, onSnapshot, query, QuerySnapshot} from 'firebase/firestore';
import db from './firebase';
import {Link} from 'react-router-dom'

function Product({product}) {

  

  return (
    <div style={{border: '3px solid green', width: '250px',  padding: '10px', margin: '10px', textAlign: 'center'}}>
     Product name:{' '}<Link to={`/editProduct`}>{product.Name}</Link>
     <br/><br/>
     Price:{' '}{product.Price}{' '}NIS<br/><br/>
     Quantity:{' '}{product.Quantity}<br/><br/>
    <h2>Customers</h2>

    </div>
  );
}

export default Product;
