"use client";
import React from "react";
import ChangeLocalization from "@/components/ChangeLocalization";
import Image from "@/components/reusable/Image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useLoginMutation } from "@/redux/services/authApi";
import { getLoginSchema, getRegisterSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, LockKeyhole, EyeOff, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import z from "zod";
import Link from "@/components/reusable/Link";
type LoginFormInput = z.infer<ReturnType<typeof getLoginSchema>>;
const LoginForm: React.FC = () => {
  // const [login, {isLoading,error}]= useLoginMutation()
  // const response = await login(formData).unwrap();
  const t = useTranslations("Auth.login");
  const schema = getRegisterSchema(useTranslations("Validation.auth"));
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { register, handleSubmit } = useForm<LoginFormInput>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData: LoginFormInput) => {
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
        placeholder={t("email")}
        label={t("email")}
        mainIcon={<Mail />}
        {...register("email")}
      />
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={t("password")}
        label={t("password")}
        mainIcon={<LockKeyhole />}
        secondIcon={
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        }
        {...register("password")}
      />
      <div className=" flex gap-1 justify-end">
        
        <Link href={"/auth/forgot-password"}>{t("forgot_password")}</Link>
      </div>
      <Button type="submit">
        {t("submit")}
      </Button>
      <div className=" flex gap-1">
        {t("no_account")}
        <Link href={"/auth/register"}>{t("register")}</Link>
      </div>
    </form>
  );
};

export default LoginForm;
