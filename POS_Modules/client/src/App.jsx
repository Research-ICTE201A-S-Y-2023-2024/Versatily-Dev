import {BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard.jsx'
import OrderPage from './Order/Order.jsx'
import Product from './Product/Product.jsx'
import Table from './Table/Table.jsx'
import Category from './Category/Category.jsx'
import Home from './Home/Home.jsx';
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/order' element={<OrderPage/>}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/products' element={<Product/>}/>
          <Route path='/kiosk' element={<Table/>}/>
          <Route path='/categories' element={<Category/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App