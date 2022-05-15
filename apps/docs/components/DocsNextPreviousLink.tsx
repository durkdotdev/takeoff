import Link from "next/link";

interface DocsNextPreviousLinkProps {
  direction: "next" | "previous";
  page: {
    slug: string;
    title: string;
  };
}

const DocsNextPreviousLink = ({
  direction,
  page
}: DocsNextPreviousLinkProps) => {
  const className = ["group flex flex-col space-y-1 text-center"];
  className.push(direction === "next" ? "sm:text-right" : "sm:text-left");
  return (
    <Link href={`/${page.slug}`}>
      <a className={className.join(" ")}>
        <span className="text-sm uppercase font-extralight">{direction}</span>
        <span className="font-bold underline transition-all ease-in decoration-fuchsia-400 decoration-2 group-hover:text-fuchsia-400">
          {page.title}
        </span>
      </a>
    </Link>
  );
};

export default DocsNextPreviousLink;
