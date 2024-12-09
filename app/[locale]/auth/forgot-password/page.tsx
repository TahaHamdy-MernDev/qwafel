import { getTranslations } from "next-intl/server";
import ForgotPasswordForm from "../_components/forms/ForgotPasswordForm";
export async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });
  
    return {
      title: t("forgot_password.title"),
    };
  }
export default function Page() {
    return (
        <ForgotPasswordForm/>
    );
}