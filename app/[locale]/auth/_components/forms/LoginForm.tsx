"use client";
import React from "react";
import ChangeLocalization from "@/components/ChangeLocalization";
import Image from "@/components/reusable/Image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/services/authApi";
import { getLoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, LockKeyhole, EyeOff, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import z from "zod";
import Link from "@/components/reusable/Link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/auth-slice";
import { saveAuthToken } from "@/lib/cookies";
import { useRouter } from "@/i18n/routing";
type LoginFormInput = z.infer<ReturnType<typeof getLoginSchema>>;
const LoginForm: React.FC = () => {
  const { toast } = useToast();
  const [login, { isLoading }] = useLoginMutation();
  const t = useTranslations("Auth.login");
  const schema = getLoginSchema(useTranslations("Validation.auth"));
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<LoginFormInput>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "1@2.com",
      password: "11111",
    },
  });
  const onLoginSubmit = async (formData: LoginFormInput) => {
    await login(formData)
      .unwrap()
      .then((res) => {
        const { Authorization: token, data: user, expiresIn } = res;
        dispatch(setCredentials({ user, token, expiresIn }));
        saveAuthToken({ token, expiresIn });
        router.push("/ae/dashboard");
      })
      .catch((err) => {
        toast({
          description: err.data.message,
        });
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLoginSubmit)} className="form">
        <ChangeLocalization />
        <div className="flex justify-center mb-8 mt-8">
          <Image src="/logo.svg" width={160} height={100} alt="Logo" />
        </div>

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input mainIcon={<Mail />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input
                  mainIcon={<LockKeyhole />}
                  secondIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" flex gap-1 justify-end">
          <Link href={"/auth/forgot-password"}>{t("forgot_password")}</Link>
        </div>
        <Button type="submit" isLoading={isLoading}>
          {t("submit")}
        </Button>

        <div className=" flex gap-1">
          {t("no_account")}
          <Link href={"/auth/register"}>{t("register")}</Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
