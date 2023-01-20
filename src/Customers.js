import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Container } from '@mui/system';

function Customers() {
  const purchases = useSelector((state) => state.purchases);
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  let customerToShow = customers;
  let productsToShow = purchases;
  let dateToShow = purchases

  return (
    <Container>
      
      <br /><br />
      <Button variant="outlined" size="large" onClick={() => navigate(`/buyProduct`)}>Buy Product</Button><br/><br/>
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
export default Customers;