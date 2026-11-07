"use client"

import Link from "next/link"
import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

const SignUpPage = () => {
  async function handleSubmit(event: React.SubmitEvent<HTMLElement>) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const user = Object.fromEntries(formData.entries()) as {
      name: string
      email: string
      password: string
    }
    const { data, error } = await authClient.signUp.email({
      ...user,
    })
    if (data) {
      redirect("/")
    }
    if (error) {
      console.log(error)
    }

    // TODO: send these values to Better Auth.
    console.log("Sign up form data:", data)
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
