import Link from "next/link";
import { TwitterIcon, LinkedInIcon, GitHubIcon } from "../components/Icons";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto py-6 px-3">
      <header className="flex-none">
        <nav role="navigation" aria-label="Site">
          <ul className="flex justify-end">
            <li className="pr-4">
              <NavLink href="/work-journal">Work Journal</NavLink>
            </li>
            <li className="pr-4">
              <NavLink href="/blog">Blog</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="home-container pt-16 px-4 flex-grow flex justify-center">
        <div className="lg:w-full xl:w-3/4">
          <h1 className="text-5xl leading-12 md:text-7xl md:leading-18 font-bold lg:text-8xl lg:leading-19 lg:max-w-4xl xl:text-9xl xl:leading-20 clip-text text-gradient">
            Software engineer based in Orlando. Currently writing code at
            Wistia.
          </h1>
        </div>
      </main>
      <footer className="py-2 flex flex-none justify-around px-12 pt-12 sm:pt-4 sm:px-4 sm:justify-end">
        <div className="ml-6">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/_darindoria"
            title="Twitter"
            aria-label="Twitter"
          >
            <TwitterIcon className="text-gray-900 dark:text-gray-200 w-8 h-8 lg:w-10 lg:h-10" />
          </a>
        </div>

        <div className="ml-6">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ddoria921"
            title="GitHub"
            aria-label="GitHub"
          >
            <GitHubIcon className="text-gray-900 dark:text-gray-200 w-8 h-8 lg:w-10 lg:h-10" />
          </a>
        </div>

        <div className="ml-6">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/darindoria"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="text-gray-900 dark:text-gray-200 w-8 h-8 lg:w-10 lg:h-10" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <Link href={href}>
      <a className="text-lg text-blue-700 border-b-2 border-blue-700 lg:text-2xl dark:text-indigo-400 dark:border-indigo-400">
        {children}
      </a>
    </Link>
  );
}
