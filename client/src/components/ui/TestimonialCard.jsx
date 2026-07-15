import ratingIcon from '../../assets/icons/rating.svg';
import { testimonialVariantStyles } from '../../data/landingData';

export default function TestimonialCard({ testimonial }) {
  const { initials, name, role, quote, variant } = testimonial;
  const bgClass = testimonialVariantStyles[variant];

  return (
    <article
      className={`flex flex-col rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${bgClass}`}
    >
      <div className="mb-4 flex gap-1" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <img key={i} src={ratingIcon} alt="" className="h-5 w-5" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mb-6 flex-1 font-body text-base leading-6 text-text-primary">
        {quote}
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brand-orange">
          <span className="font-heading text-xs font-semibold text-white">{initials}</span>
        </div>
        <div>
          <p className="font-heading text-sm font-semibold text-text-primary">{name}</p>
          <p className="font-heading text-[10px] text-text-secondary">{role}</p>
        </div>
      </div>
    </article>
  );
}
