"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const categories = [
    { name: "Bollywood", path: "/category/bollywood" },
    { name: "Hollywood", path: "/category/hollywood" },
    { name: "Dual Audio", path: "/category/dual-audio" },
    { name: "South Indian", path: "/category/south-indian" },
    { name: "Web Series", path: "/category/web-series" },
  ];

  const getLinkClass = (path) => {
    const isHome = path === "/";
    const isActive = isHome ? pathname === "/" : pathname.startsWith(path);
    return isActive ? "nav-link active" : "nav-link";
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          <span className="logo-text">Movie</span>
          <span className="logo-highlight">Hub</span>
        </Link>

        <nav className="nav">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.path}
              href={cat.path}
              className={getLinkClass(cat.path)}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
