import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/Auth/AuthPage'
import RegPage from './pages/Registration/RegPage'
import AdminDashboard from './pages/Admin/adminpages/AdminDashboard/AdminDashboard'
import AdminDashboardComponent from './pages/Admin/adminpages/AdminDashboard/components/AdminDashboardComponent'
import AdminAccounts from './pages/Admin/adminpages/AdminAccounts/AdminAccounts'
import AdminRoles from './pages/Admin/adminpages/AdminRoles/AdminRoles'
import AdminRolesComponent from './pages/Admin/adminpages/AdminRoles/components/AdminRolesComponent'
import EmailVerificationPage from './pages/VerificationPage/EmailVerificationPage'
import EmailVerifCodePage from './pages/VerificationPage/EmailVerifCodePage'
import EmailVerifSuccessPage from './pages/VerificationPage/EmailVerifSuccessPage'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import RegDashboard from './pages/WelcomePage/RegDashboard'
import AccountOverview from './pages/Admin/adminpages/AccountOverview/AccountOverview'
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
        <Route path="/email/verify-code" element={<EmailVerifCodePage/>}></Route>
        <Route path="/email/verify-success" element={<EmailVerifSuccessPage/>}></Route>
        <Route path="/home/welcome-user" element={<WelcomePage/>}></Route>
        <Route path="/home/role-select" element={<RegDashboard/>}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/admin/dashboard/component" element={<AdminDashboardComponent/>}></Route>
        <Route path="/admin/accounts" element={<AdminAccounts/>}></Route>
        <Route path="/admin/roles" element={<AdminRoles/>}></Route>
        <Route path="/admin/roles/component" element={<AdminRolesComponent/>}></Route>
        <Route path="/overview" element={<AccountOverview/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App