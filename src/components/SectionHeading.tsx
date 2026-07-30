interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <h2 className="text-[#FFFF00] font-serif font-bold text-xl m-0">
        ★ {children} ★
      </h2>
      <div className="rainbow-hr mt-1" />
    </div>
  );
}
