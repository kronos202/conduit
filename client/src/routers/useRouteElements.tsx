import { Suspense, useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { AppContext } from "@/context/app.context";
import path from "@/constants/path";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import MainLayout from "@/layouts/MainLayout";

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: "",
      children: [
        {
          path: path.home,
          index: true,
          element: (
            <MainLayout>
              <Suspense>
                <Home />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: path.login,
          element: (
            <AuthLayout>
              <Suspense>
                <Login />
              </Suspense>
            </AuthLayout>
          ),
        },
        {
          path: path.register,
          element: (
            <AuthLayout>
              <Suspense>
                <Register />
              </Suspense>
            </AuthLayout>
          ),
        },
      ],
    },
  ]);
  return routeElements;
};

export default useRouteElements;
