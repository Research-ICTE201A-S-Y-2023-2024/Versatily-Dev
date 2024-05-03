import {BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard.jsx'
import OrderPage from './Order/Order.jsx'
import Product from './Product/Product.jsx'
import Table from './Table/Table.jsx'
import Category from './Category/Category.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/order' element={<OrderPage/>}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/workbench' element={<Table/>}/>
          <Route path='/categories' element={<Category/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App