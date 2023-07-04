import Image from "next/image";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const NavBar: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <nav className="w-full h-[50px] bg-dark-layer-1">
      <div
        className={`h-full flex items-center justify-between px-2 sm:px-14 ${className}`}
      >
        <Link href="/" className="flex items-center justify-center h-20">
          <Image src="/logos1.png" alt="LeetClone" height={100} width={100} />
        </Link>
        {children}
      </div>
    </nav>
  );
};

export default NavBar;
