import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  description,
  href,
  children,
  className = "",
}: CardProps) {
  const cardContent = (
    <div className={`bg-[#000066] border border-[#00FFFF] p-3 ${className}`}>
      <h3 className="font-serif font-bold text-base text-[#FFFF00] m-0 mb-2">
        ★ {title}
      </h3>
      <p className="font-mono text-sm text-[#00FF00] m-0">
        {description}
      </p>
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline hover:opacity-80">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
