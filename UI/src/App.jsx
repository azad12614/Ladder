import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from 'react';
import "./App.css";
import Home from "./pages/Home/Home";
import AddProblem from "./pages/AddProblem/AddProblem";
import ViewProblem from "./pages/ViewProblem/ViewProblem";
import ManageProduct from "./pages/ManageProduct/ManageProduct";
import ProductDetails from "./pages/Details/ProductDetails";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";

function App() {
  const [Handle, setHandle] = useState("Enter CF Handle");

  function sendValue(Handle) {
    setHandle(`${Handle}`);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add-problem",
      element: <AddProblem />,
    },
    {
      path: "/view-problem",
      element: <ViewProblem Handle={Handle} sendValue={sendValue} />
    },
    {
      path: "/manage-product",
      element: <ManageProduct />,
      loader: function () {
        return fetch("http://localhost:3000/all-products");
      },
    },
    {
      path: "/product/:id",
      element: <ProductDetails></ProductDetails>,
      loader: function ({ params }) {
        return fetch(`http://localhost:3000/product/${params.id}`);
      },
    },
    {
      path: "/update/:id",
      element: <UpdateProduct></UpdateProduct>,
      loader: function ({ params }) {
        return fetch(`http://localhost:3000/product/${params.id}`);
      },
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
