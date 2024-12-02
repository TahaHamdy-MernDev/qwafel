import { Link as RoutingLink } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import React from "react";
import { UrlObject } from "url";

interface LinkProps {
  className?: string;
  href?: string | UrlObject; 
  children?: React.ReactNode; 
  country?: string; 
}

const Link: React.FC<LinkProps> = ({ children, className = "", country, href = "#" }) => {
  // Resolve the href properly
  const resolvedHref =
    typeof href === "string"
      ? (country ? `/${country}${href.startsWith("/") ? "" : "/"}${href}` : href)
      : href;

  return (
    <RoutingLink className={cn("text-primary underline", className)} href={resolvedHref}>
      {children || "Link"} 
    </RoutingLink>
  );
};

export default Link;
