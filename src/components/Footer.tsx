export default function Footer() {
  return (
    <footer className="mt-8 pt-4">
      <div className="rainbow-hr" />

      {/* Construction stripe */}
      <div className="construction-stripe my-2">
        <p className="text-center text-xs text-black font-bold m-0">
          🚧 UNDER CONSTRUCTION 🚧
        </p>
      </div>

      <div className="text-center space-y-2 py-4">
        {/* Hit counter */}
        <div>
          <span className="hit-counter">You are visitor #00137</span>
        </div>

        {/* Webring */}
        <div className="font-mono text-xs text-[#00FFFF]">
          <span className="text-[#FFFF00]">★ WebRing ★</span>
          {" "}
          <button className="win95-btn mx-1">← Prev</button>
          <button className="win95-btn mx-1">Random</button>
          <button className="win95-btn mx-1">Next →</button>
        </div>

        {/* Browser notice */}
        <p className="font-mono text-xs text-[#00FF00]">
          Best viewed with Netscape Navigator 4.0 / 800×600
        </p>

        {/* Last updated */}
        <p className="font-mono text-xs text-[#00FF00]">
          Last Updated: 2001-03-15
        </p>

        {/* Copyright */}
        <p className="font-mono text-xs text-[#FFFF00]">
          © 2001 我的创作空间 · All rights reserved
        </p>

        <p className="font-mono text-xs text-[#00FFFF]">
          <a href="mailto:hello@example.com" className="text-[#00FFFF] underline">
            ✉ Email me!
          </a>
        </p>
      </div>
    </footer>
  );
}
