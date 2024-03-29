import { logOut } from 'features/auth/auth-slice'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { RootState } from 'redux/store'


type NavBarProps = {}

const navs = [
  {
    path: '/',
    name: 'Dashboard',
  },
  {
    path: '/bookings',
    name: 'Bookings',
  },
]
const NavBar = (props: NavBarProps) => {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(logOut())
  }

  function renderNavLinks() {
    return navs.map((nav) => (
      <NavLink
        key={nav.path}
        end
        to={nav.path}
        className={({ isActive }) => {
          return (
            'py-4 px-2 text-gray-500 font-semibold ' +
            (isActive
              ? 'border-b-4 border-indigo-500 text-indigo-500'
              : 'hover:text-indigo-500 hover:text-indigo-500 transition duration-300')
          )
        }}
      >
        {nav.name}
      </NavLink>
    ))
  }
  function renderUserSection() {
    return (
      <div className="hidden md:flex items-center space-x-3 ">
        {auth.isLoggedIn && (
          <>
            <p className="font-medium text-gray-500">{auth.user.username}</p>
            <button
              className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-indigo-500 hover:text-white transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
        {!auth.isLoggedIn && (
          <Link
            to="/login"
            className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-indigo-500 hover:text-white transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    )
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <img
                  src="/fullerton-logo.png"
                  alt="Logo"
                  className="h-8 mr-2"
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {renderNavLinks()}
            </div>
          </div>

          {renderUserSection()}

          {/* <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-indigo-500 "
                x-show="!showMenu"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div> */}
        </div>
      </div>

      <div className="hidden mobile-menu">
        <ul className="">
          <li className="active">
            <a
              href="index.html"
              className="block text-sm px-2 py-4 text-white bg-indigo-500 font-semibold"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="block text-sm px-2 py-4 hover:bg-indigo-500 transition duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block text-sm px-2 py-4 hover:bg-indigo-500 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block text-sm px-2 py-4 hover:bg-indigo-500 transition duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
