interface MetaOptions {
  metaTitle: string;
  metaDescription: string;
  imageUrl: string;
  imageAlt: string;
  canonical: string;
  breadcrumbs?: {
    name: string;
    item: string;
  }[];
}

export function generateMeta({
  metaTitle,
  metaDescription,
  imageUrl,
  imageAlt,
  canonical,
  breadcrumbs,
}: MetaOptions) {
  const existingMeta = [
    { title: metaTitle },
    { name: "description", content: metaDescription },
    {
      property: "og:url",
      content: canonical,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: metaTitle,
    },
    {
      property: "og:image",
      content: imageUrl,
    },
    {
      property: "og:image:alt",
      content: imageAlt,
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "og:image:type",
      content: "image/png",
    },
    {
      property: "og:description",
      content: metaDescription,
    },
    {
      property: "og:site_name",
      content: "Matt Trombley",
    },
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "twitter:creator",
      content: "@iamdatamatt",
    },
    {
      name: "twitter:url",
      content: canonical,
    },
    {
      name: "twitter:title",
      content: metaTitle,
    },
    {
      name: "twitter:description",
      content: metaDescription,
    },
    {
      name: "twitter:image",
      content: imageUrl,
    },
    {
      name: "twitter:image:alt",
      content: imageAlt,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical,
        },
        headline: metaTitle,
        description: metaDescription,
        image: imageUrl,
        author: {
          "@type": "Person",
          name: "Matt Trombley",
          url: "https://datamatt.io/",
        },
        datePublished: "2017-05-31",
        dateModified: "2024-11-10",
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://datamatt.io/#person",
        name: "Matt Trombley",
        givenName: "Matt",
        familyName: "Trombley",
        alternateName: ["Matthew Trombley"],
        jobTitle: "Senior Data Scientist",
        image: "https://datamatt.io/matt-trombley-profile-pic.webp",
        url: ["https://datamatt.io", "https://8bitswiser.com"],
        sameAs: [
          "https://www.linkedin.com/in/iamdatamatt/",
          "https://github.com/iamdatamatt",
          "https://x.com/iamdatamatt",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Shopify",
          url: "https://www.shopify.com",
        },
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Clemson University",
            url: "https://www.clemson.edu",
          },
          {
            "@type": "EducationalOrganization",
            name: "North Carolina State University",
            url: "https://www.ncsu.edu",
          },
        ],
        description:
          "Senior Data Scientist at Shopify, specializing in data analysis, machine learning, and technical consulting.",
        knowsAbout: [
          "Data Science",
          "Machine Learning",
          "Python",
          "SQL",
          "Statistical Analysis",
          "Technical Consulting",
          "Website Development",
          "Search Engine Optimization",
          "Email Deliverability",
        ],
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://datamatt.io/#website",
        url: "https://datamatt.io",
        name: "Matt Trombley | Data Scientist & Tech Consultant",
        description:
          "The digital profile of Matt Trombley, showcasing personal projects, work experience, and the best Clemson has to offer.",
        publisher: {
          "@id": "https://datamatt.io/#person",
        },
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://8bitswiser.com/#website",
        url: "https://8bitswiser.com",
        name: "8 Bits Wiser",
        description:
          "Expert technology consulting services specializing in AI/ML, data analytics, website development, and SEO optimization.",
        publisher: {
          "@id": "https://datamatt.io/#person",
        },
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://8bitswiser.com/#organization",
        name: "8 Bits Wiser",
        url: "https://8bitswiser.com",
        logo: "https://8bitswiser.com/8-bits-wiser.svg",
        founder: {
          "@id": "https://datamatt.io/#person",
        },
        sameAs: [
          "https://www.linkedin.com/in/iamdatamatt/",
          "https://github.com/iamdatamatt",
          "https://x.com/iamdatamatt",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "contact@8bitswiser.com",
        },
      },
    },
  ];

  if (breadcrumbs) {
    existingMeta.push({
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      },
    });
  }

  return existingMeta;
}
