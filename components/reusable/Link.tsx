import useCountry from "@/hooks/use-country";
import { Link as RoutingLink } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import React from "react";
import { UrlObject } from "url";

interface LinkProps {
  className?: string;
  href?: string | UrlObject;
  children?: React.ReactNode;
  basePath?: string;
}

const Link: React.FC<LinkProps> = ({
  children,
  basePath,
  className = "",
  href = "#",
}) => {
  const country = useCountry();
  let resolvedHref = href;

  if (typeof href === "string") {
    if (country) {
      const base = basePath ?? "/dashboard";
      const separator = href.startsWith("/") ? "" : "/";
      resolvedHref = `/${country}${base}${separator}${href}`;
    }
  }

  return (
    <RoutingLink
      className={cn("text-primary underline", className)}
      href={resolvedHref}
    >
      {children || "Link"}
    </RoutingLink>
  );
};

export default Link;
