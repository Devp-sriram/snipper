import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home';
// import Product from './pages/Product';
// import Hero from './pages/Hero';
// import Cart from './pages/Cart';
// import Signin from './pages/Signin';
// import Login from './pages/Login'
// import Admin from './pages/Admin';
// import TableProd from './pages/TableProd'
// import Addproducts from './pages/Addproducts'
// import Orders from './pages/Orders';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route index element={<Hero />} />
            <Route path='/products' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/admin" element={<Admin />}>
              <Route index element={<TableProd/>}/>
              <Route path="/admin/add" element={<Addproducts/>}/>
              <Route path="/admin/orders" element={<Orders/>}/>
            </Route> */}
          </Route>
          {/* <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Dash />} />
          </Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
