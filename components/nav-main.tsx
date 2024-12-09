"use client";

import { ChevronRight} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "./reusable/Link";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: Readonly<{
  items: {
    title?: string;
    url?: string;
    icon?: React.ElementType;
    isActive?: boolean;
    isVisible?: boolean;
    items?: {
      title?: string;
      isActive?: boolean;
      isVisible?: boolean;
      url?: string;
    }[];
  }[];
}>) {
  const renderIcon = (Icon: React.ElementType | undefined, isActive: boolean|undefined) =>
    Icon && (
      <span className=" group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
      >

      <Icon
        className={cn(
          isActive && "text-primary",
          "!size-6 group-data-[collapsible=icon]:w-full"
        )}
        />
        </span>
    );

  const renderSubItems = (subItems: (typeof items)[0]["items"]) =>
    subItems?.filter(item=>item.isVisible).map((subItem) => (
      <SidebarMenuSubItem key={subItem.title}>
        <SidebarMenuSubButton asChild className="h-10 py-3">
          <Link href={subItem.url} className="no-underline text-sm">
            <span>{subItem.title}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    ));

  const renderMenuItem = (item: (typeof items)[0]) => (
    <SidebarMenuItem key={item.title}>
      <Collapsible
        asChild
        defaultOpen={item.isActive}
        className="group/collapsible "
      >
        {item.items ? (
          <span>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  "h-12 hover:bg-[#FFF0ED]",
                  item.isActive && "!bg-[#FFF0ED]"
                )}
              >
                {renderIcon(item.icon, item.isActive)}
                <span
                  className={cn(
                    "text-base font-semibold text-gray-500",
                    item.isActive && "text-black"
                  )}
                >
                  {item.title}
                </span>
                <ChevronRight
                  className={cn(
                    "ltr:ml-auto rtl:mr-auto transition-transform !w-5 !h-5 duration-200 rtl:rotate-180 group-data-[state=open]/collapsible:rotate-90",
                    item.isActive && "!text-white"
                  )}
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>{renderSubItems(item.items)}</SidebarMenuSub>
            </CollapsibleContent>
          </span>
        ) : (
          <SidebarMenuButton
            asChild
            tooltip={item.title}
            className={cn(
              "h-12 hover:bg-gray-200",
              item.isActive && "!bg-[#FFF0ED] text-[#F25D50]"
            )}
          >
            <Link
              href={item.url}
              className="no-underline text-base font-semibold"
            >
              {renderIcon(item.icon, item.isActive)}
              <span
                className={cn(
                  "text-lg font-semibold",
                  item.isActive && "text-black"
                )}
              >
                {item.title}
              </span>
            </Link>
          </SidebarMenuButton>
        )}
      </Collapsible>
    </SidebarMenuItem>
  );

  return (
    <SidebarGroup>
      <SidebarMenu>{items.filter(item=>item.isVisible).map(renderMenuItem)}</SidebarMenu>
    </SidebarGroup>
  );
}
