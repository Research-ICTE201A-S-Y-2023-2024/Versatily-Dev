import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/Auth/AuthPage'
import RegPage from './pages/Registration/RegPage'
import EmailVerificationPage from './pages/EmailVerification/EmailVerificationPage'
import AdminDashboard from './pages/Admin/adminpages/AdminDashboard/AdminDashboard'
import AdminDashboardComponent from './pages/Admin/adminpages/AdminDashboard/components/AdminDashboardComponent'
import AdminAccounts from './pages/Admin/adminpages/AdminAccounts/AdminAccounts'
import AdminRoles from './pages/Admin/adminpages/AdminRoles/AdminRoles'
import AdminRolesComponent from './pages/Admin/adminpages/AdminRoles/components/AdminRolesComponent'
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
        <Route path="/register" element={<RegPage />} />
        <Route path="/email/send-code" element={<EmailVerificationPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/admin/dashboard/component" element={<AdminDashboardComponent/>}></Route>
        <Route path="/admin/accounts" element={<AdminAccounts/>}></Route>
        <Route path="/admin/roles" element={<AdminRoles/>}></Route>
        <Route path="/admin/roles/component" element={<AdminRolesComponent/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App