import { Links, Meta, Scripts } from "@remix-run/react";

const profileLinks = [
  {
    title: "Lists Of Things To Do In Clemson, SC",
    description:
      "All things Clemson - the official bucket list, on-campus disc golf courses, and more.",
    link: "/clemson",
  },
  {
    title: "8 Bits Wiser - Tech & Data Consulting",
    description: "I help small businesses and startups with their tech needs.",
    link: "https://8bitswiser.com",
  },
  {
    title: "Current Resume",
    description: "A link to my current resume in PDF format.",
    link: "https://cdn.datamatt.io/Matthew_Trombley_Resume.pdf",
  },
];

// Add type for the page variant
type FallbackVariant = "not_found" | "error";

interface FallbackProps {
  variant?: FallbackVariant;
}

export function Fallback({ variant = "not_found" }: FallbackProps) {
  // Add content configuration based on variant
  const pageContent = {
    not_found: {
      title: "Page Not Found",
      message:
        "The page you're looking for doesn't exist. You might find what you're looking for in the links below. Otherwise, you can",
    },
    error: {
      title: "Oops! Something went wrong",
      message:
        "We encountered an unexpected error while processing your request. You can try refreshing the page or",
    },
  };

  const content = pageContent[variant];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <Meta />
        <Links />
        <title>Page Not Found</title>
      </head>
      <body>
        <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-gray-900 text-gray-100">
          <main className="max-w-3xl w-full text-center">
            {/* Header */}
            <div className="flex justify-between items-center w-full mb-12">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-gray-700 animate-spin"></div>
                <img
                  src="/matt-trombley-profile-pic-192.webp"
                  alt="Matt Trombley"
                  className="relative w-24 h-24 rounded-full object-cover 
                       p-[3px] bg-gray-900
                       transition-transform hover:scale-105"
                  width={90}
                  height={90}
                />
              </div>
              <h1 className="text-3xl font-bold">Matt Trombley</h1>
            </div>

            {/* Error Message */}
            <div className="mb-12">
              <div
                className="space-y-6 bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all
                         transform hover:-translate-y-1 cursor-default"
              >
                <h2 className="text-2xl font-semibold mb-6 text-left">
                  {content.title}
                </h2>
                <div>
                  <div className="space-y-1">
                    <div className="grid grid-cols-[auto_1fr_auto] text-left gap-2">
                      <span className="text-gray-300">
                        {content.message}{" "}
                        <a
                          href="/"
                          className="text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          click here
                        </a>{" "}
                        to return home.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="mb-12">
              <div
                className="space-y-6 bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all
                         transform hover:-translate-y-1 cursor-default"
              >
                <h2 className="text-2xl font-semibold mb-6 text-left">Links</h2>
                {profileLinks.map((profileLink, index) => (
                  <div key={index}>
                    <div className="grid grid-cols-[1fr_auto] items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-emerald-400 text-left">
                        <a
                          href={profileLink.link}
                          target="_blank"
                          rel="noopener"
                          className="hover:text-emerald-300 transition-colors"
                        >
                          {profileLink.title}
                        </a>
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <div className="grid grid-cols-[auto_1fr_auto] text-left gap-2">
                        <span className="text-gray-300">
                          {profileLink.description}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-8 mb-12">
              <a
                href="https://www.linkedin.com/in/iamdatamatt/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
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
                >
                  <path d="M8 11v5"></path>
                  <path d="M8 8v.01"></path>
                  <path d="M12 16v-5"></path>
                  <path d="M16 16v-3a2 2 0 1 0 -4 0"></path>
                  <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"></path>
                </svg>
              </a>
              <a
                href="https://github.com/iamdatamatt"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
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
                >
                  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                </svg>
              </a>
              <a
                href="https://x.com/iamdatamatt"
                target="_blank"
                rel="noopener"
                aria-label="X (Twitter)"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
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
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              </a>
              <a
                href="mailto:mattrtrombley@gmail.com"
                aria-label="Email"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
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
                >
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                  <path d="M3 7l9 6l9 -6"></path>
                </svg>
              </a>
            </div>

            <hr className="border-gray-700 my-12" />

            <footer className="text-sm text-gray-500 mb-8">
              © Matt Trombley. All rights reserved.
            </footer>
          </main>

          {/* Add styles for wave animation */}
          <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 3s linear infinite;
        }
      `}</style>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
