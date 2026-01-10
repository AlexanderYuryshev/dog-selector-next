"use client";

interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function CheckboxGroup({
  label,
  options,
  value,
  onChange,
}: CheckboxGroupProps) {
  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <fieldset className="space-y-3">
      <legend className="text-foreground text-sm font-medium">{label}</legend>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="group flex cursor-pointer items-center gap-3"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => handleToggle(option.value)}
                className="peer sr-only"
              />
              <div className="border-input bg-background peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-ring h-5 w-5 rounded border-2 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2">
                {value.includes(option.value) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    className="text-primary-foreground h-full w-full p-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
