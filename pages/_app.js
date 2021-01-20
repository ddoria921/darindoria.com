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

  const svgIcon =
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚡️</text></svg>';

  return (
    <>
      <Head>
        <title>Darin Doria</title>
        <meta name="description" content="Personal website of Darin Doria." />
        <link rel="icon" href={svgIcon} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {process.env.NODE_ENV === "production" && (
          <script
            async
            defer
            data-domain="darindoria.com"
            src="https://plausible.io/js/plausible.js"
          ></script>
        )}
      </Head>
      <div className={`${pageClass}`} style={pageStyle}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
