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
import './assets/styles/bootstrap.custom.css'; // Custom Bootstrap
import './assets/styles/index.css';
// Components
import App from './App';
// Screens
import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import HaircutsScreen from './screens/haircut/HaircutsScreen';
import ChooseBarberScreen from './screens/book/ChooseBarberScreen';
import ChooseDateTimeScreen from './screens/book/ChooseDateTimeScreen';
import ProvideCustInfoScreen from './screens/book/ProvideCustomInfoScreen';
import PlaceBookingScreen from './screens/book/PlaceBookingScreen';
import LoginScreen from './screens/auth/LoginScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import AboutScreen from './screens/AboutScreen';
import BookingScreen from './screens/bookingsScreen';
import GalleryListScreen from './screens/owner/GalleryListScreen';
import HaircutListScreen from './screens/owner/HaircutListScreen';
import HaircutEditScreen from './screens/owner/HaircutEditScreen';
import BarberListScreen from './screens/owner/BarberListScreen';
import CreateBarberScreen from './screens/owner/CreateBarberScreen';
// ----------------------------------------------------------------------
import PrivateRoute from './components/protectedRoutes/PrivateRoute';
import OwnerRoute from './components/protectedRoutes/OwnerRoute';

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App></App>}>
        {/* Public routes: Access by all users */}
        <Route index={true} path='/' element={<HomeScreen />}/>
        <Route path='/gallery' element={<GalleryScreen />}/>
        <Route path='/gallery/page/:pageNumber' element={<GalleryScreen />}/> {/* Pagination Functionality */}
        <Route path='/haircuts' element={<HaircutsScreen />}/>
        <Route path='/haircuts/page/:pageNumber' element={<HaircutsScreen />}/> {/* Pagination Functionality */}
        <Route path='/booking-barber' element={<ChooseBarberScreen />}/>
        <Route path='/booking-datetime' element={<ChooseDateTimeScreen />}/>
        <Route path='/booking-custominfo' element={<ProvideCustInfoScreen />}/>
        <Route path='/booking-placebooking' element={<PlaceBookingScreen />}/>

        <Route path='/about' element={<AboutScreen />}/>
        <Route path='/login' element={<LoginScreen />}/>

        {/* Private routes: Access by barbers & owner */}
        <Route path='' element={<PrivateRoute/>}>
          <Route path='/profile' element={<ProfileScreen />}/>
          <Route path='/bookings' element={<BookingScreen />}/>
          <Route path='/bookings/page/:pageNumber' element={<BookingScreen />}/> {/* Pagination Functionality */}
        </Route>

        {/* Private routes: Access by owner */}
        <Route path='' element={<OwnerRoute/>}>
          <Route path='/owner/gallerylist' element={<GalleryListScreen />}/>
          <Route path='/owner/gallerylist/page/:pageNumber' element={<GalleryListScreen />}/>  {/* Pagination Functionality */}

          <Route path='/owner/haircutlist' element={<HaircutListScreen />}/>
          <Route path='/owner/haircutlist/page/:pageNumber' element={<HaircutListScreen />}/>  {/* Pagination Functionality */}
          <Route path='/owner/haircut/:id/edit' element={<HaircutEditScreen />}/>
          <Route path='/owner/barberlist' element={<BarberListScreen />}/>
          <Route path='/owner/create-barber' element={<CreateBarberScreen />}/>
        </Route>
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
