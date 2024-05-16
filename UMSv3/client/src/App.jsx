import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/Auth/AuthPage'
import RegPage from './pages/RegPage/RegPage'
import AdminAccountsPage from './pages/Admin/AdminAccountsPage'
import EmailVerificationPage from './pages/VerificationPage/EmailVerificationPage'
import EmailVerifCodePage from './pages/VerificationPage/EmailVerifCodePage'
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
        <Route path="/admin/accounts" element={<AdminAccountsPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
