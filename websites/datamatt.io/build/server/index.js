import { jsx, jsxs } from "react/jsx-runtime";
import { RemixServer, Meta, Links, Scripts, Outlet, ScrollRestoration, useRouteError, isRouteErrorResponse, useLocation, Link, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { useRef, useEffect, useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
const ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY);
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(
      RemixServer,
      {
        context: remixContext,
        url: request.url,
        abortDelay: ABORT_DELAY
      }
    ),
    {
      signal: controller.signal,
      onError(error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
        responseStatusCode = 500;
      }
    }
  );
  body.allReady.then(() => clearTimeout(timeoutId));
  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const profileLinks$1 = [
  {
    title: "Lists Of Things To Do In Clemson, SC",
    description: "All things Clemson - the official bucket list, on-campus disc golf courses, and more.",
    link: "/clemson"
  },
  {
    title: "8 Bits Wiser - Tech & Data Consulting",
    description: "I help small businesses and startups with their tech needs.",
    link: "https://8bitswiser.com"
  },
  {
    title: "Current Resume",
    description: "A link to my current resume in PDF format.",
    link: "https://cdn.datamatt.io/Matthew_Trombley_Resume.pdf"
  }
];
function Fallback({ variant = "not_found" }) {
  const pageContent = {
    not_found: {
      title: "Page Not Found",
      message: "The page you're looking for doesn't exist. You might find what you're looking for in the links below. Otherwise, you can"
    },
    error: {
      title: "Oops! Something went wrong",
      message: "We encountered an unexpected error while processing your request. You can try refreshing the page or"
    }
  };
  const content = pageContent[variant];
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx("title", { children: "Page Not Found" })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center px-4 py-12 bg-gray-900 text-gray-100", children: [
        /* @__PURE__ */ jsxs("main", { className: "max-w-3xl w-full text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full mb-12", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-gray-700 animate-spin" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/matt-trombley-profile-pic.webp",
                  alt: "Matt Trombley",
                  className: "relative w-24 h-24 rounded-full object-cover \n                       p-[3px] bg-gray-900\n                       transition-transform hover:scale-105"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Matt Trombley" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "space-y-6 bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all\n                         transform hover:-translate-y-1 cursor-default",
              children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-6 text-left", children: content.title }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-[auto_1fr_auto] text-left gap-2", children: /* @__PURE__ */ jsxs("span", { className: "text-gray-300", children: [
                  content.message,
                  " ",
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "/",
                      className: "text-emerald-400 hover:text-emerald-300 transition-colors",
                      children: "click here"
                    }
                  ),
                  " ",
                  "to return home."
                ] }) }) }) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "space-y-6 bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all\n                         transform hover:-translate-y-1 cursor-default",
              children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-6 text-left", children: "Links" }),
                profileLinks$1.map((profileLink, index) => /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-[1fr_auto] items-center gap-4 mb-2", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-emerald-400 text-left", children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: profileLink.link,
                      target: "_blank",
                      rel: "noopener",
                      className: "hover:text-emerald-300 transition-colors",
                      children: profileLink.title
                    }
                  ) }) }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-[auto_1fr_auto] text-left gap-2", children: /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: profileLink.description }) }) })
                ] }, index))
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-8 mb-12", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.linkedin.com/in/iamdatamatt/",
                target: "_blank",
                rel: "noopener",
                "aria-label": "LinkedIn",
                className: "text-gray-400 hover:text-emerald-400 transition-colors",
                children: /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                      /* @__PURE__ */ jsx("path", { d: "M8 11v5" }),
                      /* @__PURE__ */ jsx("path", { d: "M8 8v.01" }),
                      /* @__PURE__ */ jsx("path", { d: "M12 16v-5" }),
                      /* @__PURE__ */ jsx("path", { d: "M16 16v-3a2 2 0 1 0 -4 0" }),
                      /* @__PURE__ */ jsx("path", { d: "M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://github.com/iamdatamatt",
                target: "_blank",
                rel: "noopener",
                "aria-label": "GitHub",
                className: "text-gray-400 hover:text-emerald-400 transition-colors",
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: /* @__PURE__ */ jsx("path", { d: "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://x.com/iamdatamatt",
                target: "_blank",
                rel: "noopener",
                "aria-label": "X (Twitter)",
                className: "text-gray-400 hover:text-emerald-400 transition-colors",
                children: /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                      /* @__PURE__ */ jsx("path", { d: "M4 4l11.733 16h4.267l-11.733 -16z" }),
                      /* @__PURE__ */ jsx("path", { d: "M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:mattrtrombley@gmail.com",
                "aria-label": "Email",
                className: "text-gray-400 hover:text-emerald-400 transition-colors",
                children: /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                      /* @__PURE__ */ jsx("path", { d: "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" }),
                      /* @__PURE__ */ jsx("path", { d: "M3 7l9 6l9 -6" })
                    ]
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "border-gray-700 my-12" }),
          /* @__PURE__ */ jsx("footer", { className: "text-sm text-gray-500 mb-8", children: "© Matt Trombley. All rights reserved." })
        ] }),
        /* @__PURE__ */ jsx("style", { children: `
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
      ` })
      ] }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "min-h-screen bg-[#0a0a0a]", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Matt Trombley" }),
      /* @__PURE__ */ jsx("meta", { name: "apple-mobile-web-app-title", content: "Matt Trombley" })
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "min-h-screen text-gray-300", children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return /* @__PURE__ */ jsx(Fallback, { variant: "not_found" });
  }
  return /* @__PURE__ */ jsx(Fallback, { variant: "error" });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
