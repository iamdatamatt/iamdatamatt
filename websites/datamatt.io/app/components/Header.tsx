interface HeroHeaderProps {
  title: string;
  subtitle?: string;
}

export function HeroHeader({ title, subtitle }: HeroHeaderProps) {
  return (
    <div
      className="h-64 bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
      style={{
        backgroundImage: "url(/clemson-sunset.webp)",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
      }}
    >
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {subtitle && <p className="text-xl">{subtitle}</p>}
    </div>
  );
}
