import Logo from "@/src/components/svg/Logo";

export const metadata = {
  title: "Under Maintenance | Shree Kakaji Masale",
  description:
    "We'll be back soon. Our website is currently under maintenance.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-[#F8F5EE] flex flex-col items-center justify-center px-6 font-inter antialiased">
      {/* Decorative top border */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-main" />

      <div className="flex flex-col items-center text-center max-w-lg">
        {/* Logo */}
        <Logo className="w-[7rem] h-auto mb-8" />

        {/* Divider */}
        <div className="w-12 h-[2px] bg-main rounded-full mb-8" />

        {/* Heading */}
        <h1 className="~text-[1.75rem]/[2.75rem] font-bold text-gray-900 leading-tight mb-4">
          We&apos;re Under <span className="text-main">Maintenance</span>
        </h1>

        {/* Body */}
        <p className="~text-[0.875rem]/[1rem] text-gray-500 leading-relaxed mb-10">
          We&apos;re working hard to bring you a better experience. Our website
          will be back shortly. Thank you for your patience.
        </p>

        {/* Contact nudge */}
        <div className="w-full border border-main/20 rounded-2xl bg-white/60 px-6 py-5">
          <p className="~text-[0.75rem]/[0.875rem] text-gray-500 mb-1">
            Need help in the meantime?
          </p>
          <a
            href="mailto:shreekakajimale@gmail.com"
            className="~text-[0.875rem]/[1rem] font-medium text-main hover:underline underline-offset-4 transition-colors"
          >
            shreekakajimale@gmail.com
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-5 mt-8">
          <a
            href="https://www.instagram.com/shreekakajimale"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-400 hover:text-main transition-colors ~text-[0.75rem]/[0.875rem]"
          >
            Instagram
          </a>
          <span className="text-gray-300">·</span>
          <a
            href="https://www.facebook.com/shreekakajimale"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-400 hover:text-main transition-colors ~text-[0.75rem]/[0.875rem]"
          >
            Facebook
          </a>
        </div>
      </div>

      {/* Bottom brand mark */}
      <p className="fixed bottom-5 ~text-[0.65rem]/[0.75rem] text-gray-400 tracking-wide">
        © {new Date().getFullYear()} Shree Kakaji Masale
      </p>
    </main>
  );
}
