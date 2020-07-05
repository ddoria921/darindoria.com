import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-screen-sm mx-auto">
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/work-journal">
                <a>Work Journal</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="pt-8">
        <h1 className="text-3xl">🚧 Under Construction 🚧</h1>
        <p className="text-lg mt-4">
          Hi, I'm Darin. A frontend software engineer working out of Orlando,
          FL. This website is currently a work in progress, but in the meantime
          you can find me online at any of the links below.
        </p>
      </main>
      <footer className="py-8">
        <a
          className="text-lg text-blue-700 underline"
          href="https://twitter.com/_darindoria"
        >
          twitter
        </a>
        <span className="mx-2">&middot;</span>
        <a
          className="text-lg text-blue-700 underline"
          href="https://github.com/ddoria921"
        >
          github
        </a>
        <span className="mx-2">&middot;</span>
        <a
          className="text-lg text-blue-700 underline"
          href="https://www.linkedin.com/in/darindoria"
        >
          linkedin
        </a>
      </footer>
    </div>
  );
}
