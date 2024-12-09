import { getTranslations } from "next-intl/server";
import ResetPasswordForm from "../../_components/forms/ResetPasswordForm";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("reset_password.title"),
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  console.log(token);
  return <ResetPasswordForm  token={token}/>;
}
