"use client";
import { usePathname } from "@/i18n/routing";

const useCountry = () => {
  const router = usePathname();
  let country: string = "";
  const match = RegExp(/\/(sa|ae|eg)/).exec(router);
  if (match) {
    country = match[1];
  }
  return country;
};

export default useCountry;
