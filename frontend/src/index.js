import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// Providers
import { Provider } from 'react-redux';
// Redux
import store from './store';
// Styles
// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap
import './assets/styles/bootstrap.custom.css'; // Custom Bootstrap
import './assets/styles/index.css';
// Components
import App from './App';
// Screens
import HomeScreen from './screens/HomeScreen';
import HaircutsScreen from './screens/haircut/HaircutsScreen';
import ChooseBarberScreen from './screens/book/ChooseBarberScreen';
import ChooseDateTimeScreen from './screens/book/ChooseDateTimeScreen';
import ProvideCustInfoScreen from './screens/book/ProvideCustomInfoScreen';
import PlaceBookingScreen from './screens/book/PlaceBookingScreen';
// import CategoryProductsScreen from './screens/product/CategoryProductsScreen';
// import ProductDetailsScreen from './screens/product/ProductDetailsScreen';
// import CartScreen from './screens/cart/CartScreen';

import LoginScreen from './screens/auth/LoginScreen';
// import RegisterScreen from './screens/auth/RegisterScreen';

// import ShippingScreen from './screens/checkout/ShippingScreen';
// import PrivateRoute from './components/protectedRoutes/PrivateRoute';
// import AdminRoute from './components/protectedRoutes/AdminRoute';
// import PaymentScreen from './screens/checkout/PaymentScreen';
// import PlaceOrderScreen from './screens/checkout/PlaceOrderScreen';
// import OrderScreen from './screens/checkout/OrderScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import AboutScreen from './screens/AboutScreen';
import BookingScreen from './screens/bookingsScreen';
// import MyOrdersScreen from './screens/MyOrdersScreen';
// Admin Screens
// import OrderListScreen from './screens/admin/OrderListScreen';
// import ProductListScreen from './screens/admin/ProductListScreen';
// import ProductEditScreen from './screens/admin/ProductEditScreen';
// import UserListScreen from './screens/admin/UserListScreen';
// import UserEditScreen from './screens/admin/UserEditScreen';

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App></App>}>
        {/* Public routes: Access by all users */}
        <Route index={true} path='/' element={<HomeScreen />}/>
        <Route path='/haircuts' element={<HaircutsScreen />}/>
        <Route path='/products/page/:pageNumber' element={<HaircutsScreen />}/> {/* Pagination Functionality */}
        <Route path='/booking-barber' element={<ChooseBarberScreen />}/>
        <Route path='/booking-datetime' element={<ChooseDateTimeScreen />}/>
        <Route path='/booking-custominfo' element={<ProvideCustInfoScreen />}/>
        <Route path='/booking-placebooking' element={<PlaceBookingScreen />}/>

        <Route path='/about' element={<AboutScreen />}/>
        <Route path='/login' element={<LoginScreen />}/>

        {/* Private routes: Access by barbers & owner */}
        <Route path='/profile' element={<ProfileScreen />}/>
        <Route path='/bookings' element={<BookingScreen />}/>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
