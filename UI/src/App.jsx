// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import React, { useState } from "react";
// import "./App.css";
// import Home from "./pages/Home/Home";
// import AddProblem from "./pages/AddProblem/AddProblem";
// import ViewProblem from "./pages/ViewProblem/ViewProblem";

// function App(URL) {
//   const [Handle, setHandle] = useState("Enter CF Handle");

//   function sendValue(Handle) {
//     setHandle(`${Handle}`);
//   }

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Home />,
//     },
//     {
//       path: "/add-problem",
//       element: <AddProblem URL={URL} />,
//     },
//     {
//       path: "/view-problem",
//       element: <ViewProblem Handle={Handle} sendValue={sendValue} />,
//     },
//   ]);
//   return <RouterProvider router={router} />;
// }

// export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import AddProblem from "./pages/AddProblem/AddProblem";
import ViewProblem from "./pages/ViewProblem/ViewProblem";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Layout from "./components/Layout";

function App({ URL }) {
  const [Handle, setHandle] = useState("");

  function sendValue(Handle) {
    setHandle(`${Handle}`);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/add-problem",
      element: (
        <Layout>
          <AddProblem URL={URL} />
        </Layout>
      ),
    },
    {
      path: "/view-problem",
      element: (
        <Layout>
          <ViewProblem Handle={Handle} sendValue={sendValue} />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login URL={URL} />
        </Layout>
      ),
    },
    {
      path: "/register",
      element: (
        <Layout>
          <Register URL={URL} />
        </Layout>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <Layout>
          <ForgotPassword URL={URL} />
        </Layout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
