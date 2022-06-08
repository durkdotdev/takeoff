import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import { AiFillGithub } from "react-icons/ai";

import { DocumentationPageMetadata } from "../../types";
import Logo from "../Logo";
import Menu from "../Menu";
import Select from "../Select";

interface DocsNavigationProps {
  documentationPages: DocumentationPageMetadata[];
}

const DocsNavigation = ({ documentationPages }: DocsNavigationProps) => {
  const router = useRouter();

  const handleMenuPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    Router.push(`/${event.target.value}`);
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-center py-4 bg-white border-b border-black bg-opacity-90 backdrop-filter backdrop-blur-xl">
      <div className="flex items-center w-full max-w-[52rem] px-6">
        <div className="max-w-xs md:w-full">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        <div className="flex justify-end flex-1 w-full">
          <div className="px-4 py-2 lg:hidden">
            <Menu>
              <div className="flex flex-col items-center justify-center w-full h-screen space-y-8">
                <Link href="/">
                  <a className="!mb-16">
                    <Logo theme="light" />
                  </a>
                </Link>
                <Select
                  label="Select a Page"
                  onChange={handleMenuPageChange}
                  value={
                    router.query.slug
                      ? router.query.slug
                      : "cli-and-authentication"
                  }
                >
                  {documentationPages.map((documentationPage) => (
                    <option
                      key={documentationPage.slug}
                      value={documentationPage.slug}
                    >
                      {documentationPage.title}
                    </option>
                  ))}
                </Select>

                <a
                  className="!mt-16 p-2 hover:text-fuchsia-400"
                  href="https://github.com/durkdotdev/takeoff"
                  rel="noreferrer"
                  target="_blank"
                >
                  <AiFillGithub className="w-4 h-4" />
                </a>
              </div>
            </Menu>
          </div>
          <a
            className="p-2 hover:text-fuchsia-400"
            href="https://github.com/durkdotdev/takeoff"
            rel="noreferrer"
            target="_blank"
          >
            <AiFillGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default DocsNavigation;
