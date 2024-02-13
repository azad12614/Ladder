import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from 'react';
import "./App.css";
import Home from "./pages/Home/Home";
import AddProblem from "./pages/AddProblem/AddProblem";
import ViewProblem from "./pages/ViewProblem/ViewProblem";
import ManageProduct from "./pages/ManageProduct/ManageProduct";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";

function App(URL) {
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
      element: <ManageProduct URL={[URL]}/>,
      loader: function () {
        return fetch(`${URL}/all-products`);
      },
    },
    {
      path: "/update/:id",
      element: <UpdateProduct URL={[URL]}></UpdateProduct>,
      loader: function ({ params }) {
        return fetch(`${URL}/product/${params.id}`);
      },
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
