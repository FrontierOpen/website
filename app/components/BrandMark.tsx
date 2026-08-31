type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "h-8 w-8" }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={"relative inline-flex shrink-0 overflow-hidden " + className}
    >
      <img
        src="/frontier-mark-white.png"
        alt=""
        width="360"
        height="360"
        className="brand-mark-image absolute inset-0 h-full w-full object-contain"
      />
    </span>
  );
}
