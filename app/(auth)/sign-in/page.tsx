"use client"

import type { FormEvent } from "react"
import Link from "next/link"
import { LogIn } from "lucide-react"
import { redirect } from "next/navigation"

import { AuthCard } from "@/components/shared/auth-card"
import { TextField } from "@/components/shared/form-fields"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { brandButtonClass, brandLinkClass } from "@/lib/styles"
import { cn } from "@/lib/utils"
import type { SignInUser } from "@/types"

const SignInPage = () => {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const user = Object.fromEntries(formData.entries()) as SignInUser
    const { data, error } = await authClient.signIn.email({
      ...user,
    })

    if (data) {
      redirect("/")
    }
    if (error) {
      console.log(error)
    }
  }

  return (
    <AuthCard
      icon={<LogIn className="size-5 text-brand-soft" aria-hidden="true" />}
      title="Welcome back"
      description="Sign in to continue to HireLoop."
      onSubmit={handleSubmit}
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className={brandLinkClass}>
            Sign Up
          </Link>
        </>
      }
    >
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
        autoComplete="current-password"
        placeholder="Enter your password"
        required
        variant="auth"
        label="Password"
        labelClassName="text-white/80"
      />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            name="remember"
            className="border-white/20 bg-white/4 dark:bg-white/4 data-checked:border-brand data-checked:bg-brand data-checked:text-white"
          />
          <Label
            htmlFor="remember"
            className="text-sm font-normal text-white/60"
          >
            Remember me
          </Label>
        </div>

        <Link href="/forgot-password" className={cn("text-sm", brandLinkClass)}>
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        className={cn(
          "h-11 w-full rounded-lg text-sm font-medium",
          brandButtonClass
        )}
      >
        Sign In
      </Button>
    </AuthCard>
  )
}

export default SignInPage
