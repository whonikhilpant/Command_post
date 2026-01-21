const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950/95">
      <div className="container mx-auto px-4 py-8 text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-slate-100 font-semibold mb-4 tracking-wide uppercase text-xs">
              About CommandPost
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your one-stop destination for defence current affairs and articles.
              Designed to help aspirants prepare for CDS, NDA, AFCAT, CAPF, and SSB exams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-100 font-semibold mb-4 tracking-wide uppercase text-xs">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/" className="hover:text-primary-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/bookmarks" className="hover:text-primary-300 transition-colors">
                  Bookmarks
                </a>
              </li>
              <li>
                <a href="/notifications" className="hover:text-primary-300 transition-colors">
                  Notifications
                </a>
              </li>
              <li>
                <a href="/calendar" className="hover:text-primary-300 transition-colors">
                  Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Contact/Info */}
          <div>
            <h3 className="text-slate-100 font-semibold mb-4 tracking-wide uppercase text-xs">
              Exams Covered
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>CDS - Combined Defence Services</li>
              <li>NDA - National Defence Academy</li>
              <li>AFCAT - Air Force Common Admission Test</li>
              <li>CAPF - Central Armed Police Forces</li>
              <li>SSB - Services Selection Board</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-sm text-slate-500">
          <p className="tracking-wide">
            © {new Date().getFullYear()} CommandPost · Built for defence exam aspirants.
          </p>
          <p className="mt-2 text-[11px] text-slate-600 uppercase tracking-[0.15em]">
            No ads. No distractions. Just quality content.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
