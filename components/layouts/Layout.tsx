import Head from "next/head";
import { FC } from "react";
import { Navbar } from "../ui";

interface props {
  children: JSX.Element;
  title?: string;
}

export const Layout: FC<props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Luis B" />
        <meta name="description" content={`Pokemon information ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>

      {/* Navbar */}
      <Navbar />

      <main className="main-layout">{children}</main>
    </>
  );
};
