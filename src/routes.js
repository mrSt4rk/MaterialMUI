/* eslint-disable react/no-unknown-property */
import { Route, Routes, Navigate } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { RequireAuth } from './utils/PrivateRoute';
// ----------------------------------------------------------------------

const CustomRouter = () => (
  <Routes>
    <Route exact path='/dashboard' element={<RequireAuth><DashboardLayout /></RequireAuth>} >
      <Route exact element={<Navigate to="/dashboard/app" />} index />
      <Route exact path='app' element={<RequireAuth><DashboardAppPage /></RequireAuth>} />
      <Route exact path='user' element={<RequireAuth><UserPage /></RequireAuth>} />
      <Route exact path='products' element={<RequireAuth><ProductsPage /></RequireAuth>} />
      <Route exact path='blog' element={<RequireAuth><BlogPage /></RequireAuth>} />
    </Route>
    <Route exact path='/login' element={<LoginPage />} />
  </Routes>
)

export default CustomRouter;
