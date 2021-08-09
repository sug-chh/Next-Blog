import Head from "next/head";
import Header from "./Header";

export default function Layout({ title, children, keywords, description }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords}></meta>
        <meta name="description" content={description}></meta>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header/>
      <main className='container mx-auto my-7'>{children}</main>
    </div>
  );
}

Layout.defaultProps = {
  title: "Welcome to DevSpace",
  keywords: "development , coding, programming",
  description: "The best info and news in development",
};