function useClickOutside(handler) {
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
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
const navItems = [
  { name: "Home", href: "/clemson" },
  { name: "Bucket List", href: "/bucketlist" },
  { name: "Fun Places", href: "/funplaces" },
  { name: "Hiking", href: "/hiking" },
  { name: "Outdoors", href: "/outdoors" },
  { name: "Attractions", href: "/attractions" },
  { name: "Disc Golf", href: "/clemson-disc-golf" }
];
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const ref = useClickOutside(() => setIsOpen(false));
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  const isCurrentRoute = (href) => {
    return location.pathname === href;
  };
  return /* @__PURE__ */ jsxs("nav", { className: "bg-gray-800", ref, children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/data-matt-logo.svg",
            alt: "Data Matt Logo",
            className: "w-10 h-10"
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex md:ml-6 md:space-x-6", children: navItems.map((item) => /* @__PURE__ */ jsx(
          Link,
          {
            to: item.href,
            className: `py-2 transition-colors ${isCurrentRoute(item.href) ? "text-white font-medium" : "text-gray-300 hover:text-white"}`,
            children: item.name
          },
          item.name
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center md:hidden", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          },
          className: "text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white p-2 rounded-md",
          "aria-expanded": isOpen,
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: isOpen ? "Close main menu" : "Open main menu" }),
            isOpen ? /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "h-6 w-6",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsx("path", { d: "M18 6l-12 12" }),
                  /* @__PURE__ */ jsx("path", { d: "M6 6l12 12" })
                ]
              }
            ) : /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "h-6 w-6",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsx("path", { d: "M4 6l16 0" }),
                  /* @__PURE__ */ jsx("path", { d: "M4 12l16 0" }),
                  /* @__PURE__ */ jsx("path", { d: "M4 18l16 0" })
                ]
              }
            )
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `${isOpen ? "block" : "hidden"} md:hidden transition-all duration-200 ease-in-out absolute w-full bg-gray-800 shadow-lg z-50`,
        children: /* @__PURE__ */ jsx("div", { className: "px-2 pt-2 pb-3 space-y-1", children: navItems.map((item) => /* @__PURE__ */ jsx(
          Link,
          {
            to: item.href,
            className: `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isCurrentRoute(item.href) ? "bg-gray-900 text-white font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`,
            onClick: () => setIsOpen(false),
            children: item.name
          },
          item.name
        )) })
      }
    )
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "text-center py-8 text-gray-400", children: "© Matt Trombley. All rights reserved." });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    children,
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function HeroHeader({ title, subtitle }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "h-64 bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4",
      style: {
        backgroundImage: "url(/clemson-sunset.webp)",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
      },
      children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: title }),
        subtitle && /* @__PURE__ */ jsx("p", { className: "text-xl", children: subtitle })
      ]
    }
  );
}
function AboutSection({
  title,
  description,
  updated_at
}) {
  return /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-lg p-8 mb-12 text-center shadow-md", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold mb-4 text-black", children: [
      " ",
      title,
      " "
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-black", dangerouslySetInnerHTML: description }),
    updated_at && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 italic", children: [
      "Last Updated ",
      updated_at
    ] })
  ] });
}
async function dbLoader({
  tableName,
  columns: columns2,
  mockData,
  context
}) {
  const db = context.cloudflare.env.DATAMATT_DB;
  if (process.env.NODE_ENV === "development") {
    return Response.json({
      items: mockData || [],
      error: null
    });
  }
  if (!db) {
    console.error("Database not available in production");
    return Response.json({
      items: [],
      error: "Database connection error in production environment"
    });
  }
  try {
    const items = await db.prepare(
      `SELECT ${columns2.join(", ")} FROM ${tableName} ORDER BY ${columns2[0]} ASC`
    ).all();
    return Response.json({
      items: items.results,
      error: null
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({
      items: [],
      error: `Database error: ${error instanceof Error ? error.message : "Unknown error"}`
    });
  }
}
async function dbLoaderDiscGolf({
  context
}) {
  const db = context.cloudflare.env.DATAMATT_DB;
  const mockData = [
    {
      course_name: "Campus Course",
      course_description: "This is a sample course.",
      hole_number: "1",
      hole_description: "This is a test hole."
    },
    {
      course_name: "Campus Course",
      course_description: "This is a sample course.",
      hole_number: "2",
      hole_description: "This is also a test hole."
    },
    {
      course_name: "Off Campus Course",
      course_description: "This is a sample course.",
      hole_number: "1",
      hole_description: "This is a test hole."
    },
    {
      course_name: "Off Campus Course",
      course_description: "This is a sample course.",
      hole_number: "2",
      hole_description: "This is also a test hole."
    }
  ];
  if (process.env.NODE_ENV === "development") {
    return Response.json({
      items: mockData || [],
      error: null
    });
  }
  if (!db) {
    console.error("Database not available in production");
    return Response.json({
      items: [],
      error: "Database connection error in production environment"
    });
  }
  try {
    const items = await db.prepare(
      `SELECT 
                c.course_id,
                c.name AS course_name,
                c.description AS course_description,
                h.hole_number,
                h.description AS hole_description
            FROM clemson_disc_golf_courses c
            LEFT JOIN clemson_disc_golf_holes h ON c.course_id = h.course_id
            ORDER BY c.course_id, h.hole_number
           `
    ).all();
    return Response.json({
      items: items.results,
      error: null
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({
      items: [],
      error: `Database error: ${error instanceof Error ? error.message : "Unknown error"}`
    });
  }
}
function generateMeta({
  metaTitle,
  metaDescription,
  imageUrl,
  imageAlt,
  canonical: canonical2
}) {
  return [
    { title: metaTitle },
    { name: "description", content: metaDescription },
    {
      property: "og:url",
      content: canonical2
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:title",
      content: metaTitle
    },
    {
      property: "og:image",
      content: imageUrl
    },
    {
      property: "og:image:alt",
      content: imageAlt
    },
    {
      property: "og:image:width",
      content: "1200"
    },
    {
      property: "og:image:height",
      content: "630"
    },
    {
      property: "og:image:type",
      content: "image/png"
    },
    {
      property: "og:description",
      content: metaDescription
    },
    {
      property: "og:site_name",
      content: "Matt Trombley"
    },
    {
      name: "twitter:card",
      content: "summary"
    },
    {
      name: "twitter:creator",
      content: "@iamdatamatt"
    },
    {
      name: "twitter:url",
      content: canonical2
    },
    {
      name: "twitter:title",
      content: metaTitle
    },
    {
      name: "twitter:description",
      content: metaDescription
    },
    {
      name: "twitter:image",
      content: imageUrl
    },
    {
      name: "twitter:image:alt",
      content: imageAlt
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical2
        },
        headline: metaTitle,
        description: metaDescription,
        image: imageUrl,
        author: {
          "@type": "Person",
          name: "Matt Trombley",
          url: "https://datamatt.io/"
        },
        datePublished: "2017-05-31",
        dateModified: "2024-11-10"
      }
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://datamatt.io/#person",
        "name": "Matt Trombley",
        "givenName": "Matt",
        "familyName": "Trombley",
        "alternateName": ["Matthew Trombley"],
        "jobTitle": "Senior Data Scientist",
        "image": "https://datamatt.io/matt-trombley-profile-pic.webp",
        "url": ["https://datamatt.io", "https://8bitswiser.com"],
        "sameAs": [
          "https://www.linkedin.com/in/iamdatamatt/",
          "https://github.com/iamdatamatt",
          "https://x.com/iamdatamatt"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "Shopify",
          "url": "https://www.shopify.com"
        },
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "Clemson University",
            "url": "https://www.clemson.edu"
          },
          {
            "@type": "EducationalOrganization",
            "name": "North Carolina State University",
            "url": "https://www.ncsu.edu"
          }
        ],
        "description": "Senior Data Scientist at Shopify, specializing in data analysis, machine learning, and technical consulting.",
        "knowsAbout": [
          "Data Science",
          "Machine Learning",
          "Python",
          "SQL",
          "Statistical Analysis",
          "Technical Consulting",
          "Website Development",
          "Search Engine Optimization",
          "Email Deliverability"
        ]
      }
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://datamatt.io/#website",
        "url": "https://datamatt.io",
        "name": "Matt Trombley | Data Scientist & Tech Consultant",
        "description": "The digital profile of Matt Trombley, showcasing personal projects, work experience, and the best Clemson has to offer.",
        "publisher": {
          "@id": "https://datamatt.io/#person"
        }
      }
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://8bitswiser.com/#website",
        "url": "https://8bitswiser.com",
        "name": "8 Bits Wiser",
        "description": "Expert technology consulting services specializing in AI/ML, data analytics, website development, and SEO optimization.",
        "publisher": {
          "@id": "https://datamatt.io/#person"
        }
      }
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://8bitswiser.com/#organization",
        "name": "8 Bits Wiser",
        "url": "https://8bitswiser.com",
        "logo": "https://8bitswiser.com/8-bits-wiser.svg",
        "founder": {
          "@id": "https://datamatt.io/#person"
        },
        "sameAs": [
          "https://www.linkedin.com/in/iamdatamatt/",
          "https://github.com/iamdatamatt",
          "https://x.com/iamdatamatt"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "contact@8bitswiser.com"
        }
      }
    }
  ];
}
const canonical$7 = "https://datamatt.io/clemson-disc-golf";
const meta$7 = () => {
  return generateMeta({
    metaTitle: "The Unofficial Clemson Campus Disc Golf Courses | Matt Trombley",
    metaDescription: "Find out how to play the hidden disc golf courses on Clemson University's campus. The holes are places on campus you'd never expect!",
    imageUrl: "/clemson_card.png",
    imageAlt: "A Clemson Bucket List cover image",
    canonical: canonical$7
  });
};
const links$7 = () => {
  return [
    { rel: "canonical", href: canonical$7 },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96"
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" }
  ];
};
async function loader$5({ context }) {
  return dbLoaderDiscGolf({ context });
}
function ClemsonDiscGolfPage() {
  const { items } = useLoaderData();
  const courseMap = items.reduce((acc, item) => {
    if (!acc[item.course_name]) {
      acc[item.course_name] = {
        description: item.course_description,
        holes: []
      };
    }
    acc[item.course_name].holes.push({
      number: item.hole_number,
      description: item.hole_description
    });
    return acc;
  }, {});
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      HeroHeader,
      {
        title: "The Unofficial Clemson On-Campus Disc Golf Courses",
        subtitle: "Grab your discs and get to playing!"
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx(
        AboutSection,
        {
          title: "About These Courses",
          description: {
            __html: `All other pages that had the Clemson campus disc golf courses on them have disappeared over time,
            so I created this to preserve them for future students. If you have any questions/comments/etc, shoot me an email at 
            <a href="mailto:mattrtrombley@gmail.com" class="text-emerald-600 hover:underline">mattrtrombley@gmail.com</a>. 
            Enjoy!`
          },
          updated_at: "November 2024"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-12 space-y-8", children: Object.entries(courseMap).map(([courseName, courseData]) => /* @__PURE__ */ jsx(
        "section",
        {
          className: "bg-white rounded-lg shadow-md overflow-hidden",
          children: /* @__PURE__ */ jsxs("div", { className: "p-8 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900", children: courseName }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: courseData.description })
            ] }),
            /* @__PURE__ */ jsxs("details", { className: "group", children: [
              /* @__PURE__ */ jsx("summary", { className: "cursor-pointer list-none", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700", children: [
                /* @__PURE__ */ jsx("span", { children: "View Course Holes" }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-5 h-5 transition-transform group-open:rotate-180",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M19 9l-7 7-7-7"
                      }
                    )
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: courseData.holes.sort((a, b) => parseInt(a.number) - parseInt(b.number)).map((hole) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "bg-gray-50 p-6 rounded-lg shadow-lg",
                  children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold mb-2 text-gray-900", children: [
                      "Hole ",
                      hole.number
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: hole.description })
                  ]
                },
                hole.number
              )) })
            ] })
          ] })
        },
        courseName
      )) })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ClemsonDiscGolfPage,
  links: links$7,
  loader: loader$5,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function DataTable({ data, columns: columns2 }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const tableColumns = useMemo(
    () => columns2.map((col) => ({
      accessorKey: col.accessorKey,
      header: col.header,
      size: col.width || 150,
      cell: (info) => {
        const value = info.getValue();
        if (typeof value === "string" && (value.startsWith("http") || value.startsWith("https"))) {
          return /* @__PURE__ */ jsx(
            "a",
            {
              href: value,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-emerald-600 hover:underline",
              children: value
            }
          );
        }
        return value || "-";
      }
    })),
    [columns2]
  );
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-black", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-black", children: [
        /* @__PURE__ */ jsx("label", { className: "whitespace-nowrap", children: "Show" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: table.getState().pagination.pageSize,
            onChange: (e) => {
              table.setPageSize(Number(e.target.value));
            },
            className: "border rounded px-2 py-1 bg-gray-50 text-black min-w-[70px]",
            "aria-label": "Page Size",
            children: [10, 25, 50, 100].map((pageSize) => /* @__PURE__ */ jsx("option", { value: pageSize, children: pageSize }, pageSize))
          }
        ),
        /* @__PURE__ */ jsx("label", { children: "entries" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-black w-full sm:w-auto", children: [
        /* @__PURE__ */ jsx("label", { className: "whitespace-nowrap", children: "Search:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: globalFilter ?? "",
            onChange: (e) => setGlobalFilter(e.target.value),
            className: "border rounded px-3 py-1 bg-gray-50 text-black w-full sm:w-auto",
            placeholder: "Filter results..."
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-2 text-sm text-gray-500 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "italic", children: "Scroll right to see more details" }),
        " ➡️"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "min-w-[640px]", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-black", children: [
        /* @__PURE__ */ jsx("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(
          "tr",
          {
            className: "border-y bg-slate-100 sticky top-0 z-10",
            children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
              "th",
              {
                className: "text-left p-4 text-black whitespace-nowrap",
                style: { minWidth: `${header.getSize()}px` },
                children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
                  "div",
                  {
                    ...{
                      className: header.column.getCanSort() ? "cursor-pointer select-none flex items-center gap-1" : "",
                      onClick: header.column.getToggleSortingHandler()
                    },
                    children: [
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ),
                      {
                        asc: " 🔼",
                        desc: " 🔽"
                      }[header.column.getIsSorted()] ?? null
                    ]
                  }
                )
              },
              header.id
            ))
          },
          headerGroup.id
        )) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y", children: table.getRowModel().rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
          "td",
          {
            colSpan: columns2.length,
            className: "text-center p-4 text-gray-500",
            children: "No results found"
          }
        ) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { className: "hover:bg-gray-50", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
          "td",
          {
            className: "p-4",
            style: { minWidth: `${cell.column.getSize()}px` },
            children: flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )
          },
          cell.id
        )) }, row.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-4 border-t", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4 text-black", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left", children: [
        "Showing",
        " ",
        table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1,
        " ",
        "to",
        " ",
        Math.min(
          (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
          table.getFilteredRowModel().rows.length
        ),
        " ",
        "of ",
        table.getFilteredRowModel().rows.length,
        " entries"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white min-w-[80px]",
            onClick: () => table.setPageIndex(0),
            disabled: !table.getCanPreviousPage(),
            children: "First"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white min-w-[80px]",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white min-w-[80px]",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            children: "Next"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white min-w-[80px]",
            onClick: () => table.setPageIndex(table.getPageCount() - 1),
            disabled: !table.getCanNextPage(),
            children: "Last"
          }
        )
      ] })
    ] }) })
  ] });
}
const canonical$6 = "https://datamatt.io/attractions";
const columns$4 = [
  { header: "Name", accessorKey: "name", type: "text", width: 200 },
  { header: "Location", accessorKey: "location", type: "text", width: 200 },
  { header: "Info", accessorKey: "info", type: "text", width: 400 },
  { header: "Link", accessorKey: "link", type: "url", width: 200 }
];
const meta$6 = () => {
  return generateMeta({
    metaTitle: "Attractions In & Around Clemson, SC | Matt Trombley",
    metaDescription: "Bored in Clemson? Not anymore! Here's a comprehensive list of attractions that are within driving distance of Clemson, South Carolina.",
    imageUrl: "/clemson_card.png",
    imageAlt: "A Clemson Bucket List cover image",
    canonical: canonical$6
  });
};
const links$6 = () => {
  return [
    { rel: "canonical", href: canonical$6 },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96"
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" }
  ];
};
async function loader$4({ context }) {
  return dbLoader({
    tableName: "clemson_attractions",
    columns: ["name", "location", "info", "link"],
    mockData: [
      {
        name: "Visit Death Valley",
        location: "Clemson, SC",
        info: "Watch a game in Memorial Stadium",
        link: "https://www.clemsontigers.com/schedule"
      },
      {
        name: "Run Down The Hill",
        location: "Clemson, SC",
        info: "Experience the most exciting 25 seconds in college football",
        link: "https://www.clemsontigers.com/schedule"
      }
    ],
    context
  });
}
function AttractionsPage() {
  const { items } = useLoaderData();
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      HeroHeader,
      {
        title: "Attractions Near Clemson, SC",
        subtitle: "All the things that don't fit in the other categories."
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx(
        AboutSection,
        {
          title: "About This List",
          description: {
            __html: `This list was started out of a lack of any central place to see all the things
            that you can do while you're a Clemson student. I hope this can be a resource for students
            for years to come. If you have any questions/comments/etc, shoot me an email at 
            <a href="mailto:mattrtrombley@gmail.com" class="text-emerald-600 hover:underline">mattrtrombley@gmail.com</a>. 
            Enjoy!`
          },
          updated_at: "November 2024"
        }
      ),
      /* @__PURE__ */ jsx(DataTable, { data: items, columns: columns$4 })
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AttractionsPage,
  links: links$6,
  loader: loader$4,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const canonical$5 = "https://datamatt.io/bucketlist";
const columns$3 = [
  { header: "Name", accessorKey: "name", type: "text", width: 200 },
  { header: "Info", accessorKey: "info", type: "text", width: 400 }
];
const meta$5 = () => {
  return generateMeta({
    metaTitle: "The Official Clemson Bucket List | Matt Trombley",
    metaDescription: "A comprehensive list of must-do activities for Clemson students before graduating, from the Monsoon Room to Solid Orange Friday.",
    imageUrl: "/clemson_card.png",
    imageAlt: "A Clemson Bucket List cover image",
    canonical: canonical$5
  });
};
const links$5 = () => {
  return [
    { rel: "canonical", href: canonical$5 },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96"
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" }
  ];
};
async function loader$3({ context }) {
  return dbLoader({
    tableName: "clemson_bucket_list",
    columns: ["name", "info"],
    mockData: [
      {
        name: "Visit Death Valley",
        info: "Watch a game in Memorial Stadium"
      },
      {
        name: "Run Down The Hill",
        info: "Experience the most exciting 25 seconds in college football"
      }
    ],
    context
  });
}
function BucketListPage() {
  const { items } = useLoaderData();
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      HeroHeader,
      {
        title: "The Official Clemson Bucket List",
        subtitle: "Make sure you do everything here before graduating!"
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx(
        AboutSection,
        {
          title: "About This List",
          description: {
            __html: `This list was started out of a lack of any central place to see all the things
            that you can do while you're a Clemson student. I hope this can be a resource for students
            for years to come. If you have any questions/comments/etc, shoot me an email at 
            <a href="mailto:mattrtrombley@gmail.com" class="text-emerald-600 hover:underline">mattrtrombley@gmail.com</a>. 
            Enjoy!`
          },
          updated_at: "November 2024"
        }
      ),
      /* @__PURE__ */ jsx(DataTable, { data: items, columns: columns$3 })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BucketListPage,
  links: links$5,
  loader: loader$3,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const canonical$4 = "https://datamatt.io/funplaces";
const columns$2 = [
  { header: "Name", accessorKey: "name", type: "text", width: 200 },
  { header: "Location", accessorKey: "location", type: "text", width: 200 },
  { header: "Info", accessorKey: "info", type: "text", width: 400 },
  { header: "Link", accessorKey: "link", type: "url", width: 200 }
];
const meta$4 = () => {
  return generateMeta({
    metaTitle: "Fun Places to Visit In & Around Clemson, SC | Matt Trombley",
    metaDescription: "Bored in Clemson? Not anymore! Here's a comprehensive list of fun places that are within driving distance of Clemson, South Carolina.",
    imageUrl: "/clemson_card.png",
    imageAlt: "A Clemson Bucket List cover image",
    canonical: canonical$4
  });
};
const links$4 = () => {
  return [
    { rel: "canonical", href: canonical$4 },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96"
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" }
  ];
};
async function loader$2({ context }) {
  return dbLoader({
    tableName: "clemson_fun_places",
    columns: ["name", "location", "info", "link"],
    mockData: [
      {
        name: "Visit Death Valley",
        location: "Clemson, SC",
        info: "Watch a game in Memorial Stadium",
        link: "https://www.clemsontigers.com/schedule"
      },
      {
        name: "Run Down The Hill",
        location: "Clemson, SC",
        info: "Experience the most exciting 25 seconds in college football",
        link: "https://www.clemsontigers.com/schedule"
      }
    ],
    context
  });
}
function FunPlacesPage() {
  const { items } = useLoaderData();
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      HeroHeader,
      {
        title: "Fun Places Near Clemson, SC",
        subtitle: "Guaranteed to keep you busy every weekend!"
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx(
        AboutSection,
        {
          title: "About This List",
          description: {
            __html: `This list was started out of a lack of any central place to see all the things
            that you can do while you're a Clemson student. I hope this can be a resource for students
            for years to come. If you have any questions/comments/etc, shoot me an email at 
            <a href="mailto:mattrtrombley@gmail.com" class="text-emerald-600 hover:underline">mattrtrombley@gmail.com</a>. 
            Enjoy!`
          },
          updated_at: "November 2024"
        }
      ),
      /* @__PURE__ */ jsx(DataTable, { data: items, columns: columns$2 })
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FunPlacesPage,
  links: links$4,
  loader: loader$2,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const canonical$3 = "https://datamatt.io/outdoors";
const columns$1 = [
  { header: "Name", accessorKey: "name", type: "text", width: 200 },
  { header: "Location", accessorKey: "location", type: "text", width: 200 },
  { header: "Info", accessorKey: "info", type: "text", width: 400 },
  { header: "Link", accessorKey: "link", type: "url", width: 200 }
];
const meta$3 = () => {
  return generateMeta({
    metaTitle: "Outdoors Activities In & Around Clemson, SC | Matt Trombley",
    metaDescription: "Bored in Clemson? Not anymore! Here's a comprehensive list of outdoors activities that are within driving distance of Clemson, South Carolina.",
    imageUrl: "/clemson_card.png",
    imageAlt: "A Clemson Bucket List cover image",
    canonical: canonical$3
  });
};
const links$3 = () => {
  return [
    { rel: "canonical", href: canonical$3 },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96"
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" }
  ];
};
async function loader$1({ context }) {
  return dbLoader({
    tableName: "clemson_outdoors",
    columns: ["name", "location", "info", "link"],
    mockData: [
      {
        name: "Visit Death Valley",
        location: "Clemson, SC",
        info: "Watch a game in Memorial Stadium",
        link: "https://www.clemsontigers.com/schedule"
      },
      {
        name: "Run Down The Hill",
        location: "Clemson, SC",
        info: "Experience the most exciting 25 seconds in college football",
        link: "https://www.clemsontigers.com/schedule"
      }
    ],
    context
  });
}
function OutdoorsPage() {
  const { items } = useLoaderData();
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      HeroHeader,
      {
        title: "The Great Outdoors Near Clemson, SC",
        subtitle: "More fun things to explore outside."
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx(
        AboutSection,
        {
          title: "About This List",
          description: {
            __html: `This list was started out of a lack of any central place to see all the things
            that you can do while you're a Clemson student. I hope this can be a resource for students
            for years to come. If you have any questions/comments/etc, shoot me an email at 
            <a href="mailto:mattrtrombley@gmail.com" class="text-emerald-600 hover:underline">mattrtrombley@gmail.com</a>. 
            Enjoy!`
          },
          updated_at: "November 2024"
        }
      ),
      /* @__PURE__ */ jsx(DataTable, { data: items, columns: columns$1 })
    ] })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OutdoorsPage,
  links: links$3,
  loader: loader$1,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function ActivityCard({
  title,
  description,
  icon,
  buttonText,
  buttonHref
}) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 shadow-md flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center flex-grow", children: [
      /* @__PURE__ */ jsx("img", { src: icon, alt: title, className: "w-24 h-24 mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2 text-black", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-center mb-6", children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-auto flex justify-center", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: buttonHref,
        className: "bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors inline-block",
        children: buttonText
      }
    ) })
  ] });
}
const canonical$2 = "https://datamatt.io/clemson";
const meta$2 = () => {
  return generateMeta({
    metaTitle: "Things to Do In & Around Clemson, SC | Matt Trombley",
    metaDescription: "A comprehensive list of activities and places to visit in and around Clemson, South Carolina.",
    imageUrl: "/clemson_card.png",
    imageAlt: "A Clemson Bucket List cover image",
    canonical: canonical$2
  });
};
const links$2 = () => {
  return [
    { rel: "canonical", href: canonical$2 },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96"
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" }
  ];
};
const activities = [
  {
    title: "Clemson Bucket List",
    description: "Everything you need to do before you graduate.",
    icon: "/paw.svg",
    buttonText: "Bucket List",
    buttonHref: "/bucketlist"
  },
  {
    title: "Fun Places to Visit",
    description: "Movie theaters, mini golf, and more.",
    icon: "/fun.webp",
    buttonText: "Fun Places",
    buttonHref: "/funplaces"
  },
  {
    title: "Campus Disc Golf",
    description: "The unofficial on-campus disc golf courses.",
    icon: "/disc-golf.webp",
    buttonText: "Disc Golf",
    buttonHref: "/clemson-disc-golf"
  },
  {
    title: "Hiking Spots",
    description: "All the best and most scenic spots to hike in the area.",
    icon: "/hike.webp",
    buttonText: "Hiking",
    buttonHref: "/hiking"
  },
  {
    title: "Misc. Outdoors",
    description: "More outdoors, including parks and disc golf courses.",
    icon: "/outdoors.webp",
    buttonText: "Outdoors",
    buttonHref: "/outdoors"
  },
  {
    title: "Misc. Attractions",
    description: "Museums, farmer's markets, and more.",
    icon: "/ride.webp",
    buttonText: "Attractions",
    buttonHref: "/attractions"
  }
];
function ClemsonPage() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      HeroHeader,
      {
        title: "A List of Things to Do In & Around Clemson, South Carolina",
        subtitle: "Bored in Clemson? I've got you covered."
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx(
        AboutSection,
        {
          title: "About This List",
          description: {
            __html: `This list was started out of a lack of any central place to see all the things
            that you can do while you're a Clemson student. I hope this can be a resource for students
            for years to come. If you have any questions/comments/etc, shoot me an email at 
            <a href="mailto:mattrtrombley@gmail.com" class="text-emerald-600 hover:underline">mattrtrombley@gmail.com</a>. 
            Enjoy!`
          },
          updated_at: "November 2024"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: activities.map((activity) => /* @__PURE__ */ jsx(ActivityCard, { ...activity }, activity.title)) })
    ] })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ClemsonPage,
  links: links$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const canonical$1 = "https://datamatt.io";
