import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from 'redux/store'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from 'components/NavBar/NavBar'

import routes from 'pages/routes'
import { useSelector } from 'react-redux'
import CreateBooking from 'pages/CreateBookingModal'
import FloatingButton from 'components/FloatingButton/FloatingButton'

function App() {
  const dispatch = useAppDispatch()
  const auth = useSelector((state: RootState) => state.auth)
  const [isShowCreateBookingModal, setShowCreateBookingModal] = useState(false)

  useEffect(() => {}, [dispatch])

  function toggleCreateBookingModal() {
    setShowCreateBookingModal((isShow) => !isShow)
  }

  // Only show if user has logged in
  const floatButton = auth.isLoggedIn && (
    <FloatingButton onClick={toggleCreateBookingModal}></FloatingButton>
  )

  const createBookingModal = isShowCreateBookingModal && (
    <CreateBooking onClose={toggleCreateBookingModal} />
  )

  // Only logged in user has access to the protected routes
  function renderRoutes() {
    return routes.map(({ component: Component, path, isRequireAuth }) => {
      // Redirecto to login page is user not logged in
      const protectedRoute = auth.isLoggedIn ? (
        <Component />
      ) : (
        <Navigate to="/login" />
      )

      return (
        <Route
          path={path}
          element={isRequireAuth ? protectedRoute : <Component />}
          key={path}
        />
      )
    })
  }

  return (
    <div id="app">
      <ToastContainer />
      <NavBar />
      {floatButton}
      {createBookingModal}
      <Routes>{renderRoutes()}</Routes>
    </div>
  )
}

export default App
