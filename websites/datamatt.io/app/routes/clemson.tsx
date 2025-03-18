import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { HeroHeader } from "../components/Header";
import { ActivityCard } from "../components/ActivityCard";
import { AboutSection } from "../components/AboutSection";
import { generateMeta } from "../utils/meta";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

const canonical = "https://datamatt.io/clemson";

export const meta: MetaFunction = () => {
  return generateMeta({
    metaTitle: "Things to Do In & Around Clemson, SC | Matt Trombley",
    metaDescription:
      "A comprehensive list of activities and places to visit in and around Clemson, South Carolina. See bucket list activities, hiking, and disc golf courses.",
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

const activities = [
  {
    title: "Clemson Bucket List",
    description: "Everything you need to do before you graduate.",
    icon: "/paw.svg",
    buttonText: "Bucket List",
    buttonHref: "/bucketlist",
  },
  {
    title: "Fun Places to Visit",
    description: "Movie theaters, mini golf, and more.",
    icon: "/fun.webp",
    buttonText: "Fun Places",
    buttonHref: "/funplaces",
  },
  {
    title: "Campus Disc Golf",
    description: "The unofficial on-campus disc golf courses.",
    icon: "/disc-golf.webp",
    buttonText: "Disc Golf",
    buttonHref: "/clemson-disc-golf",
  },
  {
    title: "Hiking Spots",
    description: "All the best and most scenic spots to hike in the area.",
    icon: "/hike.webp",
    buttonText: "Hiking",
    buttonHref: "/hiking",
  },
  {
    title: "Misc. Outdoors",
    description: "More outdoors, including parks and disc golf courses.",
    icon: "/outdoors.webp",
    buttonText: "Outdoors",
    buttonHref: "/outdoors",
  },
  {
    title: "Misc. Attractions",
    description: "Museums, farmer's markets, and more.",
    icon: "/ride.webp",
    buttonText: "Attractions",
    buttonHref: "/attractions",
  },
];

export default function ClemsonPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <HeroHeader
        title="A List of Things to Do In & Around Clemson, South Carolina"
        subtitle="Bored in Clemson? I've got you covered."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <ActivityCard key={activity.title} {...activity} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
