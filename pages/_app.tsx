import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";

import Layout from "@/components/Layout";
import AuthProvider from "@/components/AuthProvider";

import useApollo from "@/hooks/useApollo";

import "./globals.css";

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const client = useApollo(pageProps);
  return (
    <SessionProvider session={session}>
      <JotaiProvider>
        <ApolloProvider client={client}>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ApolloProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}

export default CustomApp;
