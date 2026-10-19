interface SectionHeaderProps {
  command: string;
  className?: string;
  /** Use "h1" for the main heading of a page; sections default to "h2". */
  as?: "h1" | "h2";
}

export function SectionHeader({ command, className, as: Heading = "h2" }: SectionHeaderProps) {
  const dollarIndex = command.indexOf("$");
  const hasPrefix = dollarIndex === 0;

  return (
    <div className={className}>
      <Heading className="font-mono text-h2">
        {hasPrefix ? (
          <>
            <span className="text-foreground-faint">$</span>
            <span className="text-foreground">{command.slice(1)}</span>
          </>
        ) : (
          <span className="text-foreground">{command}</span>
        )}
      </Heading>
      <div className="gradient-bg mt-2 h-0.5 w-24 rounded-full" aria-hidden="true" />
    </div>
  );
}
