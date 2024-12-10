"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useLocale } from "next-intl";
import { getLangDir } from "rtl-detect";
import DynamicBreadcrumb from "../breadcrumb";
import { NavUser } from "../nav-user";
import ChangeLocalization from "../ChangeLocalization";
import ChangeCountry from "../change-country";
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};
export function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = useLocale();
  const dir = getLangDir(locale);
  const sidebarDir = dir === "rtl" ? "right" : "left";
  return (
    // <SidebarProvider className=" container mx-auto">
    <SidebarProvider className="">
      <AppSidebar side={sidebarDir} className=" !bg-transparent" />
      <SidebarInset className=" !bg-transparent">
        
        <header className="flex  h-16 shrink-0 justify-between items-center border-b bg-white rounded-ml-lg gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14">
          <div className="flex items-center justify-between gap-2 container mx-auto p-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
              {/* <DynamicBreadcrumb role={"admin"} /> */}
            </div>
            <div className=" flex items-center justify-center gap-2">

            <ChangeCountry/>
            <ChangeLocalization className=" block"/>
            </div>
          </div>
          {/* <NavUser user={data.user} /> */}
        </header>
        <div className="container mx-auto mt-2 overflow-hidden">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
