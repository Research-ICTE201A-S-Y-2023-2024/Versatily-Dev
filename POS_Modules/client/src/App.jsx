import {BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard.jsx'
import OrderPage from './Order/Order.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/order' element={<OrderPage/>}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App