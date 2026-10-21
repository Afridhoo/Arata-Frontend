import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UseSignOut } from "@/features/auth/hooks/useAuth";
import {
  EllipsisVerticalIcon,
  LogOutIcon,
  LucideUser2,
  LucideArrowUpLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const fastFitur = [
  { title: "Profil Akun", url: "/AccountMe", icon: <LucideUser2 /> },
  { title: "Halaman Home", url: "/", icon: <LucideArrowUpLeft /> },
];

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const { mutate: Logout } = UseSignOut();

  const { pathname: url } = useLocation();
  const split = url?.split("/")[1];

  function handleLogOut() {
    Logout();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />
            }
          >
            <Avatar className="size-8 rounded-lg ">
              <AvatarImage src={user.photo} alt={user.name} />
              <AvatarFallback className="rounded-lg">
                <LucideUser2 />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-foreground/70">
                {user.email}
              </span>
            </div>
            <EllipsisVerticalIcon className="ml-auto size-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8">
                    <AvatarImage src={user.photo} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      <LucideUser2 />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {fastFitur?.map((el, idx) => (
              <DropdownMenuGroup key={idx}>
                {split !== el.url?.split("/")?.[1] && (
                  <Link to={el.url}>
                    <DropdownMenuItem className={"cursor-pointer"}>
                      {el.icon}
                      {el.title}
                    </DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuGroup>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogOut}
              className={"cursor-pointer"}
            >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
