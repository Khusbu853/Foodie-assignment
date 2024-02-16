import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./src/Components/Header";
import Body from "./src/Components/Body";
import Footer from "./src/Components/Footer";
import Error from "./src/Components/Error";
import Contact from "./src/Components/Contact";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import UserContext from "./src/utils/UserContext";
import { Provider } from "react-redux";
import store from "./src/utils/store";
import Cart from "./src/Components/Cart";
import Help from "./src/Components/Help";
import ShimmerMenu from "./src/Components/ShimmerMenu";
import ShimmerInstamart from "./src/Components/ShimmerInstamart";
import ShimmerAbout from "./src/Components/ShimmerAbout";
import LogIn from "./src/Components/Login";

const Instamart = lazy(() => import("./src/Components/Instamart"));
const About = lazy(() => import("./src/Components/About"));
const RestaurantMenu = lazy(() => import("./src/Components/RestaurantMenu"));

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    if (!token) {
      // Redirect to login page if token is not present
      appRouter.navigate("/login");
    }
  }, [token]);

  return isLoggedIn ? element : null;
};

const AppLayout = () => {
  const [user, setUser] = useState({
    name: "Khusbu Gupta",
    email: "guptakhusbu244@gmail.com",
  });

  return (
    <Provider store={store}>
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
        }}
      >
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    index: true, // Set as default route
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    element: <ProtectedRoute element={<AppLayout />} />,
    children: [
      {
        path: "/home",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<ShimmerAbout />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: (
          <Suspense fallback={<ShimmerMenu />}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<ShimmerInstamart />}>
            <Instamart />
          </Suspense>
        ),
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
