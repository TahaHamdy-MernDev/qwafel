import { CircleDollarSign, LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";
import { AiOutlineProduct } from "react-icons/ai";
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
  t,
}: {
  role: string;
  t: ReturnType<typeof useTranslations>;
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
      isVisible: false,
      items: [
        {
          title: t("reports.shipping_companies"),
          url: "/reports/shipping-companies",
          isVisible: true,
        },
        {
          title: t("reports.city"),
          url: "reports/city",
          isVisible: true,
        },
        {
          title: t("reports.expense_reports"),
          url: "reports/expense-reports",
          isVisible: true,
        },
        {
          title: t("reports.revenue_reports"),
          url: "reports/revenue-reports",
          isVisible: true,
        },
        {
          title: t("reports.orders"),
          url: "reports/orders",
          isVisible: true,
        },
        {
          title: t("reports.top_selling_customers"),
          url: "reports/top-selling-customers",
          isVisible: true,
        },
        {
          title: t("reports.merchant_overview"),
          url: "reports/merchant-overview",
          isVisible: true,
        },
        {
          title: t("reports.user_finance"),
          url: "reports/user-finance",
          isVisible: true,
        },
        {
          title: t("reports.daily_orders"),
          url: "reports/daily-orders",
          isVisible: true,
        },
        {
          title: t("reports.slow_moving_products"),
          url: "reports/slow-moving-products",
          isVisible: true,
        },
        {
          title: t("reports.marketer_overview"),
          url: "reports/marketer-overview",
          isVisible: true,
        },
        {
          title: t("reports.product_overview"),
          url: "reports/product-overview",
          isVisible: true,
        },
        {
          title: t("reports.confirmation_reports"),
          url: "reports/confirmation-reports",
          isVisible: true,
        },
        {
          title: t("reports.fulfillment_report"),
          url: "reports/fulfillment-report",
          isVisible: true,
        },
      ],
    },
    {
      title: t("finance_management.finance_management"),
      url: "/finance-management",
      icon: CircleDollarSign,
      isActive: false,
      isVisible: false,
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
      icon: AiOutlineProduct,
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
          url: "/products/categories/all",
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
          isVisible: false,
        },
        {
          title: t("products.wholesale_products"),
          url: "/products/wholesale",
          isVisible: false,
        },
        {
          title: t("products.exclusive_products"),
          url: "/products/exclusive",
          isVisible: false,
        },
      ],
    },
    {
      title: t("sales.sales"),
      url: "/sales",
      icon: CircleDollarSign,
      isActive: false,
      isVisible: false,
      items: [
        {
          title: t("sales.order_reviews"),
          url: "/sales/order-reviews",
          isVisible: true,
        },
        {
          title: t("sales.return_reviews"),
          url: "/sales/return-reviews",
          isVisible: true,
        },
        {
          title: t("sales.manifest_history"),
          url: "/sales/manifest-history",
          isVisible: true,
        },
        {
          title: t("sales.pickup_report"),
          url: "/sales/pickup-report",
          isVisible: true,
        },
        {
          title: t("sales.late_orders"),
          url: "/sales/late-orders",
          isVisible: true,
        },
        {
          title: t("sales.settlement_history"),
          url: "/sales/settlement-history",
          isVisible: true,
        },
        {
          title: t("sales.fulfillment_settlements"),
          url: "/sales/fulfillment-settlements",
          isVisible: true,
        },
      ],
    },
    {
      title: t("inventory.inventory"),
      url: "/inventory",
      icon: CircleDollarSign, // Replace with an appropriate icon
      isActive: false,
      isVisible: true,
      items: [
        {
          title: t("inventory.warehouses"),
          url: "/inventory/warehouses",
          isVisible: true,
        },
        {
          title: t("inventory.product_stock"),
          url: "/inventory/product-stock",
          isVisible: false,
        },
        {
          title: t("inventory.variant_stock"),
          url: "/inventory/variant-stock",
          isVisible: true,
        },
      ],
    },
    {
      title: t("purchases.purchases"),
      url: "/purchases",
      icon: CircleDollarSign,
      isActive: false,
      isVisible: false,
      items: [
        {
          title: t("purchases.suppliers"),
          url: "/purchases/suppliers",
          isVisible: true,
        },
        {
          title: t("purchases.stock_movement"),
          url: "/purchases/stock-movement",
          isVisible: true,
        },
      ],
    },
    {
      title: t("finances.finance"),
      url: "/finances",
      icon: CircleDollarSign,
      isActive: false,
      isVisible: false,
      items: [
        {
          title: t("finances.withdrawal_requests"),
          url: "/finances/withdrawal-requests",
          isVisible: true,
        },
        {
          title: t("finances.outgoing"),
          url: "/finances/outgoing",
          isVisible: true,
        },
        {
          title: t("finances.incoming"),
          url: "/finances/incoming",
          isVisible: true,
        },
        {
          title: t("finances.cash_and_bank_accounts"),
          url: "/finances/cash-and-bank-accounts",
          isVisible: true,
        },
      ],
    },
  ];
};

export default sidebarLinks;
