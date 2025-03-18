import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@remix-run/react";

const navItems = [
  { name: "Home", href: "/clemson" },
  { name: "Bucket List", href: "/bucketlist" },
  { name: "Fun Places", href: "/funplaces" },
  { name: "Hiking", href: "/hiking" },
  { name: "Outdoors", href: "/outdoors" },
  { name: "Attractions", href: "/attractions" },
  { name: "Disc Golf", href: "/clemson-disc-golf" },
];

export function useClickOutside(handler: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler]);

  return ref;
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const ref = useClickOutside(() => setIsOpen(false));

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isCurrentRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="bg-gray-800" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link to="/" prefetch="intent" className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <img
                  src="/data-matt-logo.svg"
                  alt="Data Matt Logo"
                  className="w-10 h-10"
                  width={40}
                  height={40}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:ml-6 md:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  prefetch="intent"
                  className={`py-2 transition-colors ${
                    isCurrentRoute(item.href)
                      ? "text-white font-medium"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white p-2 rounded-md"
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M18 6l-12 12"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M4 6l16 0"></path>
                  <path d="M4 12l16 0"></path>
                  <path d="M4 18l16 0"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden transition-all duration-200 ease-in-out absolute w-full bg-gray-800 shadow-lg z-50`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              prefetch="intent"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isCurrentRoute(item.href)
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