const meta$1 = () => {
  return generateMeta({
    metaTitle: "Matt Trombley | Data Scientist & Tech Consultant",
    metaDescription: "The digital profile of Matt Trombley, showcasing personal projects, work experience, and the best Clemson has to offer.",
    imageUrl: "/social-card.png",
    imageAlt: "Matt Trombley profile cover image",
    canonical: canonical$1
  });
};
const links$1 = () => {
  return [
    { rel: "canonical", href: canonical$1 },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96"
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" }
  ];
};
const profileLinks = [
  {
    title: "Lists Of Things To Do In Clemson, SC",
    description: "All things Clemson - the official bucket list, on-campus disc golf courses, and more.",
    link: "/clemson"
  },
  {
    title: "8 Bits Wiser - Tech & Data Consulting",
    description: "I help small businesses and startups with their tech needs.",
    link: "https://8bitswiser.com"
  },
  {
    title: "Current Resume",
    description: "A link to my current resume in PDF format.",
    link: "https://cdn.datamatt.io/Matthew_Trombley_Resume.pdf"
  }
];
const workHistory = [
  {
    company: "Shopify",
    link: "https://www.shopify.com",
    logo: "/shopify-logo.svg",
    roles: [
      {
        title: "Senior Data Scientist",
        years: "2023 - Present"
      }
    ]
  },
  {
    company: "8 Bits Wiser",
    link: "https://8bitswiser.com",
    logo: "/8-bits-wiser-logo.svg",
    roles: [
      {
        title: "Founder & Lead Consultant",
        years: "2022 - Present"
      }
    ]
  },
  {
    company: "Fidelity Investments",
    link: "https://www.fidelity.com",
    logo: "/fidelity-investments-logo.svg",
    roles: [
      {
        title: "Principal Data Scientist",
        years: "2021 - 2023"
      },
      {
        title: "Senior Data Scientist",
        years: "2021 - 2021"
      },
      {
        title: "Data Scientist",
        years: "2019 - 2020"
      }
    ]
  }
];
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center px-4 py-12 bg-gray-900 text-gray-100", children: [
    /* @__PURE__ */ jsxs("main", { className: "max-w-3xl w-full text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-gray-700 animate-spin" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/matt-trombley-profile-pic.webp",
              alt: "Matt Trombley",
              className: "relative w-24 h-24 rounded-full object-cover \n                       p-[3px] bg-gray-900\n                       transition-transform hover:scale-105"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold flex items-center gap-3", children: [
          "Matt Trombley",
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/data-matt-logo.svg",
              alt: "Data Matt Logo",
              className: "h-8 w-8"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "space-y-6 bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all\n                         transform hover:-translate-y-1 cursor-default",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-6 text-left", children: "Links" }),
            profileLinks.map((profileLink, index) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-[1fr_auto] items-center gap-4 mb-2", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-emerald-400 text-left", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: profileLink.link,
                  className: "hover:text-emerald-300 transition-colors",
                  children: profileLink.title
                }
              ) }) }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-[auto_1fr_auto] text-left gap-2", children: /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: profileLink.description }) }) })
            ] }, index))
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "space-y-6 bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all\n                         transform hover:-translate-y-1 cursor-default",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-6 text-left", children: "Work Experience" }),
            workHistory.map((job, index) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_auto] items-center gap-4 mb-2", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-emerald-400 text-left", children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: job.link,
                    target: "_blank",
                    rel: "noopener",
                    className: "hover:text-emerald-300 transition-colors",
                    children: job.company
                  }
                ) }),
                /* @__PURE__ */ jsx("a", { href: job.link, target: "_blank", rel: "noopener", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: job.logo,
                    alt: `${job.company} logo`,
                    className: "w-8 h-8 object-contain"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1", children: job.roles.map((role, roleIndex) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "grid grid-cols-[auto_1fr_auto] items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: role.title }),
                    /* @__PURE__ */ jsx("span", { className: "h-[1px] w-full bg-gray-600" }),
                    /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm whitespace-nowrap", children: role.years })
                  ]
                },
                roleIndex
              )) })
            ] }, index))
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-8 mb-12", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://www.linkedin.com/in/iamdatamatt/",
            target: "_blank",
            rel: "noopener",
            "aria-label": "LinkedIn",
            className: "text-gray-400 hover:text-emerald-400 transition-colors",
            children: /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ jsx("path", { d: "M8 11v5" }),
                  /* @__PURE__ */ jsx("path", { d: "M8 8v.01" }),
                  /* @__PURE__ */ jsx("path", { d: "M12 16v-5" }),
                  /* @__PURE__ */ jsx("path", { d: "M16 16v-3a2 2 0 1 0 -4 0" }),
                  /* @__PURE__ */ jsx("path", { d: "M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://github.com/iamdatamatt",
            target: "_blank",
            rel: "noopener",
            "aria-label": "GitHub",
            className: "text-gray-400 hover:text-emerald-400 transition-colors",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: /* @__PURE__ */ jsx("path", { d: "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://x.com/iamdatamatt",
            target: "_blank",
            rel: "noopener",
            "aria-label": "X (Twitter)",
            className: "text-gray-400 hover:text-emerald-400 transition-colors",
            children: /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ jsx("path", { d: "M4 4l11.733 16h4.267l-11.733 -16z" }),
                  /* @__PURE__ */ jsx("path", { d: "M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:mattrtrombley@gmail.com",
            "aria-label": "Email",
            className: "text-gray-400 hover:text-emerald-400 transition-colors",
            children: /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ jsx("path", { d: "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" }),
                  /* @__PURE__ */ jsx("path", { d: "M3 7l9 6l9 -6" })
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "border-gray-700 my-12" }),
      /* @__PURE__ */ jsx("footer", { className: "text-sm text-gray-500 mb-8", children: "© Matt Trombley. All rights reserved." })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
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
      ` })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  links: links$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const canonical = "https://datamatt.io/hiking";
const columns = [
  { header: "Name", accessorKey: "name", type: "text", width: 200 },
  { header: "Location", accessorKey: "location", type: "text", width: 200 },
  {
    header: "Minutes from Clemson",
    accessorKey: "minutes_from_clemson",
    type: "text",
    width: 200
  },
  { header: "Latitude", accessorKey: "latitude", type: "text" },
  { header: "Longitude", accessorKey: "longitude", type: "text" },
  { header: "Trail Length", accessorKey: "trail_length", type: "text" },
  { header: "Info", accessorKey: "info", type: "text", width: 400 },
  { header: "Link", accessorKey: "link", type: "url", width: 200 }
];
const meta = () => {
  return generateMeta({
    metaTitle: "Hiking In & Around Clemson, SC | Matt Trombley",
    metaDescription: "Bored in Clemson? Not anymore! Here's a comprehensive list of hiking spots that are within driving distance of Clemson, South Carolina.",
    imageUrl: "/clemson_card.png",
    imageAlt: "A Clemson Bucket List cover image",
    canonical
  });
};
const links = () => {
  return [
    { rel: "canonical", href: canonical },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96"
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" }
  ];
};
async function loader({ context }) {
  return dbLoader({
    tableName: "clemson_hiking",
    columns: [
      "name",
      "location",
      "minutes_from_clemson",
      "latitude",
      "longitude",
      "trail_length",
      "info",
      "link"
    ],
    mockData: [
      {
        name: "Visit Death Valley",
        location: "Clemson, SC",
        minutes_from_clemson: 15,
        latitude: 34.6792,
        longitude: -82.8385,
        trail_length: "1.5 miles",
        info: "Watch a game in Memorial Stadium",
        link: "https://www.clemsontigers.com/schedule"
      },
      {
        name: "Run Down The Hill",
        location: "Clemson, SC",
        minutes_from_clemson: 15,
        latitude: 34.6792,
        longitude: -82.8385,
        trail_length: "1.5 miles",
        info: "Experience the most exciting 25 seconds in college football",
        link: "https://www.clemsontigers.com/schedule"
      }
    ],
    context
  });
}
function HikingPage() {
  const { items } = useLoaderData();
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      HeroHeader,
      {
        title: "Hiking Near Clemson, SC",
        subtitle: "Explore simple trails or intense mountain adventures."
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx(
        AboutSection,
        {
          title: "About This List",
          description: {
            __html: `This list was started out of a lack of any central place to see all the things
            that you can do while you're a Clemson student. I hope this can be a resource for students
            for years to come. If you have any questions/comments/etc, shoot me an email at 
            <a href="mailto:mattrtrombley@gmail.com" class="text-emerald-600 hover:underline">mattrtrombley@gmail.com</a>. 
            Enjoy!`
          },
          updated_at: "November 2024"
        }
      ),
      /* @__PURE__ */ jsx(
        AboutSection,
        {
          title: "Clemson Experimental Forest Map",
          description: {
            __html: `Reddit user ItalianMathematician has created an awesome updated map of the Experimental Forest, 
            including new trails, service roads, and removing trails that no longer exist. You can check it out by 
            <a href="https://www.reddit.com/r/Clemson/comments/odbdky/clemson_experimental_forest_updated_trail_map/" class="text-emerald-600 hover:underline">clicking here!</a>`
          }
        }
      ),
      /* @__PURE__ */ jsx(DataTable, { data: items, columns })
    ] })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HikingPage,
  links,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CvP3fdHw.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-Db46JVZ8.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-BnWfto5e.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-Db46JVZ8.js"], "css": ["/assets/root-KkjIOCjg.css"] }, "routes/clemson-disc-golf": { "id": "routes/clemson-disc-golf", "parentId": "root", "path": "clemson-disc-golf", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/clemson-disc-golf-CMoCwOnb.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/AboutSection-DUQ6JWQR.js", "/assets/meta-ofYek9-x.js", "/assets/components-Db46JVZ8.js"], "css": [] }, "routes/attractions": { "id": "routes/attractions", "parentId": "root", "path": "attractions", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/attractions-BHoOmfKd.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/AboutSection-DUQ6JWQR.js", "/assets/DataTable-k2VBy0-K.js", "/assets/meta-ofYek9-x.js", "/assets/components-Db46JVZ8.js"], "css": [] }, "routes/bucketlist": { "id": "routes/bucketlist", "parentId": "root", "path": "bucketlist", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/bucketlist-38SReCLe.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/AboutSection-DUQ6JWQR.js", "/assets/DataTable-k2VBy0-K.js", "/assets/meta-ofYek9-x.js", "/assets/components-Db46JVZ8.js"], "css": [] }, "routes/funplaces": { "id": "routes/funplaces", "parentId": "root", "path": "funplaces", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/funplaces-DIk58kg1.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/AboutSection-DUQ6JWQR.js", "/assets/DataTable-k2VBy0-K.js", "/assets/meta-ofYek9-x.js", "/assets/components-Db46JVZ8.js"], "css": [] }, "routes/outdoors": { "id": "routes/outdoors", "parentId": "root", "path": "outdoors", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/outdoors-3WgHDlg7.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/AboutSection-DUQ6JWQR.js", "/assets/DataTable-k2VBy0-K.js", "/assets/meta-ofYek9-x.js", "/assets/components-Db46JVZ8.js"], "css": [] }, "routes/clemson": { "id": "routes/clemson", "parentId": "root", "path": "clemson", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/clemson-Cj4ZCq7M.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/AboutSection-DUQ6JWQR.js", "/assets/components-Db46JVZ8.js", "/assets/meta-ofYek9-x.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BbHE3csM.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/meta-ofYek9-x.js"], "css": [] }, "routes/hiking": { "id": "routes/hiking", "parentId": "root", "path": "hiking", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/hiking-CRaMiVi7.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/AboutSection-DUQ6JWQR.js", "/assets/DataTable-k2VBy0-K.js", "/assets/meta-ofYek9-x.js", "/assets/components-Db46JVZ8.js"], "css": [] } }, "url": "/assets/manifest-7b29d9f1.js", "version": "7b29d9f1" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false, "unstable_routeConfig": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/clemson-disc-golf": {
    id: "routes/clemson-disc-golf",
    parentId: "root",
    path: "clemson-disc-golf",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/attractions": {
    id: "routes/attractions",
    parentId: "root",
    path: "attractions",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/bucketlist": {
    id: "routes/bucketlist",
    parentId: "root",
    path: "bucketlist",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/funplaces": {
    id: "routes/funplaces",
    parentId: "root",
    path: "funplaces",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/outdoors": {
    id: "routes/outdoors",
    parentId: "root",
    path: "outdoors",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/clemson": {
    id: "routes/clemson",
    parentId: "root",
    path: "clemson",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route7
  },
  "routes/hiking": {
    id: "routes/hiking",
    parentId: "root",
    path: "hiking",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
