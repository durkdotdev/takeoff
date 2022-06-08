import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutLinkProps {
  embolden?: boolean;
  link: {
    external: boolean;
    href: string;
    title: string;
  };
  mobile?: boolean;
}

const LayoutLink = ({
  embolden = true,
  link,
  mobile = false
}: LayoutLinkProps) => {
  const router = useRouter();
  const className = ["text-sm uppercase"];
  if (embolden && router.asPath === link.href) {
    className.push("font-bold");
  } else {
    className.push("font-light opacity-75 hover:opacity-100 hover:underline");
  }
  const containerClassName = mobile ? "block" : "hidden md:block";
  return (
    <div className={containerClassName}>
      <Link href={link.href}>
        <a
          className={className.join(" ")}
          rel="noreferrer"
          target={link.external ? "_blank" : "_self"}
        >
          {link.title}
        </a>
      </Link>
    </div>
  );
};

export default LayoutLink;
