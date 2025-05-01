import { Link, useLocation } from "react-router-dom";
import { SquarePen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropdownMenuAuth from "../DropDown";

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="py-4 bg-white shadow-sm">
      <div className="container px-4 mx-auto max-w-7xl">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-green-500 transition hover:opacity-90">
            Conduit
          </Link>

          <div className="items-center hidden gap-6 text-sm font-medium md:flex">
  {/* Home */}

  {/* New Article */}
  <Link
    to="/editor"
    className={`flex items-center gap-1 hover:text-green-600 transition ${
      isActive("/editor") ? "text-black" : "text-gray-500"
    }`}
  >
    <SquarePen className="w-4 h-4" />
    New Article
  </Link>
          </div>

<div className="flex items-center gap-4">
{/* Avatar */}
<Link to="/setting">
    <Avatar className="w-8 h-8">
      <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </Link>

{/* Mobile Menu */}
<DropdownMenuAuth />
</div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
