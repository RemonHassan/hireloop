"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs", active: true },
  { label: "Company", href: "/companies", active: false },
  { label: "Pricing", href: "/pricing", active: false },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]">
      <div className="mx-auto flex h-24 w-full max-w-[1720px] items-center justify-between px-5 sm:px-8 lg:px-16 xl:px-24">
        <Link href="/" aria-label="HireLoop home" className="shrink-0">
          <Image
            src={logo}
            alt="HireLoop"
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center rounded-2xl border border-white/6 bg-[#151515] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors",
                link.active
                  ? "text-white underline decoration-white decoration-2 underline-offset-[7px]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}

          <span aria-hidden="true" className="mx-2 h-6 w-px bg-white/15" />

          <Link
            href="/sign-in"
            className="rounded-lg px-4 py-2.5 text-[15px] font-medium text-[#8f7cff] transition-colors hover:bg-white/5 hover:text-[#a596ff]"
          >
            Sign In
          </Link>

          <Button
            render={<Link href="/sign-up" />}
            className="ml-1 h-11 rounded-lg bg-[#5b3bf5] px-6 text-[15px] font-medium text-white hover:bg-[#6a4bff]"
          >
            Get Started
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="size-11 text-white hover:bg-white/10 lg:hidden"
              />
            }
          >
            <MenuIcon className="size-6" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[min(88vw,22rem)] border-white/10 bg-[#0b0b0b] p-0 text-white"
          >
            <SheetHeader className="border-b border-white/10 px-6 py-5">
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>

            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 px-3 py-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={link.active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    link.active
                      ? "bg-white/5 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <span aria-hidden="true" className="my-3 h-px bg-white/10" />

              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-[#8f7cff] transition-colors hover:bg-white/5 hover:text-[#a596ff]"
              >
                Sign In
              </Link>

              <Button
                render={<Link href="/sign-up" onClick={() => setOpen(false)} />}
                className="mt-2 h-12 w-full rounded-lg bg-[#5b3bf5] text-base font-medium text-white hover:bg-[#6a4bff]"
              >
                Get Started
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
