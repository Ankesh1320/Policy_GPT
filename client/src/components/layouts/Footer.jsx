import logoFull from '../../assets/logos/logo-footer.svg';
import heartIcon from '../../assets/icons/fluent-emoji-flat_red-heart.svg';
import {
  footerCompanyLinks,
  footerLegalLinks,
  footerPlatformLinks,
} from '../../data/landingData';

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 font-heading text-sm font-semibold text-white">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="font-body text-sm font-semibold text-text-slate transition-colors hover:text-white"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-text-slate"
      aria-hidden="true"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CopyrightIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-text-slate"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M15.5 9.5a4 4 0 1 0 0 5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-cream-dark text-white">
      <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-10 sm:px-5 sm:pb-8 sm:pt-12 lg:px-20 lg:pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logoFull} alt="PolicyGPT" className="mb-4 h-9 " />
            <p className="mb-6 font-body text-sm leading-5 text-text-slate">
              India&apos;s most trusted AI-powered platform for government policy and welfare scheme
              intelligence.
            </p>
            <div className="flex items-center gap-2 text-text-slate">
              <LocationIcon />
              <span className="font-body text-sm font-medium">New Delhi, India</span>
            </div>
          </div>

          <FooterLinkColumn title="PLATFORM" links={footerPlatformLinks} />
          <FooterLinkColumn title="COMPANY" links={footerCompanyLinks} />
          <FooterLinkColumn title="LEGAL" links={footerLegalLinks} />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-text-body/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1 font-body text-xs text-text-body">
            <CopyrightIcon />
            <span>2026 PolicyGPT. Made with</span>
            <img src={heartIcon} alt="" className="h-[15px] w-[15px]" aria-hidden="true" />
            <span>for every Indian citizen.</span>
          </div>
          <p className="font-body text-[10px] text-text-body sm:text-right">
            Data sourced from official government portals. Not affiliated with any government body.
          </p>
        </div>
      </div>
    </footer>
  );
}
