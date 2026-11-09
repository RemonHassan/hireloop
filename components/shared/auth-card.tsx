import type { FormEvent, ReactNode } from "react"

/** Shared shell for the sign-in and sign-up pages. */
type AuthCardProps = {
  icon: ReactNode
  title: string
  description: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
  footer: ReactNode
  children: ReactNode
}

export function AuthCard({
  icon,
  title,
  description,
  onSubmit,
  footer,
  children,
}: AuthCardProps) {
  return (
    <main className="relative flex min-h-[calc(100svh-6rem)] items-center justify-center overflow-hidden bg-page px-5 py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,59,245,0.16),transparent_58%)]"
      />

      <div className="relative w-full max-w-110 rounded-2xl border border-white/10 bg-surface-deep p-6 shadow-2xl shadow-black/40 sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/4">
            {icon}
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-white/50">{description}</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {children}
        </form>

        <p className="mt-6 text-center text-sm text-white/50">{footer}</p>
      </div>
    </main>
  )
}
