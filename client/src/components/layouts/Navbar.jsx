import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoFull from '../../assets/logos/logo-full.svg';
import { navLinks } from '../../data/landingData';
import Button from '../ui/Button';
import arrowIcon from '../../assets/icons/line-md_arrow-right.svg';
import { Bell, ChevronDown } from "lucide-react";
import ProfileDropdown from "../dashboard/ProfileDropdown";

function MenuIcon({ open }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

export default function Navbar({ activeLabel }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const token = localStorage.getItem("token");
  const localUser = JSON.parse(localStorage.getItem("user") || "null");
  const canAccessCitizenFeatures = !localUser || localUser.role === 'citizen';
  const displayName = localUser?.fullName || localUser?.name || "";
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "?";

  const getLinkClass = (label) => {
    const isActive =
      activeLabel === label ||
      (label === 'Policies' && location.pathname.startsWith('/policies')) ||
      (label === 'Explore Schemes' && location.pathname.startsWith('/schemes')) ||
      (label === 'About' && location.pathname.startsWith('/about'));

    return isActive
      ? 'inline-flex items-center gap-2 rounded-[30px] bg-card-orange px-4 py-1.5 font-heading text-base font-semibold text-brand-orange transition-colors'
      : 'inline-flex items-center gap-2 rounded-[20px] bg-white/0 px-4 py-2 font-heading text-base font-medium text-text-muted transition-colors hover:bg-gray-100 hover:text-text-primary';
  };

  const renderNavLink = (link, onNavigate) => {
    const className = getLinkClass(link.label);

    if (link.label === 'Policies') {
      return (
        <Link to="/policies" className={className} onClick={onNavigate}>
          {link.label}
        </Link>
      );
    }

    if (link.label === 'Explore Schemes') {
      return (
        <Link to="/schemes" className={className} onClick={onNavigate}>
          {link.label}
        </Link>
      );
    }

    if (link.label === 'Eligibility Checker') {
      if (!canAccessCitizenFeatures) return null;
      return (
        <Link to="/eligibility-checker" className={className} onClick={onNavigate}>
          {link.label}
        </Link>
      );
    }

    if (link.label === 'Compare') {
      return (
        <Link to="/compare" className={className} onClick={onNavigate}>
          {link.label}
        </Link>
      );
    }

    if (link.label === 'About') {
      return (
        <Link to="/about" className={className} onClick={onNavigate}>
          {link.label}
        </Link>
      );
    }

    if (link.label === 'Contact') {
      return (
        <Link to="/contact" className={className} onClick={onNavigate}>
          {link.label}
        </Link>
      );
    }

    return (
      <a href={link.href} className={className} onClick={onNavigate}>
        {link.label}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border-warm bg-white/80 backdrop-blur-[10px]">
      <nav
        className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 lg:px-20"
        aria-label="Main navigation"
      >
        <Link to="/" className="shrink-0">
          <img src={logoFull} alt="PolicyGPT" className="h-9 w-auto" />
        </Link>

        <ul className="hidden items-center gap-3 xl:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              {renderNavLink(link)}
            </li>
          ))}
        </ul>

        {token ? (
          <div className="hidden items-center gap-6 xl:flex">
            <Link
              to={localUser?.role === 'admin' ? '/admin/dashboard?tab=notifications' : localUser?.role === 'volunteer' ? '/volunteer/dashboard?tab=notifications' : '/citizen/dashboard?tab=notifications'}
              aria-label="Notifications"
              className="relative text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <Bell className="w-[22px] h-[22px]" strokeWidth={1.8} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </Link>

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-1.5 border border-gray-200 rounded-full p-1 pr-2.5 cursor-pointer bg-white"
              >
                <span className="w-8 h-8 rounded-full bg-[#F2762E] text-white text-sm font-semibold flex items-center justify-center">
                  {initial}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {isProfileOpen && (
                <ProfileDropdown onClose={() => setIsProfileOpen(false)} />
              )}
            </div>
          </div>
        ) : (
          <div className="hidden items-center gap-3 xl:flex">
            <Link
              to="/login"
              className="font-heading text-base font-semibold text-text-primary transition-colors hover:text-brand-orange"
            >
              Login
            </Link>
            {/* TODO: Connect to a unified register route when registration selection page or route exists. */}
            <Link to="/citizen/register" className="inline-flex">
              <Button
                variant="nav"
                size="sm"
                icon={<img src={arrowIcon} alt="" className="h-4 w-4" aria-hidden="true" />}
                className="!px-5 !py-2"
              >
                Register Free
              </Button>
            </Link>
          </div>
        )}

        <button
          type="button"
          className="rounded p-2 text-text-primary xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border-warm bg-white px-5 py-4 xl:hidden">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                {renderNavLink(link, () => setMobileOpen(false))}
              </li>
            ))}
            {token ? (
              <li className="flex flex-col gap-3 px-3 py-2">
                <Link
                  to={localUser?.role === 'admin' ? '/admin/dashboard' : localUser?.role === 'volunteer' ? '/volunteer/dashboard' : '/citizen/dashboard'}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-base font-semibold text-text-primary hover:text-brand-orange transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setMobileOpen(false);
                    navigate("/");
                  }}
                  className="font-heading text-base font-semibold text-red-500 hover:text-red-600 transition-colors text-left cursor-pointer"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="flex flex-wrap items-center gap-3 px-3 py-2">
                <Link to="/login" className="font-heading text-base font-semibold text-text-primary hover:text-brand-orange transition-colors">
                  Login
                </Link>
                {/* TODO: Connect to a unified register route when registration selection page or route exists. */}
                <Link to="/citizen/register" className="w-auto inline-flex">
                  <Button
                    variant="nav"
                    size="sm"
                    icon={<img src={arrowIcon} alt="" className="h-4 w-4" aria-hidden="true" />}
                    className="w-auto"
                  >
                    Register Free
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
