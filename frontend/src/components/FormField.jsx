export default function FormField({
  label,
  icon: Icon,
  rightSlot,
  className = "",
  ...inputProps
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={inputProps.id} className="text-sm font-medium text-navy">
          {label}
        </label>
        {rightSlot}
      </div>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
        )}
        <input
          {...inputProps}
          className={`w-full rounded-lg border border-border bg-white py-2.5 text-navy placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-navy/15 focus:border-navy transition-colors ${
            Icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}
