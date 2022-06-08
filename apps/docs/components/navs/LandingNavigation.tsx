import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

import LayoutLink from "../LayoutLink";
import Logo from "../Logo";
import Menu from "../Menu";
import MenuLink from "../MenuLink";

const navigationLinks = [
  {
    external: false,
    href: "/docs",
    title: "Docs"
  }
];

const LandingNavigation = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-center bg-white border-b border-black bg-opacity-90 backdrop-filter backdrop-blur-xl">
      <div className="flex items-center justify-between w-full max-w-6xl px-6">
        <div className="flex w-44">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        <ul className="flex items-center md:space-x-6 lg:space-x-8">
          {navigationLinks.map((link) => (
            <li key={link.title}>
              <LayoutLink link={link} />
            </li>
          ))}
          <li className="md:hidden">
            <div className="mr-8">
              <Menu>
                <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
                  <Link href="/">
                    <a className="!mb-16">
                      <Logo theme="light" />
                    </a>
                  </Link>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {navigationLinks.map((link) => (
                      <MenuLink key={link.title} link={link} />
                    ))}
                  </div>

                  <a
                    className="!mt-16 p-2 hover:underline"
                    href="https://github.com/durkdotdev/takeoff"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Source Code
                  </a>
                </div>
              </Menu>
            </div>
          </li>

          <li>
            <a
              className="p-2 hover:text-fuchsia-400"
              href="https://github.com/durkdotdev/takeoff"
              rel="noreferrer"
              target="_blank"
            >
              <AiFillGithub className="w-5 h-5" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LandingNavigation;
