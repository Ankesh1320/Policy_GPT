import footerImg from '../../assets/images/footer-img.png';
import mailboxIcon from '../../assets/icons/solar_mailbox-bold.svg';
import Button from '../ui/Button';

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <img
        src={footerImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover blur-[3px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(255,205,115,0.35)] via-[rgba(238,242,255,0.3)] to-[rgba(22,163,74,0.2)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 text-center lg:px-20">
        <img
          src={mailboxIcon}
          alt=""
          className="mx-auto mb-6 h-11 w-11"
          aria-hidden="true"
        />
        <h2 className="mb-3 font-heading text-[30px] font-bold text-text-primary">
          Never Miss a Scheme
        </h2>
        <p className="mx-auto mb-8 max-w-xl font-body text-base leading-relaxed text-text-secondary">
          Get personalised alerts for new schemes, policy updates, and application deadlines —
          delivered to your inbox weekly.
        </p>
        <form
          className="mx-auto flex w-full max-w-[491px] flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="h-[50px] flex-1 rounded-[20px] bg-white px-5 font-body text-base text-text-placeholder shadow-card outline-none placeholder:text-text-placeholder focus:ring-2 focus:ring-brand-orange/30"
          />
          <Button variant="subscribe" size="lg" className="h-[50px] shrink-0 !px-8">
            Subscribe
          </Button>
        </form>
        <p className="mt-4 font-body text-base text-text-placeholder">
          No spam, Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
