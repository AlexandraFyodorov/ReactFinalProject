import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {collection,onSnapshot, query} from 'firebase/firestore';
import db from './firebase';

function GetFromDBToRedux() {
  const dispatch = useDispatch();

  useEffect(() => {
    //Get all Purchases
    const PurchasesData = async () => {
      const q = query(collection(db, 'Purchases'));
      onSnapshot(q, (querySnapshot) => {
        const purchases = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: 'LOADPURCHASES', payload: purchases });
      });
    };
    PurchasesData();

    //Get all Customers
    const CustomersData = async () => {
      const q = query(collection(db, 'Customers'));
      onSnapshot(q, (querySnapshot) => {
        const customers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: 'LOADCUSTOMERS', payload: customers });
      });
    };
    CustomersData();

    const ProductsData = async () => {
      const q = query(collection(db, 'Products'));
      onSnapshot(q, (querySnapshot) => {
        const products= querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: 'LOADPRODUCTS', payload: products });
      });
    };
    ProductsData();
  }, []);

 
 


  return (
    <div>
      
    </div>
  );
}

export default GetFromDBToRedux;