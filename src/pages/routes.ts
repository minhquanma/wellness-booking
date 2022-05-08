import Bookings from './Bookings/Bookings';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';

const routes = [
  {
    path: '/',
    component: Dashboard,
    isRequireAuth: true
  },
  {
    path: '/bookings/*',
    component: Bookings,
    isRequireAuth: true
  },
  {
    path: '/login',
    component: Login,
    isRequireAuth: false
  },
]

export default routes;