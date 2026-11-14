import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRight, Check, Mail, ShieldCheck } from "lucide-react"

import { checkoutVerify } from "@/lib/actions/payment"
import { stripe } from "@/lib/stripe"

export const metadata: Metadata = {
  title: "Payment successful | Hireloop",
  description: "Your Hireloop Pro upgrade is complete.",
}

function formatAmount(amount: number | null, currency: string | null) {
  if (amount === null) return null

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format(amount / 100)
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) redirect("/payment")

  const {
    status,
    payment_status,
    amount_total,
    currency,
    customer_email,
    customer_details,
    payment_intent,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  })

  if (status === "open") redirect("/")

  if (status !== "complete" || payment_status !== "paid") {
    redirect("/payment")
  }

  try {
    const result = await checkoutVerify(session_id)
    console.log({ result })
  } catch (error) {
    // The Stripe payment is already confirmed, so verification problems
    // should not keep the customer from seeing their receipt.
    console.error("Failed to verify checkout session", error)
  }

  const paymentIntentId =
    typeof payment_intent === "string" ? payment_intent : payment_intent?.id
  const reference = paymentIntentId ?? session_id
  const referenceLabel = paymentIntentId ? "Transaction ID" : "Session ID"
  const email = customer_details?.email ?? customer_email
  const amount = formatAmount(amount_total, currency)

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-16">
      {/* Ambient light behind the card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.16),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl"
      />

      <main className="relative w-full max-w-[520px]">
        <section
          aria-labelledby="success-title"
          className="overflow-hidden rounded-2xl border border-white/10 bg-surface p-8 text-center shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] sm:p-12"
        >
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/15 shadow-[0_0_30px_-8px_rgba(16,185,129,0.5)] ring-1 ring-emerald-400/30">
            <Check aria-hidden className="size-8 text-emerald-400" />
          </div>

          <p className="mt-6 inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-brand-soft uppercase">
            Upgrade successful
          </p>

          <h1
            id="success-title"
            className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-[28px]"
          >
            Welcome to Hireloop Pro
          </h1>

          <p className="mt-6 text-base leading-7 text-white/60">
            {amount ? (
              <>
                Your payment of{" "}
                <span className="font-semibold text-white">{amount}</span> was
                received successfully.
              </>
            ) : (
              "Your payment was received successfully."
            )}
          </p>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/45">
            All advanced premium recruiting modules are unlocked on your
            account.{" "}
            <span className="font-medium text-emerald-400">
              You may need to re-authenticate to see the effect.
            </span>
          </p>

          <div className="mt-9 divide-y divide-white/5 rounded-xl border border-white/10 bg-white/[0.025] text-left">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <ShieldCheck
                aria-hidden
                className="size-4 shrink-0 text-white/40"
              />
              <span className="text-xs text-white/55">{referenceLabel}</span>
              <code
                title={reference}
                className="ml-auto max-w-[62%] truncate rounded-md bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/70"
              >
                {reference}
              </code>
            </div>

            {email ? (
              <div className="flex items-center gap-3 px-4 py-3.5">
                <Mail aria-hidden className="size-4 shrink-0 text-white/40" />
                <span className="text-xs text-white/55">Receipt sent to</span>
                <span
                  title={email}
                  className="ml-auto max-w-[62%] truncate text-xs text-white/70"
                >
                  {email}
                </span>
              </div>
            ) : null}
          </div>

          <Link
            href="/dashboard/seeker/applications"
            className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-black transition-colors outline-none hover:bg-white/90 focus-visible:ring-3 focus-visible:ring-white/30"
          >
            Go to Workspace Dashboard
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <p className="mt-5 text-xs text-white/35">
            Need help? Contact{" "}
            <a
              href="mailto:orders@example.com"
              className="text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              orders@example.com
            </a>
          </p>
        </section>
      </main>
    </div>
  )
}
