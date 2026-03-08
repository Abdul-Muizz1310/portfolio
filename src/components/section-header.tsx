interface SectionHeaderProps {
  command: string;
  className?: string;
}

export function SectionHeader({ command, className }: SectionHeaderProps) {
  const dollarIndex = command.indexOf("$");
  const hasPrefix = dollarIndex === 0;

  return (
    <div className={className}>
      <h2 className="font-mono text-h2">
        {hasPrefix ? (
          <>
            <span className="text-foreground-faint">$</span>
            <span className="text-foreground">{command.slice(1)}</span>
          </>
        ) : (
          <span className="text-foreground">{command}</span>
        )}
      </h2>
      <div className="gradient-bg mt-2 h-0.5 w-24 rounded-full" />
    </div>
  );
}
