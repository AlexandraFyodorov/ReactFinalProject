import { useSelector } from 'react-redux';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';

function PurchasesTable() {
  const purchases = useSelector((state) => state.purchases);
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const product = sessionStorage['productId']; //ID
  const customer = sessionStorage['customerId']; //ID
  const date = sessionStorage['date']; //Date
  let customerToShow = [];
  let productsToShow = purchases;
  let dateToShow = purchases

  if (customer) {
    customerToShow = customers.filter((customers) => customers.id === customer)
    productsToShow = purchases.filter((purchases) => purchases.CustomerID === customer)
    dateToShow = purchases.filter((purchases) => purchases.CustomerID === customer)
    if (product) {
      productsToShow = purchases.filter((purchases) => purchases.CustomerID === customer && purchases.ProductID === product)
      dateToShow = productsToShow
    }
    if (date) {
      dateToShow = purchases.filter((purchases) => purchases.CustomerID === customer && purchases.Date === date)
      productsToShow = purchases.filter((purchases) => purchases.CustomerID === customer && purchases.Date === date)
    }
  }
  else if (product) {
    productsToShow = purchases.filter((purchases) => purchases.ProductID === product)
    dateToShow = productsToShow
    if (date) {
      dateToShow = purchases.filter((purchases) => purchases.ProductID === product && purchases.Date === date)
      productsToShow = dateToShow;
    }
    productsToShow.forEach(data => {
      const firstEl = customers.filter(customers => customers.id === data.CustomerID)
      customerToShow.push(firstEl[0])
    })
    let myArrSerialized = customerToShow.map(e => JSON.stringify(e));
    const mySetSerialized = new Set(myArrSerialized);
    const myUniqueArrSerialized = [...mySetSerialized];
    customerToShow = myUniqueArrSerialized.map(e => JSON.parse(e))
  }
  else if (date) {
    dateToShow = purchases.filter((purchases) => purchases.Date === date)
    productsToShow = dateToShow
    productsToShow.forEach(data => {
      const firstEl = customers.filter(customers => customers.id === data.CustomerID)
      customerToShow.push(firstEl[0])
    })
    let myArrSerialized = customerToShow.map(e => JSON.stringify(e));
    const mySetSerialized = new Set(myArrSerialized);
    const myUniqueArrSerialized = [...mySetSerialized];
    customerToShow = myUniqueArrSerialized.map(e => JSON.parse(e))
  }
  else {
    customerToShow = customers
  }

  return (
    <Container>
      <br /><br />
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow bgcolor="#5D7B9D" >
              <TableCell><font color="#fff">Customer Name</font></TableCell>
              <TableCell><font color="#fff">Products</font></TableCell>
              <TableCell><font color="#fff">Date of purchases</font></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customerToShow.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                    <TableCell>
                      {
                        productsToShow.filter(productsToShow => productsToShow.CustomerID === user.id).map((item) => {
                          return (
                            products.filter(products => products.id === item.ProductID).map(x => {
                              return <div key={x.id}>
                                <TableCell>{x.Name}</TableCell>
                              </div>
                            })
                          )
                        })
                      }
                    </TableCell>
                    <TableCell>
                      {
                        dateToShow.filter(dateToShow => dateToShow.CustomerID === user.id).map((x) => {
                          return (
                            <TableRow key={x.id}>
                              <TableCell>{x.Date}</TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <br /><br />
    </Container>
  );
}
export default PurchasesTable;