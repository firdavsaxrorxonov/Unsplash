import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import MainLayout from './layouts/MainLayout';
import LikedImages from './pages/LikedImages';
import { action as HomeAction } from './pages/Home'
import DownloadedImages from './pages/DownloadedImages';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home></Home>, action: HomeAction },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'liked', element: <LikedImages /> },
      { path: 'downloadImages', element: <DownloadedImages /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
