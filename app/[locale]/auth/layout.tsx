export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className=" relative mx-auto h-svh w-screen flex items-center justify-center p-4">
      {/* <div className="bg-curve-top"></div> */}
      {/* <div className="bg-curve-bottom "></div> */}
      {children}
      </section>
  );
}
