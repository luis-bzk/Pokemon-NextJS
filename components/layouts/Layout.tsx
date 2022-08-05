import Head from "next/head";
import { FC } from "react";
import { Navbar } from "../ui";

interface props {
  children: JSX.Element;
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Luis B" />
        <meta name="description" content={`Pokemon information ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`Information about ${title}`} />
        <meta
          property="og:description"
          content={`The first Pokemon generation, about ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      {/* Navbar */}
      <Navbar />

      <main className="main-layout">{children}</main>
    </>
  );
};
