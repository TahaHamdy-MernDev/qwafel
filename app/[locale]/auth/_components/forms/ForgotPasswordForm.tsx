"use client";
import ChangeLocalization from "@/components/ChangeLocalization";
import Image from "@/components/reusable/Image";
import Link from "@/components/reusable/Link";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { getForgotPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ForgotPasswordInputs = z.infer<ReturnType<typeof getForgotPasswordSchema>>;

const ForgotPasswordForm: React.FC = () => {
  const t = useTranslations("Auth.forgot_password");
  const schema = getForgotPasswordSchema(useTranslations("Validation.auth"));
  const { register, handleSubmit } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData: ForgotPasswordInputs) => {
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <ChangeLocalization />
      <div className="flex justify-center mb-8 mt-8">
        <Image src="/logo.svg" width={160} height={100} alt="Logo" />
      </div>

      <Input
        type="email"
        label={t("email")}
        placeholder={t("email")}
        mainIcon={<Mail />}
        {...register("email")}
      />
      <div className=" hidden">{t("reset_password_sent")}</div>
      <Button type="submit">{t("submit")}</Button>
      <Button className=" bg-white border hover:bg-transparent">
        <Link href={"/auth/login"} className=" text-black no-underline">
          {t("back")}
        </Link>
      </Button>
      <div className=" flex gap-1">
        {t("no_account")}
        <Link href={"/auth/register"}>{t("register")}</Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
