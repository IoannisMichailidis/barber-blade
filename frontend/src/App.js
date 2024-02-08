import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Styles
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
          <Outlet/>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App