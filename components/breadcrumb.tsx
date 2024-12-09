"use client";
import React, { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import useCountry from "@/hooks/use-country"; // Update the import path if necessary
import sidebarLinks from "@/visibility/sidebarLinks";
import { cn } from "@/lib/utils";
type Items = {
  title?: string;
  url?: string;
  icon?: React.ElementType;
  isActive?: boolean;
  items?: {
    title?: string;
    isActive?: boolean;
    isVisible?: boolean;
    url?: string;
  }[];
}[];
export default function DynamicBreadcrumb({
  role,
}: Readonly<{ role: string }>) {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  const locale = useLocale();
  const country = useCountry();
  const links = useMemo(() => sidebarLinks({ role, t }), [role, t]);

  const breadcrumbs = useMemo(() => {
    const pathSegments = pathname.split(`/${country}`).filter(Boolean);
    const findMatchingLink = (segments: string[], links: Items) => {
      const matchedBreadcrumbs = [];
      let currentLinks = links;

      for (const segment of segments) {
        const match = currentLinks.find(
          (link) =>
            link.url === `/${segments.slice(0, segments.indexOf(segment) + 1).join("/")}`
        );

        if (match) {
          matchedBreadcrumbs.push({
            translatedLabel: match.title,
            href: match.url,
          });

          currentLinks = match.items || [];
        } else {
          break;
        }
      }

      return matchedBreadcrumbs;
    };

    const result = findMatchingLink(pathSegments, links);
    console.log("Breadcrumb Debug:", { pathSegments, result });
    return result;
  }, [pathname, country, links]);

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null; // Render nothing if no breadcrumbs are found
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index + 1}>
            <BreadcrumbItem
              className={cn(
                "text-base",
                index < breadcrumbs.length - 1 ? "hidden md:block" : ""
              )}
            >
              {index < breadcrumbs.length - 1 ? (
                <BreadcrumbLink
                  className="!text-base font-semibold text-black"
                  href={`/${locale}/${country}${breadcrumb.href}`}
                >
                  {breadcrumb.translatedLabel}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{breadcrumb.translatedLabel}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block rtl:rotate-180" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
