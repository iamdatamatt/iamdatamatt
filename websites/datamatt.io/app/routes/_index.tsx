import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { generateMeta } from "../utils/meta";

const canonical = "https://datamatt.io";

export const meta: MetaFunction = () => {
  return generateMeta({
    metaTitle: "Matt Trombley | Data Scientist & Tech Consultant",
    metaDescription:
      "The digital profile of Matt Trombley, showcasing personal projects, work experience, and the best Clemson has to offer.",
    imageUrl: "https://datamatt.io/social-card.png",
    imageAlt: "Matt Trombley profile cover image",
    canonical,
    breadcrumbs: [
      {
        name: "Home",
        item: "https://datamatt.io",
      },
    ],
  });
};

export const links: LinksFunction = () => {
  return [
    { rel: "canonical", href: canonical },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96",
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
  ];
};

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

const workHistory = [
  {
    company: "Shopify",
    link: "https://www.shopify.com",
    logo: "/shopify-logo.svg",
    roles: [
      {
        title: "Senior Data Scientist",
        years: "2023 - Present",
      },
    ],
  },
  {
    company: "8 Bits Wiser",
    link: "https://8bitswiser.com",
    logo: "/8-bits-wiser-logo.svg",
    roles: [
      {
        title: "Founder & Lead Consultant",
        years: "2022 - Present",
      },
    ],
  },
  {
    company: "Fidelity Investments",
    link: "https://www.fidelity.com",
    logo: "/fidelity-investments-logo.svg",
    roles: [
      {
        title: "Principal Data Scientist",
        years: "2021 - 2023",
      },
      {
        title: "Senior Data Scientist",
        years: "2021 - 2021",
      },
      {
        title: "Data Scientist",
        years: "2019 - 2020",
      },
    ],
  },
];

export default function Index() {
  return (
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
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Matt Trombley
            <img
              src="/data-matt-logo.svg"
              alt="Data Matt Logo"
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </h1>
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

        {/* Work History Section */}
        <div className="mb-12">
          <div
            className="space-y-6 bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all
                         transform hover:-translate-y-1 cursor-default"
          >
            <h2 className="text-2xl font-semibold mb-6 text-left">
              Work Experience
            </h2>
            {workHistory.map((job, index) => (
              <div key={index}>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-emerald-400 text-left">
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener"
                      className="hover:text-emerald-300 transition-colors"
                    >
                      {job.company}
                    </a>
                  </h3>
                  <a href={job.link} target="_blank" rel="noopener">
                    <img
                      src={job.logo}
                      alt={`${job.company} logo`}
                      loading="lazy"
                      className="w-8 h-8 object-contain"
                      width={32}
                      height={32}
                    />
                  </a>
                </div>
                <div className="space-y-1">
                  {job.roles.map((role, roleIndex) => (
                    <div
                      key={roleIndex}
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-2"
                    >
                      <span className="text-gray-300">{role.title}</span>
                      <span className="h-[1px] w-full bg-gray-600"></span>
                      <span className="text-gray-400 text-sm whitespace-nowrap">
                        {role.years}
                      </span>
                    </div>
                  ))}
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

      {/* Add styles for profile picture border */}
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
  );
}
