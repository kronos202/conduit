import { Link, useLocation } from "react-router-dom";

const AuthHeader = () => {
  const location = useLocation();
  return (
    <header className="py-4">
      <div className="container">
        <nav className="flex items-center justify-between">
          <Link to="/" className={`font-bold text-2xl text-green-500`}>
            <h2>Conduit</h2>
          </Link>
          <div className="ml-5 text-xl lg:text-2xl">
            <div className="flex items-center justify-between gap-4">
              <Link
                to="/"
                className={`${
                  location.pathname === "/" ? "text-gray-600" : ""
                } font-bold text-base text-gray-400 hover:text-gray-600`}
              >
                <p>Home</p>
              </Link>
              <Link
                to="/login"
                className={`${
                  location.pathname === "/login" ? "text-gray-600" : ""
                } font-bold text-base text-gray-400 hover:text-gray-600`}
              >
                <p>Sign In</p>
              </Link>
              <Link
                to="/register"
                className={`${
                  location.pathname === "/register" ? "text-gray-600" : ""
                } font-bold text-base text-gray-400 hover:text-gray-600`}
              >
                <p>Sign Up</p>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AuthHeader;
