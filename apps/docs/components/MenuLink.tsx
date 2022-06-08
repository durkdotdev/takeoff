import Link from "next/link";

interface MenuLinkProps {
  embolden?: boolean;
  link: {
    external: boolean;
    href: string;
    title: string;
  };
}

const MenuLink = ({ link }: MenuLinkProps) => {
  const className = ["px-4 py-1 font-bold text-2xl hover:underline uppercase"];
  return (
    <Link href={link.href}>
      <a
        className={className.join(" ")}
        rel="noreferrer"
        target={link.external ? "_blank" : "_self"}
      >
        {link.title}
      </a>
    </Link>
  );
};

export default MenuLink;
