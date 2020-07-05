import "../styles/index.css";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Darin Doria</title>
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
