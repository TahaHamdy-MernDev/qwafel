import { notFound } from "next/navigation";
const allowedCountry= ["sa", "ae"]
export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ country: string }>;
}>) {
  const { country } = await params;
  if(!allowedCountry.includes(country)){
    notFound();
  }
  return <section>{children}</section>;
}
