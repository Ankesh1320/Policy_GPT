import { categoryVariantStyles } from '../../data/landingData';

export default function CategoryCard({ name, count, icon, variant = 'blue' }) {
  const styles = categoryVariantStyles[variant];

  return (
    <article
      className={`group flex h-[144px] flex-col justify-between rounded-[20px] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${styles.card}`}
    >
      <img src={icon} alt="" className="h-[30px] w-[30px]" aria-hidden="true" />
      <div>
        <h3 className="font-heading text-xl font-bold text-text-primary">{name}</h3>
        <p className="font-heading text-sm font-medium text-text-secondary">{count}</p>
      </div>
    </article>
  );
}
