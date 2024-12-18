import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "@/i18n/routing";

interface WithAuthProps {
  [key: string]: unknown;
}

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ProtectedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = Cookies.get("auth_token");
      if (!token) {
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (!isAuthenticated) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;
