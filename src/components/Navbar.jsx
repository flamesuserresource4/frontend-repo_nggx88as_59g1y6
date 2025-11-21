import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { label: "Work", to: "#work" },
    { label: "About", to: "#about" },
    { label: "Capabilities", to: "#capabilities" },
    { label: "Process", to: "#process" },
    { label: "Guest Book", to: "#guestbook" },
    { label: "Contact", to: "#contact" },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur-md bg-black/40 border-b border-white/10"
          : "bg-transparent"
      }`}
      aria-label="Primary navigation"
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">
          Ayan Mondal
        </a>
        <ul className="hidden md:flex gap-6">
          {items.map((i) => (
            <li key={i.to}>
              <a
                href={i.to}
                className="text-sm hover:text-violet-400 transition-colors focus:outline-none focus-visible:ring-2 ring-violet-400 rounded"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
