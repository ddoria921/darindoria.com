import Head from "next/head";
import "../styles/index.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let pageClass = "";
  let pageStyle = {};

  if (router.pathname.includes("/work-journal")) {
    pageClass = "light:bg-gray-100";
  }

  return (
    <>
      <Head>
        <title>Darin Doria</title>
        <meta name="description" content="Personal website of Darin Doria." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${pageClass}`} style={pageStyle}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
