import { getTranslations } from "next-intl/server";
import RegisterForm from "../_components/forms/RegisterForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("register.title"),
  };
}

export default function Page() {
  return <RegisterForm />;
}
