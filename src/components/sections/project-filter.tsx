"use client";

interface ProjectFilterProps {
  languages: string[];
  activeFilter: string;
  onFilterChange: (language: string) => void;
}

export function ProjectFilter({
  languages,
  activeFilter,
  onFilterChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onFilterChange("all")}
        className={`rounded-full px-3 py-1 font-mono text-[0.875rem] transition-colors ${
          activeFilter === "all"
            ? "gradient-bg text-white"
            : "border border-border bg-transparent text-foreground-muted hover:border-border-bright"
        }`}
      >
        --all
      </button>
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onFilterChange(lang)}
          className={`rounded-full px-3 py-1 font-mono text-[0.875rem] transition-colors ${
            activeFilter === lang
              ? "gradient-bg text-white"
              : "border border-border bg-transparent text-foreground-muted hover:border-border-bright"
          }`}
        >
          --{lang.toLowerCase()}
        </button>
      ))}
    </div>
  );
}
