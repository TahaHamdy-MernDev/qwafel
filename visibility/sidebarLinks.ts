import { LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";

import { GrAnalytics } from "react-icons/gr";
// const data = {
//     user: {
//       name: "shadcn",
//       email: "m@example.com",
//       avatar: "/avatars/shadcn.jpg",
//     },
//     teams: [
//       {
//         name: "Acme Inc",
//         logo: GalleryVerticalEnd,
//         plan: "Enterprise",
//       },
//       {
//         name: "Acme Corp.",
//         logo: AudioWaveform,
//         plan: "Startup",
//       },
//       {
//         name: "Evil Corp.",
//         logo: Command,
//         plan: "Free",
//       },
//     ],

//     projects: [
//       {
//         name: "Design Engineering",
//         url: "#",
//         icon: Frame,
//       },
//       {
//         name: "Sales & Marketing",
//         url: "#",
//         icon: PieChart,
//       },
//       {
//         name: "Travel",
//         url: "#",
//         icon: Map,
//       },
//     ],
//   }


export const sidebarLinks = ({
  role,
  t
}:{
    role: string,
    t :ReturnType<typeof useTranslations>
}) => {

  return [
    {
      title: t("dashboard"),
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      isVisible: true,
    },
    {
      title: t("reports.reports"),
      url: "/reports",
      icon: GrAnalytics,
      isActive: false,
      isVisible: true,
      items: [
        {
          title: t("reports.shipping_companies"),
          url: "/reports/shipping-companies",
          isVisible: true,
        },
        {
          title: t("reports.city"),
          url: "/reports/city",
          isVisible: true,
        },
        {
          title: t("reports.expense_reports"),
          url: "/reports/expense-reports",
          isVisible: true,
        },
        {
          title: t("reports.revenue_reports"),
          url: "/reports/revenue-reports",
          isVisible: true,
        },
        {
          title: t("reports.orders"),
          url: "/reports/orders",
          isVisible: true,
        },
        {
          title: t("reports.top_selling_customers"),
          url: "/reports/top-selling-customers",
          isVisible: true,
        },
        {
          title: t("reports.merchant_overview"),
          url: "/reports/merchant-overview",
          isVisible: true,
        },
        {
          title: t("reports.user_finance"),
          url: "/reports/user-finance",
          isVisible: true,
        },
        {
          title: t("reports.daily_orders"),
          url: "/reports/daily-orders",
          isVisible: true,
        },
        {
          title: t("reports.slow_moving_products"),
          url: "/reports/slow-moving-products",
          isVisible: true,
        },
        {
          title: t("reports.marketer_overview"),
          url: "/reports/marketer-overview",
          isVisible: true,
        },
        {
          title: t("reports.product_overview"),
          url: "/reports/product-overview",
          isVisible: true,
        },
        {
          title: t("reports.confirmation_reports"),
          url: "/reports/confirmation-reports",
          isVisible: true,
        },
        {
          title: t("reports.fulfillment_report"),
          url: "/reports/fulfillment-report",
          isVisible: true,
        },
      ],
    },
    {
      title: t("finance_management.finance_management"),
      url: "/finance-management",
      icon: null, // Add an appropriate icon
      isActive: false,
      isVisible: true,
      items: [
        {
          title: t("finance_management.sales_management"),
          url: "/finance-management/sales",
          isVisible: true,
        },
        {
          title: t("finance_management.shipping_company_management"),
          url: "/finance-management/shipping-companies",
          isVisible: true,
        },
        {
          title: t("finance_management.marketer_management"),
          url: "/finance-management/marketers",
          isVisible: true,
        },
        {
          title: t("finance_management.merchant_management"),
          url: "/finance-management/merchants",
          isVisible: true,
        },
        {
          title: t("finance_management.supplier_finance"),
          url: "/finance-management/suppliers",
          isVisible: true,
        },
      ],
    },
    {
      title: t("products.products"),
      url: "/products",
      icon: null, // Add an appropriate icon
      isActive: false,
      isVisible: true,
      items: [
        {
          title: t("products.all_products"),
          url: "/products/all",
          isVisible: true,
        },
        {
          title: t("products.add_product"),
          url: "/products/add",
          isVisible: true,
        },
        {
          title: t("products.category"),
          url: "/products/categories",
          isVisible: true,
        },
        {
          title: t("products.sizes"),
          url: "/products/sizes",
          isVisible: true,
        },
        {
          title: t("products.colors"),
          url: "/products/colors",
          isVisible: true,
        },
        {
          title: t("products.offers"),
          url: "/products/offers",
          isVisible: true,
        },
        {
          title: t("products.wholesale_products"),
          url: "/products/wholesale",
          isVisible: true,
        },
        {
          title: t("products.exclusive_products"),
          url: "/products/exclusive",
          isVisible: true,
        },
      ],
    },
  ];
};

export default sidebarLinks;
