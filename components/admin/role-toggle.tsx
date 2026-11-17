import { ROLE_OPTIONS } from "@/lib/constants/roles"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/types"

type RoleToggleProps = {
  value: UserRole
  onChange: (role: UserRole) => void
  /** Accessible name, e.g. "Change role for Jane Doe". */
  label: string
  className?: string
}

/** Segmented control that switches an account between the three roles. */
export function RoleToggle({
  value,
  onChange,
  label,
  className,
}: RoleToggleProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex rounded-lg border border-white/10 bg-surface-raised p-0.5",
        className
      )}
    >
      {ROLE_OPTIONS.map((option) => {
        const selected = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors",
              selected
                ? "bg-white text-black"
                : "text-white/60 hover:text-white"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
