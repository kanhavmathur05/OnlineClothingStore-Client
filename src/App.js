import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminPanel from './components/AdminPanel';
import CartProducts from './components/CartProducts';
import OrderHistory from './components/OrderHistory';
import AddProduct from './components/AddProduct';
import AllAdminProducts from './components/AllAdminProducts';
import Usermanagement from './components/Usermanagement';
import SuccessOrderPlaced from './components/SuccessOrderPlaced';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
      <Route path="/" exact component={ProductListing}/>
      {/* <Route path="/orders/:userId" exact component={OrderHistory}/> */}
      <Route path="/orders" exact component={OrderHistory}/>
      <Route path="/product/:productId" exact component={ProductDetail}/>
      <Route path="/adminpanel/addproduct" exact component={AddProduct}/>
      <Route path="/signin" exact component={SignIn}/>
      <Route path="/signup" exact component={SignUp}/>
      <Route path="/adminpanel" exact component={AdminPanel}/>
      {/* <Route path="/cart/:userId" exact component={CartProducts}/> */}
      <Route path="/cart" exact component={CartProducts}/>
      <Route path="/adminpanel/allproducts" exact component={AllAdminProducts}/>
      <Route path="/adminpanel/usermanagement" exact component={Usermanagement} />
      
      <Route path="/ordersuccess" exact component={SuccessOrderPlaced} />
      </Switch>
    </Router>

  );
}

export default App;
