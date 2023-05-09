import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const PUBLIC_ROUTES = ["/", "/login", "/signup"];

interface AuthProvider {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProvider) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "unauthenticated" &&
      !PUBLIC_ROUTES.includes(router.pathname)
    ) {
      router.replace("/");
    }

    if (status === "authenticated" && PUBLIC_ROUTES.includes(router.pathname)) {
      router.replace("/profile");
    }
  }, [status]);

  return <>{children}</>;
}

export default AuthProvider;
