import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { Fallback } from "./components/Fallback";
import "./tailwind.css";

export default function App() {
  return (
    <html lang="en" className="min-h-screen bg-[#0a0a0a]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <meta name="author" content="Matt Trombley" />
        <meta name="apple-mobile-web-app-title" content="Matt Trombley" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-6T56RSE14Y`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6T56RSE14Y');
            `,
          }}
        />
      </head>
      <body className="min-h-screen text-gray-300">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // When true, this is what we want - a 404 error
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <Fallback variant="not_found" />;
  }

  // For other errors, show a generic error page
  return <Fallback variant="error" />;
}
