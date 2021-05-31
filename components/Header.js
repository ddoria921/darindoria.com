import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

export default function Header({ forceLightMode }) {
  const { pathname } = useRouter();
  const isOnHome = pathname === "/";

  return (
    <header className="flex-none py-10">
      <nav role="navigation" aria-label="Site">
        <ul className="flex justify-end">
          {!isOnHome && (
            <li className="pr-4">
              <NavLink forceLightMode={forceLightMode} href="/">
                Home
              </NavLink>
            </li>
          )}
          <li className="pr-4">
            <NavLink forceLightMode={forceLightMode} href="/blog">
              Blog
            </NavLink>
          </li>
          <li className="pr-4">
            <NavLink forceLightMode={forceLightMode} href="/videos">
              Videos
            </NavLink>
          </li>
          <li className="pr-4">
            <NavLink forceLightMode={forceLightMode} href="/work-journal">
              Work Journal
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function NavLink({ href, children, forceLightMode }) {
  const activeClasses = forceLightMode
    ? "text-gray-500 border-gray-500"
    : "text-blue-900 border-blue-900";
  const textClasses = forceLightMode
    ? "text-gray-200 border-gray-200"
    : "text-blue-700 border-blue-700 dark:text-indigo-400 dark:border-indigo-400";
  return (
    <ActiveLink activeClassName={`border-b-2 ${activeClasses}`} href={href}>
      <a className={`text-lg lg:text-2xl hover:border-b-2 ${textClasses}`}>
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
