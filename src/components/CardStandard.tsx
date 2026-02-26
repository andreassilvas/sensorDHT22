interface CardStandarProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "soft" | "light";
}

export const CardStandard = ({
  title,
  children,
  className,
}: CardStandarProps) => {
  return (
    <div className={`card text-secondary ${className}`}>
      {title && (
        <div className={`card-header pt-3 border-0 ${className}`}>
          <h6 className="mb-0">{title}</h6>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};
