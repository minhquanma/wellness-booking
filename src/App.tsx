import { useState, useCallback } from 'react'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Routes, Route, Navigate } from 'react-router-dom'

import routes from 'pages/routes'
import NavBar from 'components/NavBar/NavBar'
import CreateBooking from 'pages/CreateBookingModal/CreateBookingModal'
import FloatingButton from 'components/FloatingButton/FloatingButton'

function App() {
  const auth = useSelector((state: RootState) => state.auth)
  const [isShowCreateBookingModal, setShowCreateBookingModal] = useState(false)

  // Memoize this function to prevent unnecessary re-render of the child component
  const toggleCreateBookingModal =  useCallback(() => {
    setShowCreateBookingModal((isShow) => !isShow)
  }, []);

  // Only show if user has logged in
  const floatingButton = auth.isLoggedIn && (
    <FloatingButton onClick={toggleCreateBookingModal}></FloatingButton>
  )

  const createBookingModal = isShowCreateBookingModal && (
    <CreateBooking onClose={toggleCreateBookingModal} />
  )

  // Only logged in user has access to the protected routes
  const routeComponents = routes.map(({ component: Component, path, isRequireAuth }) => {
      // Redirect to to login page is user not logged in
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
  

  return (
    <div id="app">
      <ToastContainer />
      <NavBar />
      {floatingButton}
      {createBookingModal}
      <Routes>{routeComponents}</Routes>
    </div>
  )
}

export default App
