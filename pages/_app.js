import "../styles/index.css";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Darin Doria</title>
        <meta name="description" content="Personal website of Darin Doria." />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.css"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
