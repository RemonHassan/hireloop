import { cn } from "@/lib/utils"
import type { UserRole } from "@/types"

const roleStyles: Record<UserRole, string> = {
  seeker: "border-white/10 bg-white/5 text-white/70",
  recruiter: "border-violet-400/30 bg-violet-400/15 text-violet-300",
  admin: "border-amber-400/30 bg-amber-400/15 text-amber-300",
}

type RoleBadgeProps = {
  role?: UserRole
  className?: string
}

/** Role pill used wherever an account's access level is displayed. */
export function RoleBadge({ role = "seeker", className }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        roleStyles[role],
        className
      )}
    >
      {role}
    </span>
  )
}
