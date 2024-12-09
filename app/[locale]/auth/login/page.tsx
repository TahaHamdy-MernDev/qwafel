
import { getTranslations } from "next-intl/server";
import LoginForm from "../_components/forms/LoginForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("login.title"),
  };
}

export default function Page() {
  return <LoginForm/>;
}
