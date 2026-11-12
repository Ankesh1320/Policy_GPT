export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  eyebrowColor = 'text-brand-orange',
  action,
  className = '',
}) {
  const alignClass =
    align === 'center' ? 'text-center items-center' : 'text-left items-start';

  const rowClass =
    align === 'center'
      ? 'flex w-full flex-col gap-3 sm:flex-col sm:items-center sm:justify-center'
      : 'flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-between';

  return (
    <div className={`flex flex-col gap-1 ${alignClass} ${className}`}>
      {eyebrow && (
        <span
          className={`font-heading text-base font-semibold uppercase tracking-wide ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      )}
      <div className={rowClass}>
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-[30px] sm:leading-tight">
          {title}
        </h2>
        {action}
      </div>
      {description && (
        <p
          className={`mt-2 max-w-2xl font-body text-base text-text-secondary ${align === 'center' ? 'mx-auto text-center' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
