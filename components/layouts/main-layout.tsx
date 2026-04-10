import Head from "next/head";
import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

import AppMetaHead from "../common/app-meta-head";
import Nav from "../common/nav";
import Footer from "../common/footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <AppMetaHead />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Nav />
      <Flex
        as="main"
        w="100%"
        minH="calc(100vh - 80px)"
        justifyContent="center"
        alignItems="flex-start"
        py={{ base: 4, md: 8 }}
        px={{ base: 0, sm: 4, md: 6 }}
        bg="gray.50"
      >
        {props.children}
      </Flex>
      <Footer />
    </>
  );
}
