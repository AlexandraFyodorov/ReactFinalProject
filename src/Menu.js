import { AppBar, Button, IconButton, Toolbar, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom'

import Typography from '@mui/material/Typography';
function Menu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='default'>
        <Toolbar>
          <IconButton size="small" edge="start" color="inherit" aria-label="menu" sx={{ mr: 70 }} disabled >
            <h2>Menu</h2>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.1, borderColor: 'divider' }}>
            <Button><Link to={`/products`}>Products</Link></Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.1, borderColor: 'divider' }}>
            <Button><Link to={`/purchases`}>Purchases</Link></Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.1, borderColor: 'divider' }}>
            <Button><Link to={`/customers`}>Customers</Link></Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Menu;