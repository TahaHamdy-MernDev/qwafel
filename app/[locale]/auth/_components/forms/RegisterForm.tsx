"use client";
import React from "react";
// import { useRegisterMutation } from '@/redux/services/authApi';
import { getRegisterSchema } from "@/schemas/auth";
import { useTranslations } from "next-intl";
import {
  Contact,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Image from "@/components/reusable/Image";
import { Button } from "@/components/ui/button";
import Link from "@/components/reusable/Link";
import ChangeLocalization from "@/components/ChangeLocalization";

type RegisterSchema = ReturnType<typeof getRegisterSchema>;
type RegisterFormInputs = z.infer<RegisterSchema>;
const RegisterForm: React.FC = () => {
  // const [register,{isLoading,error}]= useRegisterMutation()
  // const response = await register(formData).unwrap();
  const t = useTranslations("Auth.register");
  const schema = getRegisterSchema(useTranslations("Validation.auth"));
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { register, handleSubmit } = useForm<RegisterFormInputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData: RegisterFormInputs) => {
    // await register(formData);
    console.log(formData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form"
    >
      <ChangeLocalization/>
      <div className="flex justify-center mb-8 mt-8">
        <Image src="/logo.svg" width={160} height={100} alt="Logo" />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          type="text"
          mainIcon={<User />}
          label={t("first_name")}
          placeholder={t("first_name")}
          {...register("first_name")}
        />
        <Input
          type="text"
          label={t("last_name")}
          placeholder={t("last_name")}
          mainIcon={<Contact />}
          {...register("last_name")}
        />
      </div>
      <Input
        type="email"
        label={t("email")}
        placeholder={t("email")}
        mainIcon={<Mail />}
        {...register("email")}
      />
      <Input
        type="text"
        label={t("phone_number")}
        placeholder={t("phone_number")}
        mainIcon={<Phone />}
        {...register("phone_number")}
      />
      <Input
        type={showPassword ? "text" : "password"}
        label={t("password")}
        placeholder={t("password")}
        mainIcon={<LockKeyhole />}
        secondIcon={
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        }
        {...register("password")}
      />
      <Button type="submit" className="mt-4 ">
        {t("submit")}
      </Button>
     <div className=" flex gap-1">
      {t("already_registered")}
       <Link href={'/auth/login'} >{t("login")}</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
