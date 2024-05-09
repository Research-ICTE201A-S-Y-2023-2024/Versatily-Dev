import React from 'react'
import './LoginStyles.css'

const LoginPage = () => {
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginPage