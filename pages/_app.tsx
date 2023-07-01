import { type ReactElement, type ReactNode, useEffect } from "react";
import { type NextPage } from "next";
import { ApolloProvider } from "@apollo/client";
import { type AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";

import AuthProvider from "@/components/AuthProvider";

import useApollo from "@/hooks/useApollo";

import "./globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const client = useApollo(pageProps);

  useEffect(() => {
    document.querySelector("body")?.classList.add("dark");
  });

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <JotaiProvider>
        <ApolloProvider client={client}>
          <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </ApolloProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}

export default CustomApp;
