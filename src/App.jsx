import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import { AppContext } from './AppContext'
import axios from 'axios'
import CartPage from './Pages/CartPage'
import HeaderLanding from './Components/HeaderLanding'
import ProfilePage from './Pages/ProfilePage'
import ProductDetails from './Pages/ProductDetails'
import NotFoundPage from './Pages/NotFoundPage'


const App = () => {

  const [user, setUser] = useState(null)
  const [userID, setUserID] = useState(null)

  const getUser = async () => {
    try {

      const getUserId = JSON.parse(localStorage.getItem(`currentUserID`))
      console.log(getUserId);

      if (getUserId) {

        const axiosUser = await axios.get(`https://korzinka-server.onrender.com/users/${getUserId}`)
        console.log(axiosUser.data);

        setUser(axiosUser.data)
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
        user: user,
        setUser: setUser
      }
    }}>
      <BrowserRouter>

        <HeaderLanding />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/details/:id' element={<ProductDetails />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>

      

      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App