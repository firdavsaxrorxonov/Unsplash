import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import DevImages from './pages/DevImages';
import MainLayout from './layouts/MainLayout';
import LikedImages from './pages/LikedImages';
import Login from './pages/Login';
import Register from './pages/Register';
import { action as HomeAction } from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Home />, action: HomeAction },
      { path: 'liked', element: <LikedImages /> },
      { path: 'devImages', element: <DevImages /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);


function App() {
  return (
    <>
      <ToastContainer position="bottom-left" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
