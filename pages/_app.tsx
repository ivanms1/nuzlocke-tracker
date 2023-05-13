import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

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
      <ApolloProvider client={client}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default CustomApp;
