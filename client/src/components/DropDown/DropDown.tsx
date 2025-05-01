import { LogOut, Settings, AlignJustify, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/auth/mutations/useLogout";
import { Link } from "react-router-dom";

export default function DropdownMenuAuth() {
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
  <DropdownMenuLabel>My Account</DropdownMenuLabel>
  <DropdownMenuSeparator />

  {/* Only show on mobile */}
  <DropdownMenuGroup className="md:hidden">
    <DropdownMenuItem asChild>
      <Link to="/editor">
        <SquarePen className="w-4 h-4 mr-2" />
        <span>New Article</span>
      </Link>
    </DropdownMenuItem>
  </DropdownMenuGroup>

  <DropdownMenuSeparator />
  <DropdownMenuItem asChild>
    <Link to="/setting">
      <Settings className="w-4 h-4 mr-2" />
      <span>Settings</span>
    </Link>
  </DropdownMenuItem>
  <DropdownMenuItem onClick={() => logout()}>
    <LogOut className="w-4 h-4 mr-2" />
    <span>Log out</span>
  </DropdownMenuItem>
</DropdownMenuContent>

    </DropdownMenu>
  );
}
