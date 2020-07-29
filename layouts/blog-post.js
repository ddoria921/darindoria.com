import Head from "next/head";
import Link from "next/link";

export default function BlogPostLayout(frontMatterData) {
  return ({ children: content }) => {
    return (
      <>
        <Head>
          <title>{`${frontMatterData.title} – ${frontMatterData.author}`}</title>
          <meta name="description" content={frontMatterData.description} />
        </Head>
        <main className="max-w-2xl mx-auto px-4 mt-4 mb-16 sm:mt-12 sm:px-6 xl:max-w-3xl xl:px-0">
          <p>
            <Link href="/blog">
              <a className="group border-b-2 pb-1 text-blue-600 border-blue-600 dark:text-indigo-400 dark:border-indigo-400">
                <svg
                  className="w-4 h-4 inline -mt-1 mr-1 transition-transform transform duration-150 ease-in-out group-hover:-translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Back to Blog
              </a>
            </Link>
          </p>
          <article className="mx-auto">
            <header className="py-6 lg:pb-8 xl:pb-10">
              <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-4xl md:leading-10 lg:text-5xl lg:mb-2 dark:text-gray-200">
                {frontMatterData.title}
              </h1>
              <div className="flex items-center text-sm pt-4 pb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="/avatar-darin.jpg"
                    alt="Darin's profile image"
                  />
                </div>
                <div className="flex flex-col pl-4 text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{frontMatterData.author}</span>
                  <span>
                    <time dateTime={frontMatterData.publishedOn}>
                      {frontMatterData.publishedOnFriendly}
                    </time>{" "}
                    &middot; {frontMatterData.readTime} read
                  </span>
                </div>
              </div>
            </header>

            <div className="prose lg:prose-xl">{content}</div>
          </article>
        </main>
      </>
    );
  };
}
