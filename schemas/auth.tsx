import { useTranslations } from "next-intl";
import { z } from "zod";

export const getLoginSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z
      .string()
      .min(1, t("email.required"))
      .email(t("email.invalid")),
    password: z.string().min(1, t("password.required")),
  });
  export const getResetPasswordSchema = (t: ReturnType<typeof useTranslations>) =>
    z
      .object({
        password: z.string().min(1, t("password.required")),
        confirm_password: z.string().min(1, t("confirm_password.required")),
      })
      .refine((data) => data.password === data.confirm_password, {
        message: t("confirm_password.mismatch"),
        path: ["confirm_password"], 
      });
  
export const getForgotPasswordSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z
      .string()
      .min(1, t("email.required"))
      .email(t("email.invalid")),
  });
export const getRegisterSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    first_name: z.string().min(1, t("first_name.required")),
    last_name: z.string().min(1, t("last_name.required")),
    phone_number: z.string().min(1, t("phone_number.required")),
    email: z
      .string()
      .min(1, t("email.required"))
      .email(t("email.invalid")),
    password: z.string().min(1, t("password.required")),
  });
