import type { UserRole } from "@/types"

/** Roles in ascending order of access, shared by admin role controls. */
export const ROLE_OPTIONS: readonly { value: UserRole; label: string }[] = [
  { value: "seeker", label: "Seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "admin", label: "Admin" },
]
