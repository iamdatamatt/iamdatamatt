interface AboutSectionProps {
  title: string;
  description: { __html: string };
  updated_at?: string;
}

export function AboutSection({
  title,
  description,
  updated_at,
}: AboutSectionProps) {
  return (
    <section className="bg-white rounded-lg p-8 mb-12 text-center shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-black"> {title} </h2>
      <p className="mb-4 text-black" dangerouslySetInnerHTML={description}></p>
      {updated_at && (
        <p className="text-sm text-gray-500 italic">
          Last Updated {updated_at}
        </p>
      )}
    </section>
  );
}
