import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/home/home';
import Root from './components/root/root';
import NotFound from './components/NotFound';
import Products from './components/products/products';
import LoginSignup from './components/loginSignup/loginSignupPage';
import Product from './components/product/product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './components/cart/cart';
import ProtectedRouts from './components/ProtectedRouts';
import UserContextProvider from './user'

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Products/:id",
        element: <Products />,
      },
      {
        path: "/Authentication",
        element: <LoginSignup />,
      },
      {
        path: "/Product/:id",
        element: <Product />,
      },
      {
        path: "/Cart",
        element:
          <ProtectedRouts>
            <Cart />
          </ProtectedRouts>
        ,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
],
);

export default function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={Router} />
      </UserContextProvider>

      <ToastContainer />
    </>
  );
}

