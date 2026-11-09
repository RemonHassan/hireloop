"use client"

import type { FormEvent } from "react"
import Link from "next/link"
import {
  BriefcaseBusiness,
  ShieldCheck,
  UserPlus,
  UserRound,
} from "lucide-react"
import { redirect } from "next/navigation"

import { AuthCard } from "@/components/shared/auth-card"
import { TextField } from "@/components/shared/form-fields"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { authClient } from "@/lib/auth-client"
import { brandButtonClass, brandLinkClass } from "@/lib/styles"
import { cn } from "@/lib/utils"
import type { SignUpUser, UserRole } from "@/types"

const roles = [
  { value: "seeker", label: "Seeker", icon: UserRound },
  { value: "recruiter", label: "Recruiter", icon: BriefcaseBusiness },
  { value: "admin", label: "Admin", icon: ShieldCheck },
] as const satisfies readonly {
  value: UserRole
  label: string
  icon: typeof UserRound
}[]

const SignUpPage = () => {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const user: SignUpUser = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      role: (formData.get("role") ?? "seeker") as UserRole,
    }

    const { data, error } = await authClient.signUp.email(user)

    if (data) {
      redirect("/")
    }
    if (error) {
      console.log(error)
    }
  }

  return (
    <AuthCard
      icon={<UserPlus className="size-5 text-brand-soft" aria-hidden="true" />}
      title="Create your account"
      description="Start finding your next role today."
      onSubmit={handleSubmit}
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className={brandLinkClass}>
            Sign In
          </Link>
        </>
      }
    >
      <TextField
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Jane Doe"
        required
        variant="auth"
        label="Full name"
        labelClassName="text-white/80"
      />

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-white/80">I am a</legend>
        <RadioGroup
          name="role"
          defaultValue="seeker"
          required
          className="grid grid-cols-3 gap-2"
        >
          {roles.map(({ value, label, icon: Icon }) => (
            <label
              key={value}
              className="relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-2 py-3 text-center transition-colors hover:bg-white/6 has-checked:border-brand has-checked:bg-brand/10 has-focus-visible:ring-2 has-focus-visible:ring-brand/40"
            >
              <RadioGroupItem
                value={value}
                className="absolute top-2 right-2 size-3.5 border-white/25 bg-white/5 dark:bg-white/5 data-checked:border-brand data-checked:bg-brand data-checked:text-white"
              />
              <Icon className="size-4 text-brand-soft" aria-hidden="true" />
              <span className="text-xs font-medium text-white/75">{label}</span>
            </label>
          ))}
        </RadioGroup>
      </fieldset>

      <TextField
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
        variant="auth"
        label="Email"
        labelClassName="text-white/80"
      />

      <TextField
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Create a password"
        minLength={8}
        required
        variant="auth"
        label="Password"
        labelClassName="text-white/80"
        hint="Use at least 8 characters."
        hintClassName="leading-relaxed text-white/35"
      />

      <Button
        type="submit"
        className={cn(
          "h-11 w-full rounded-lg text-sm font-medium",
          brandButtonClass
        )}
      >
        Create Account
      </Button>
    </AuthCard>
  )
}

export default SignUpPage
