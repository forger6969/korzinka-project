import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import { AppContext } from './AppContext'
import axios from 'axios'
import CartPage from './Pages/CartPage'
import HeaderLanding from './Components/HeaderLanding'


const App = () => {

  const [user, setUser] = useState("Войти")
  const [userID, setUserID] = useState(null)

  const getUser = async () => {
    try {

      const getUserId = localStorage.getItem(`currentUserID`)

      if (getUserId) {

        const axiosUser = await axios.get(`https://korzinka-server.onrender.com/users/${getUserId}`)
        console.log(getUserId);

        setUser(axiosUser.data.name)
        setUserID(getUserId)
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser()
  }, [])


  return (
    <AppContext.Provider value={{
      userInfo: {
        userID: userID,
        userName: user
      }
    }}>
      <BrowserRouter>

        <HeaderLanding />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>

      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App