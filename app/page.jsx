'use client'

import { useEffect, useState } from "react"
import {client,account,ID} from './appwrite'
export default function Home() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true)
  useEffect(()=>{
      async function getUser(){
        setUser(await account.get())
        setLoadingUser(false)
      }
      getUser();   
  },[])

  async function handleLogin(){
    try{
      await account.createEmailPasswordSession(email,password);
      setUser(await account.get())
      setEmail('');
      setPassword('');
    }catch(e){
      console.error(e);
    }
  }

  async function handleRegister(){
    try{
      await account.create(ID.unique(),email,password);
      await handleLogin()
    }catch(e){
      console.error(e);
    }
  }

  async function  handleLogout() {
    try{
      account.deleteSession('current')
      setUser(null)
    }catch(e){
      console.error(e)
    }
  }

  if(loadingUser){
    return (<div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Loading User...
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Please wait while we load your account details. This might take a few seconds.
        </p>
        <div className="mt-6 flex justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-500 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l-2.586-2.586L0 16l4 4 4-4-1.414-1.414L6 17.293z"></path>
          </svg>
        </div>
      </div>
    </div>
    )
  }

  if (user){
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-sm">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
      You are already logged in
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
      It seems you're already logged into your account. Feel free to navigate around or log out if you want to switch users.
      </p>
      <button
      className="mt-6 w-full p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-300"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
</div>

    )
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
      Login or SignUp
    </h1>
    <form className="flex flex-col space-y-4 w-full max-w-sm">
      <input
        type="email"
        placeholder="Your email"
        className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your password"
        className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between space-x-4">
        <button
          type="button"
          className="w-full p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-300"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          type="button"
          className="w-full p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition duration-300"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </form>
  </main>
  
  )
}
