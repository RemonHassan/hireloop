/** Roles configured in `lib/auth.ts` additionalFields. */
export type UserRole = "seeker" | "recruiter" | "admin"

export type SignInUser = {
  email: string
  password: string
}

export type SignUpUser = {
  name: string
  email: string
  password: string
  role: UserRole
}
