import { Link, useLocation } from "react-router-dom";
import { SquarePen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropdownMenuAuth from "../DropDown";

const Header = () => {
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
                to="/editor"
                className={`${
                  location.pathname === "/register" ? "text-gray-600" : ""
                } font-bold text-base text-gray-400 hover:text-gray-600 flex items-center gap-1`}
              >
                <SquarePen />
                <p>New Article</p>
              </Link>
              <Avatar>
                <Link to="/profile">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="cursor-pointer"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Link>
              </Avatar>
              <DropdownMenuAuth />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
