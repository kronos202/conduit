import { Link, useLocation } from "react-router-dom";

const AuthHeader = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 mx-auto max-w-7xl">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight text-green-500 transition hover:opacity-90">
            Conduit
          </Link>

          <div className="flex items-center gap-6 text-base font-medium">
            <Link
              to="/login"
              className={`${
                isActive("/login") ? "text-gray-900" : "text-gray-500"
              } hover:text-green-500 transition duration-150 ease-in-out`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={`${
                isActive("/register") ? "text-gray-900" : "text-gray-500"
              } hover:text-green-500 transition duration-150 ease-in-out`}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AuthHeader;
