import footerImg from '../../assets/images/footer-img.png';
import mailboxIcon from '../../assets/icons/solar_mailbox-bold.svg';
import Button from '../ui/Button';

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 lg:py-20">
      <img
        src={footerImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover "
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(255,205,115,0.35)] via-[rgba(238,242,255,0.3)] to-[rgba(22,163,74,0.2)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 text-center sm:px-5 lg:px-20">
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
          className="mx-auto flex w-full max-w-[491px] flex-row items-center gap-2 rounded-[16px] bg-white p-1.5 shadow-card sm:rounded-[20px] sm:gap-3 sm:p-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 min-w-0 bg-transparent px-3 py-2.5 font-body text-sm text-text-placeholder outline-none placeholder:text-text-placeholder sm:px-4 sm:text-base"
          />
          <Button variant="subscribe" size="sm" className="shrink-0 !px-4 sm:!px-6">
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
