import { lazy, Suspense, useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import path from "@/constants/path";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import SkeletonRegister from "@/components/SkeletonRegister";
import SkeletonLogin from "@/components/SkeletonLogin";
import { AppContext } from "@/context/app";

const HomePage = lazy(() => import("@/pages/Home"));
const RegisterPage = lazy(() => import("@/pages/Register"));
const ConfirmPage = lazy(() => import("@/pages/ConfirmEmail"));
const LoginPage = lazy(() => import("@/pages/Login"));
const CreateArticlePage = lazy(() => import("@/pages/CreateArticle"));
const ArticleDetailPage = lazy(() => import("@/pages/ArticleDetail"));
const SettingPage = lazy(() => import("@/pages/Setting"));
const ProfilePage = lazy(() => import("@/pages/Profile"));

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
        {
          path: path.confirmEmail,
          element: (
            <AuthLayout>
              <Suspense fallback={<SkeletonRegister />}>
                <ConfirmPage />
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
            <HomePage />
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
                <CreateArticlePage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: path.articleDetail,
          element: (
            <MainLayout>
              <Suspense fallback={<SkeletonRegister />}>
                <ArticleDetailPage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: path.setting,
          element: (
            <MainLayout>
              <Suspense fallback={<SkeletonRegister />}>
                <SettingPage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Suspense fallback={<SkeletonRegister />}>
                <ProfilePage />
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
