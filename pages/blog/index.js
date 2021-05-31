// For getStaticProps
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";

import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Personal Blog by Darin</title>
        <meta name="description" content="Personal blog of Darin Doria." />
      </Head>

      <div>
        <Header />
        <main className="max-w-xl mx-auto px-4 mt-4 sm:mt-12 sm:px-6 xl:max-w-3xl xl:px-0">
          <h1 className="mt-2 mx-auto text-3xl leading-8 font-extrabold tracking-tight text-gray-900 w-full md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg sm:text-4xl sm:leading-10 dark:text-gray-200">
            Personal Blog by Darin
          </h1>
          <ul className="py-8">
            {posts.map((post) => (
              <li key={post.filePath}>
                <article>
                  <header>
                    <Link
                      as={`/blog/${post.filePath.replace(/\.mdx?$/, "")}`}
                      href={`/blog/[slug]`}
                    >
                      <a>
                        <h2 className="text-3xl leading-8 mb-2 font-semibold text-gray-900 sm:mb-0 sm:leading-10 dark:text-gray-200 hover:underline">
                          {post.data.title}
                        </h2>
                      </a>
                    </Link>
                    <span className="text-gray-600 text-sm dark:text-gray-400">
                      <time dateTime={post.data.publishedOn}>
                        {post.data.publishedOnFriendly}
                      </time>
                      <span> &middot; </span>
                      <span>{post.data.readTime} read</span>
                    </span>
                  </header>

                  <section className="text-gray-800 py-2 dark:text-gray-200">
                    <p>{post.data.description}</p>
                    <p className="mt-2">
                      <Link
                        as={`/blog/${post.filePath.replace(/\.mdx?$/, "")}`}
                        href={`/blog/[slug]`}
                      >
                        <a className="group border-b-2 pb-1 text-blue-600 border-blue-600 dark:text-indigo-400 dark:border-indigo-400">
                          Read More
                          <svg
                            className="w-4 h-4 inline ml-1 transition-transform transform duration-150 ease-in-out group-hover:translate-x-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                      </Link>
                    </p>
                  </section>
                </article>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
