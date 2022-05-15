import Link from "next/link";
import { useRouter } from "next/router";

import { DocumentationPageMetadata } from "../types";

interface DocsLinkProps {
  documentationPage: DocumentationPageMetadata;
}

const DocsLink = ({ documentationPage }: DocsLinkProps) => {
  const router = useRouter();

  const active =
    router.asPath === `/${documentationPage.slug}` ||
    (router.asPath === "/" &&
      documentationPage.index === 0 &&
      documentationPage.slug === "authentication");
  const className = [
    "transition transition-all ease-in py-1 pr-6 hover:font-bold"
  ];
  if (active) className.push("relative font-bold");
  if (documentationPage.slug === "cli-and-authentication")
    documentationPage.slug = "";

  return (
    <Link href={`/${documentationPage.slug}`} key={documentationPage.slug}>
      <a className={className.join(" ")}>
        <span>{documentationPage.title}</span>
        {active && (
          <div className="absolute top-0 right-0 w-1.5 h-full bg-fuchsia-400 border-y border-l border-black" />
        )}
      </a>
    </Link>
  );
};

export default DocsLink;
