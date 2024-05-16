import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/Auth/AuthPage'
import RegPage from './pages/RegPage/RegPage'
import AdminDashboardComponent from './pages/Admin/components/AdminDashboardComponent'
import AdminAccountsComponent from './pages/Admin/components/AdminAccountsComponent'
import AdminAccountsPage from './pages/Admin/AdminAccountsPage'
import "../node_modules/@flaticon/flaticon-uicons/css/all/all.css"
import './global.css'

function App() {

  useEffect(() =>{
    document.title = `Login`;
  })

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/Register" element={<RegPage />} />
        <Route path="/Admin/Accounts" element={<AdminAccountsPage/>}></Route>
        <Route path="/AdminComponent/AdminDashboard" element={<AdminDashboardComponent />} />
        <Route path='/AdminComponent/AccountsComponent' element={<AdminAccountsComponent/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
