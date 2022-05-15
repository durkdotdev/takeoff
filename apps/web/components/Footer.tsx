import Link from "next/link";
import { getEnvironmentURL } from "simple-ts-utils";
import { HighlightedText, LayoutLink } from "ui";

const footerLinksLeft = [
  {
    external: true,
    href: getEnvironmentURL(
      "http://localhost:3002",
      "https://takeoff-demo.durk.dev"
    ),
    title: "Demo"
  },
  {
    external: true,
    href: getEnvironmentURL(
      "http://localhost:3001",
      "https://takeoff-docs.durk.dev"
    ),
    title: "Docs"
  }
];

const footerLinksRight = [
  {
    external: true,
    href: "https://github.com/durkdotdev/takeoff",
    title: "GitHub"
  },
  { external: true, href: "https://twitter.com/durkdotdev", title: "Twitter" }
];

const Footer = () => {
  return (
    <footer className="flex justify-center py-8 border-t border-black bg-neutral-100">
      <div className="flex flex-col w-full max-w-6xl px-6 space-y-4">
        <Link href="/">
          <a style={{ width: "fit-content" }}>
            <HighlightedText>TAKEOFF</HighlightedText>
          </a>
        </Link>
        <div className="flex flex-wrap items-center w-full">
          <ul className="flex items-center mr-4 space-x-4 md:mr-0 md:space-x-8">
            {footerLinksLeft.map((link) => (
              <LayoutLink
                embolden={false}
                key={link.title}
                link={link}
                mobile={true}
              />
            ))}
          </ul>
          <div className="flex-1 hidden md:flex" />
          <ul className="flex items-center space-x-4 md:ml-0 md:space-x-8">
            {footerLinksRight.map((link) => (
              <LayoutLink
                embolden={false}
                key={link.title}
                link={link}
                mobile={true}
              />
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
