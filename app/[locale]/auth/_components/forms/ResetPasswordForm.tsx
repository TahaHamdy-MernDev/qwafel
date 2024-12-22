"use client";
import ChangeLocalization from "@/components/ChangeLocalization";
import Image from "@/components/reusable/Image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/routing";
import { useResetPasswordMutation } from "@/redux/services/authApi";
import { getResetPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IResetPasswordForm {
  token: string;
}
type ResetPasswordInputs = z.infer<ReturnType<typeof getResetPasswordSchema>>;

const ResetPasswordForm: React.FC<IResetPasswordForm> = ({ token }) => {
  const { toast } = useToast();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  console.log(token);
  const t = useTranslations("Auth.reset_password");
  const schema = getResetPasswordSchema(useTranslations("Validation.auth"));
  const router = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ResetPasswordInputs) => {
    data = { ...data, token };
    await resetPassword(data)
      .unwrap()
      .then(() => {
        toast({
          description: "success",
        });
        clearErrors();
        reset();
        router.push("/auth/login");
      });
    console.log("Form submitted successfully:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <ChangeLocalization />
      <div className="flex justify-center mb-8 mt-8">
        <Image src="/logo.svg" width={160} height={100} alt="Logo" />
      </div>

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
        hasError={errors.password}
        errorMessage={errors.password?.message}
        clearFieldError={() => clearErrors("password")}
      />
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={t("confirm_password")}
        label={t("confirm_password")}
        mainIcon={<LockKeyhole />}
        secondIcon={
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        }
        {...register("confirm_password")}
        hasError={!!errors.confirm_password}
        errorMessage={errors.confirm_password?.message}
        clearFieldError={() => clearErrors("confirm_password")}
      />
      <Button type="submit" isLoading={isLoading}>
        {t("submit")}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
