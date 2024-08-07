import { lazy, Suspense, useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import path from "@/constants/path";
import AuthLayout from "@/layouts/AuthLayout";
import Home from "@/pages/Home";
import MainLayout from "@/layouts/MainLayout";
import SkeletonRegister from "@/components/SkeletonRegister";
import SkeletonLogin from "@/components/SkeletonLogin";
import CreateArticle from "@/pages/CreateArticle";
import { AppContext } from "@/context/app";
import ArticleDetail from "@/pages/ArticleDetail";
import Setting from "@/pages/Setting";
import Profile from "@/pages/Profile";

const HomePage = lazy(() => import("@/pages/Home"));
const RegisterPage = lazy(() => import("@/pages/Register"));
const LoginPage = lazy(() => import("@/pages/Login"));

export function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <AuthLayout>
              <Suspense fallback={<SkeletonLogin />}>
                <LoginPage />
              </Suspense>
            </AuthLayout>
          ),
        },
        {
          path: path.register,
          element: (
            <AuthLayout>
              <Suspense fallback={<SkeletonRegister />}>
                <RegisterPage />
              </Suspense>
            </AuthLayout>
          ),
        },
      ],
    },
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
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: path.editor,
          element: (
            <MainLayout>
              <Suspense fallback={<SkeletonRegister />}>
                <CreateArticle />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: path.articleDetail,
          element: (
            <MainLayout>
              <Suspense fallback={<SkeletonRegister />}>
                <ArticleDetail />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: path.setting,
          element: (
            <MainLayout>
              <Suspense fallback={<SkeletonRegister />}>
                <Setting />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Suspense fallback={<SkeletonRegister />}>
                <Profile />
              </Suspense>
            </MainLayout>
          ),
        },
      ],
    },
  ]);
  return routeElements;
};

export default useRouteElements;
