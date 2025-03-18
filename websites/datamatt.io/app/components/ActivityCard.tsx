import { Link } from "@remix-run/react";

interface ActivityCardProps {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  buttonHref: string;
}

export function ActivityCard({
  title,
  description,
  icon,
  buttonText,
  buttonHref,
}: ActivityCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md flex flex-col h-full">
      <div className="flex flex-col items-center flex-grow">
        <img
          src={icon}
          alt={title}
          loading="lazy"
          className="w-24 h-24 mb-4"
          width={96}
          height={96}
        />
        <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
        <p className="text-gray-600 text-center mb-6">{description}</p>
      </div>
      <div className="mt-auto flex justify-center">
        <Link
          to={buttonHref}
          prefetch="intent"
          className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors inline-block"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
