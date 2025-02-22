import React, { useState } from 'react'

export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log("Form Submitted:", { email, password, isSignUp })
    setIsOpen()  // Just close modal after submitting (no backend call)
  }

  return (
    <>
      <form className='form' onSubmit={handleOnSubmit}>
        
        <div className='form-control'>
          <label>Email</label>
          <input type="email" className='input' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='form-control'>
          <label>Password</label>
          <input type="password" className='input' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit'>{isSignUp ? "Sign Up" : "Login"}</button><br />
        <p onClick={() => setIsSignUp(prev => !prev)} style={{ cursor: 'pointer' }}>
          {isSignUp ? "Already have an account?" : "Create new account"}
        </p>
      </form>
    </>
  )
}
