"use client";

interface ToggleFilterProps {
  label: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
}

export function ToggleFilter({ label, value, onChange }: ToggleFilterProps) {
  const handleClick = () => {
    if (value === null) {
      onChange(true);
    } else if (value === true) {
      onChange(false);
    } else {
      onChange(null);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-all ${
        value === true
          ? "bg-primary/10 border-primary text-primary"
          : value === false
            ? "bg-destructive/10 border-destructive text-destructive"
            : "bg-background border-input text-muted-foreground hover:border-muted-foreground"
      } `}
      type="button"
      aria-pressed={value ?? "mixed"}
    >
      <span>{label}</span>
      <span className="flex items-center gap-1">
        {value === true && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {value === false && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        )}
        {value === null && <span className="text-xs">Любой</span>}
      </span>
    </button>
  );
}
