interface WorkGridProps {
  children: React.ReactNode;
  columns?: "2" | "3";
}

export default function WorkGrid({
  children,
  columns = "2",
}: WorkGridProps) {
  const lgClass = columns === "2" ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 ${lgClass} gap-2`}>
      {children}
    </div>
  );
}
