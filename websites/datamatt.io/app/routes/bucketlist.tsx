import type {
  LinksFunction,
  MetaFunction,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { HeroHeader } from "../components/Header";
import { DataTable } from "../components/DataTable";
import { AboutSection } from "../components/AboutSection";
import { dbLoader } from "../utils/db-loader";
import { generateMeta } from "../utils/meta";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
interface BucketListItem {
  name: string;
  info: string;
}

const canonical = "https://datamatt.io/bucketlist";

const columns = [
  { header: "Name", accessorKey: "name", type: "text" as const, width: 200 },
  { header: "Info", accessorKey: "info", type: "text" as const, width: 400 },
];

export const meta: MetaFunction = () => {
  return generateMeta({
    metaTitle: "The Official Clemson Bucket List | Matt Trombley",
    metaDescription:
      "A comprehensive list of must-do activities for Clemson students before graduating, from the Monsoon Room to Solid Orange Friday.",
    imageUrl: "https://datamatt.io/clemson-card.png",
    imageAlt: "A Clemson Bucket List cover image",
    canonical,
    breadcrumbs: [
      {
        name: "Home",
        item: "https://datamatt.io",
      },
      {
        name: "Things to Do In & Around Clemson, SC",
        item: "https://datamatt.io/clemson",
      },
      {
        name: "The Official Clemson Bucket List",
        item: "https://datamatt.io/bucketlist",
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
    {
      rel: "preload",
      as: "image",
      href: "/clemson-sunset.webp",
    },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const response = await dbLoader<BucketListItem>({
    tableName: "clemson_bucket_list",
    columns: ["name", "info"],
    mockData: [
      {
        name: "Visit Death Valley",
        info: "Watch a game in Memorial Stadium",
      },
      {
        name: "Run Down The Hill",
        info: "Experience the most exciting 25 seconds in college football",
      },
    ],
    context,
  });
  const data = (await response.json()) as { items: BucketListItem[] };
  return { items: data.items };
}

export default function BucketListPage() {
  const { items } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <HeroHeader
        title="The Official Clemson Bucket List"
        subtitle="Make sure you do everything here before graduating!"
      />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <AboutSection
          title="About This List"
          description={{
            __html: `This list was started out of a lack of any central place to see all the things
            that you can do while you're a Clemson student. I hope this can be a resource for students
            for years to come. If you have any questions/comments/etc, shoot me an email at 
            <a href="mailto:mattrtrombley@gmail.com" class="text-emerald-600 hover:underline">mattrtrombley@gmail.com</a>. 
            Enjoy!`,
          }}
          updated_at="November 2024"
        />
        <DataTable data={items} columns={columns} />
      </main>
      <Footer />
    </div>
  );
}
