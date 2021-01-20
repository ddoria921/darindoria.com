import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

export default function Header() {
  const { pathname } = useRouter();
  const isOnHome = pathname === "/";

  return (
    <header className="flex-none">
      <nav role="navigation" aria-label="Site">
        <ul className="flex justify-end">
          {!isOnHome && (
            <li className="pr-4">
              <NavLink href="/">Home</NavLink>
            </li>
          )}
          <li className="pr-4">
            <NavLink href="/work-journal">Work Journal</NavLink>
          </li>
          <li className="pr-4">
            <NavLink href="/blog">Blog</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <ActiveLink
      activeClassName="text-blue-900 border-blue-900 dark:text-indigo-600 dark:border-indigo-600"
      href={href}
    >
      <a className="text-lg text-blue-700 border-blue-700 lg:text-2xl dark:text-indigo-400 dark:border-indigo-400 hover:border-b-2">
        {children}
      </a>
    </ActiveLink>
  );
}

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};
