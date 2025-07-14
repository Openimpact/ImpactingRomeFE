"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

function ActiveLink({ children, href, className }: Props) {
  const path = usePathname();
  const router = useRouter();
  const style = {
    borderBottom: path === href ? "2px solid #fff" : "none",
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      style={style}
      className={"" + className}
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
