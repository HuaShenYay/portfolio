interface NavigationProps {
  currentPage?: "things" | "about" | "portfolio";
}

export default function Navigation({ currentPage = "things" }: NavigationProps) {
  return (
    <nav class="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <div class="flex items-center gap-10 px-10 py-3 rounded-full bg-white/70 backdrop-blur-3xl border border-white/50 ring-1 ring-black/5 shadow-[0_14px_40px_-22px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,background-color] duration-300 ease-out hover:shadow-[0_18px_46px_-26px_rgba(0,0,0,0.38)] active:scale-[0.995]">
        <a 
          href="/" 
          class={`text-[15px] transition-[color,opacity] duration-200 font-medium ${
            currentPage === "things" 
              ? "text-black font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1.5px] after:bg-black/90 relative" 
              : "text-black/50 hover:text-black/90"
          }`}
        >
          Things
        </a>
        <a 
          href="/about" 
          class={`text-[15px] transition-[color,opacity] duration-200 font-medium ${
            currentPage === "about" 
              ? "text-black font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1.5px] after:bg-black/90 relative" 
              : "text-black/50 hover:text-black/90"
          }`}
        >
          About
        </a>
        <a 
          href="/portfolio" 
          class={`text-[15px] transition-[color,opacity] duration-200 font-medium ${
            currentPage === "portfolio" 
              ? "text-black font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1.5px] after:bg-black/90 relative" 
              : "text-black/50 hover:text-black/90"
          }`}
        >
          Portfolio
        </a>
      </div>
    </nav>
  );
}
