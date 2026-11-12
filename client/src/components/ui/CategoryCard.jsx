import { categoryVariantStyles } from '../../data/landingData';

export default function CategoryCard({ name, count, icon, variant = 'blue' }) {
  const styles = categoryVariantStyles[variant];

  return (
    <article
      className={`group flex min-h-[120px] flex-col justify-between rounded-[16px] border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:min-h-[144px] sm:rounded-[20px] sm:p-5 ${styles.card}`}
    >
      <img src={icon} alt="" className="h-[26px] w-[26px] sm:h-[30px] sm:w-[30px]" aria-hidden="true" />
      <div>
        <h3 className="font-heading text-lg font-bold text-text-primary sm:text-xl">{name}</h3>
        <p className="font-heading text-sm font-medium text-text-secondary">{count}</p>
      </div>
    </article>
  );
}
