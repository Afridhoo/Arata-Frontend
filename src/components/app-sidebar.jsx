import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideLocationEdit } from "lucide-react";
import AvatarSimpleUse from "./AvatarSimpleUse";

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "#",
//       icon: <LayoutDashboardIcon />,
//     },
//     {
//       title: "Lifecycle",
//       url: "#",
//       icon: <ListIcon />,
//     },
//     {
//       title: "Analytics",
//       url: "#",
//       icon: <ChartBarIcon />,
//     },
//     {
//       title: "Projects",
//       url: "#",
//       icon: <FolderIcon />,
//     },
//     {
//       title: "Team",
//       url: "#",
//       icon: <UsersIcon />,
//     },
//   ],
//   navClouds: [
//     {
//       title: "Capture",
//       icon: <CameraIcon />,
//       isActive: true,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Proposal",
//       icon: <FileTextIcon />,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Prompts",
//       icon: <FileTextIcon />,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   navSecondary: [
//     {
//       title: "Settings",
//       url: "#",
//       icon: <Settings2Icon />,
//     },
//     {
//       title: "Get Help",
//       url: "#",
//       icon: <CircleHelpIcon />,
//     },
//     {
//       title: "Search",
//       url: "#",
//       icon: <SearchIcon />,
//     },
//   ],
//   documents: [
//     {
//       name: "Data Library",
//       url: "#",
//       icon: <DatabaseIcon />,
//     },
//     {
//       name: "Reports",
//       url: "#",
//       icon: <FileChartColumnIcon />,
//     },
//     {
//       name: "Word Assistant",
//       url: "#",
//       icon: <FileIcon />,
//     },
//   ],
// };

import img from "../assets/LogoWebsite.png";

export function AppSidebar({ navMain, user }) {
  return (
    <Sidebar collapsible="offcanvas" className={"pl-1"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <AvatarSimpleUse
                photo={img}
                noBage={true}
                size={"sm"}
                isActive={true}
              />
              <span className="font-semibold text-sm text-gray-500">
                Arata Dashboard
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
