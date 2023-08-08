import React from 'react'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

  const navigate = useNavigate()

  const signInWithGoogle = async ()=>{
   const response = await signInWithPopup(auth, provider);
   console.log(response);
   navigate("/");
  }

  return (
    <div className='flex flex-col justify-center items-center'>
       <p>Sign in with <span className='font-bold'>Google</span></p>
       <button 
       className='bg-green-300 rounded-lg p-1 border-2 border-green-400 active:bg-green-100'
       onClick={signInWithGoogle}
       >Sign in</button>
    </div>
  )
}

export default Login