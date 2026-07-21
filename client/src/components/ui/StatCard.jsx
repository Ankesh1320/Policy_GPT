export default function StatCard({ icon, value, label, valueColor = 'text-brand-blue-dark' }) {
  return (
    <article className="flex h-[110px] flex-col items-center justify-center rounded-[20px] bg-white px-3 py-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-[129px] sm:px-4 sm:py-4">
      <img src={icon} alt="" className="mb-1.5 h-6 w-6 sm:mb-2 sm:h-[30px] sm:w-[30px]" aria-hidden="true" />
      <p className={`font-heading text-xl font-bold leading-none sm:text-[26px] ${valueColor}`}>
        {value}
      </p>
      <p className="mt-1 text-center font-heading text-xs font-medium leading-tight text-text-secondary sm:mt-2 sm:text-sm">
        {label}
      </p>
    </article>
  );
}
