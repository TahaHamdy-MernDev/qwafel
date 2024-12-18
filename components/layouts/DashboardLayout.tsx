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
import { useEffect, useState } from "react";
import { getAuthToken } from "@/lib/cookies";
import { useRouter } from "@/i18n/routing";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const locale = useLocale();
  const dir = getLangDir(locale);
  const sidebarDir = dir === "rtl" ? "right" : "left";
  const router = useRouter();
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }
  return (
  
    <SidebarProvider className="">
      <AppSidebar side={sidebarDir} className=" !bg-transparent" />
      <SidebarInset className=" !bg-transparent">
        <header className="flex  h-16 shrink-0 justify-between items-center border-b bg-white rounded-ml-lg gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14">
          <div className="container flex items-center justify-between gap-2 ">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
              {/* <DynamicBreadcrumb role={"admin"} /> */}
            </div>
            <div className=" flex items-center justify-center gap-2">
              <ChangeCountry />
              <ChangeLocalization className=" block" />
            </div>
          </div>
          {/* <NavUser user={data.user} /> */}
        </header>
        <div className="container mt-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
