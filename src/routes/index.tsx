import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import ProudactP from "../Pages/ProudactP";
import Layout from "../Pages/Layout";
import ProudactD from "../Pages/ProudactD";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Login from "../Pages/Login";
import Singup from "../Pages/Singup";
import GuestRoute from "../components/auth/GuestRoute";
import Alayout from "../Pages/Admain/Alayout";
import HomeA from "../Pages/Admain/HomeA";
import ProduactA from "../Pages/Admain/ProduactA";
import Users from "../Pages/Admain/Users";
import Category from "../Pages/Admain/Category";
import Profile from "../Pages/Profile";


const router = createBrowserRouter(
  
  createRoutesFromElements(
    
    <>
    <Route path="/" element={<Layout />}>

      <Route
        index
        element={
          <ProtectedRoute redirectPath="/login">
            <ProudactP />
          </ProtectedRoute>
        }
      />
       <Route
        path="Profile"
        element={
          <ProtectedRoute redirectPath="/login">
            <Profile />
          </ProtectedRoute>
        }
      />



      <Route path="products/:id" element={<ProudactD />} />

    <Route
  path="login"
  element={
    <GuestRoute>
      <Login />
    </GuestRoute>
  }
/>

<Route
  path="register"
  element={
    <GuestRoute>
      <Singup />
    </GuestRoute>
  }
/>

    </Route>
    <Route path="/Adashboard" element={ <ProtectedRoute role="admin">
      <Alayout />
    </ProtectedRoute>}>
    <Route index element={<HomeA/>}/>
    <Route path="prduactA" element={<ProduactA/>}/>
    <Route path="Users" element={<Users/>}/>
    <Route path="Category" element={<Category/>}/>

    </Route>
    </>
  )
);

export default router;
