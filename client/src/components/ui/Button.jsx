const variants = {
  primary:
    'bg-btn-yellow text-heading-charcoal shadow-btn hover:bg-brand-orange hover:text-white active:scale-[0.98]',
  secondary:
    'bg-white border border-brand-blue-dark text-brand-blue-dark hover:bg-card-blue/50 active:scale-[0.98]',
  outline:
    'bg-white border border-border-warm text-text-secondary hover:border-brand-orange hover:text-brand-orange',
  search:
    'bg-btn-yellow text-heading-charcoal font-bold hover:bg-brand-orange hover:text-white active:scale-[0.98]',
  subscribe:
    'bg-btn-yellow text-[#393630] font-bold hover:bg-brand-orange hover:text-white active:scale-[0.98]',
  nav:
    'bg-btn-yellow text-text-primary font-semibold hover:bg-brand-orange hover:text-white active:scale-[0.98]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-[20px]',
  md: 'px-6 py-3 text-base rounded-[20px]',
  lg: 'px-10 py-3.5 text-base rounded-[30px]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 font-body font-semibold transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}
