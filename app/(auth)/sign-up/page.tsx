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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { authClient } from "@/lib/auth-client"

const roles = [
  { value: "seeker", label: "Seeker", icon: UserRound },
  { value: "recruiter", label: "Recruiter", icon: BriefcaseBusiness },
  { value: "admin", label: "Admin", icon: ShieldCheck },
] as const

type UserRole = (typeof roles)[number]["value"]

type SignUpUser = {
  name: string
  email: string
  password: string
  role: UserRole
}

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
    <main className="relative flex min-h-[calc(100svh-6rem)] items-center justify-center overflow-hidden bg-[#050505] px-5 py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,59,245,0.16),transparent_58%)]"
      />

      <div className="relative w-full max-w-110 rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 shadow-2xl shadow-black/40 sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/4">
            <UserPlus className="size-5 text-[#a596ff]" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Start finding your next role today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/80">
              Full name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              required
              className="h-11 rounded-lg border-white/10 bg-white/4 px-3.5 text-sm text-white placeholder:text-white/35 focus-visible:border-[#6a4bff] focus-visible:ring-[#5b3bf5]/30 dark:border-white/10 dark:bg-white/4"
            />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-white/80">
              I am a
            </legend>
            <RadioGroup
              name="role"
              defaultValue="seeker"
              required
              className="grid grid-cols-3 gap-2"
            >
              {roles.map(({ value, label, icon: Icon }) => (
                <label
                  key={value}
                  className="relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-2 py-3 text-center transition-colors hover:bg-white/[0.06] has-[:checked]:border-[#5b3bf5] has-[:checked]:bg-[#5b3bf5]/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#5b3bf5]/40"
                >
                  <RadioGroupItem
                    value={value}
                    className="absolute top-2 right-2 size-3.5 border-white/25 bg-white/5 dark:bg-white/5 data-checked:border-[#5b3bf5] data-checked:bg-[#5b3bf5] data-checked:text-white"
                  />
                  <Icon className="size-4 text-[#a596ff]" aria-hidden="true" />
                  <span className="text-xs font-medium text-white/75">
                    {label}
                  </span>
                </label>
              ))}
            </RadioGroup>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="h-11 rounded-lg border-white/10 bg-white/4 px-3.5 text-sm text-white placeholder:text-white/35 focus-visible:border-[#6a4bff] focus-visible:ring-[#5b3bf5]/30 dark:border-white/10 dark:bg-white/4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              minLength={8}
              required
              className="h-11 rounded-lg border-white/10 bg-white/4 px-3.5 text-sm text-white placeholder:text-white/35 focus-visible:border-[#6a4bff] focus-visible:ring-[#5b3bf5]/30 dark:border-white/10 dark:bg-white/4"
            />
            <p className="text-xs leading-relaxed text-white/35">
              Use at least 8 characters.
            </p>
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#5b3bf5] text-sm font-medium text-white hover:bg-[#6a4bff]"
          >
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-[#a596ff] transition-colors hover:text-white"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  )
}

export default SignUpPage
