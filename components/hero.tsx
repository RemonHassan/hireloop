import Image from "next/image"
import Link from "next/link"
import {
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Globe2,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react"

// globe.png contains a magenta background; hero-globe.png is the cleaned,
// trimmed version used over the black hero.
import globe from "@/app/images/hero-globe.png"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stats = [
  { icon: BriefcaseBusiness, value: "50K", label: "Active Jobs" },
  { icon: ChartNoAxesColumn, value: "12K", label: "Companies" },
  { icon: Globe2, value: "2M", label: "Job Seekers" },
  { icon: Sparkles, value: "97%", label: "Satisfaction Rate" },
]

const trendingRoles = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-10 sm:pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-180 bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,59,245,0.12),transparent_62%)]"
      />

      <Image
        src={globe}
        alt=""
        aria-hidden="true"
        priority
        className="pointer-events-none absolute top-85 left-1/2 z-0 w-[170vw] max-w-300 -translate-x-1/2 opacity-90 select-none sm:top-60 sm:w-[115vw] lg:top-50"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-300 flex-col items-center px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="flex items-center justify-center gap-4">
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-linear-to-r from-transparent to-white/20 sm:block"
          />
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#181818] px-4 py-2 text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase sm:text-[11px]">
            <BriefcaseBusiness
              className="size-3.5 text-amber-500"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="text-white">50,000+</span>
            <span className="whitespace-nowrap">New jobs this month</span>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-linear-to-l from-transparent to-white/20 sm:block"
          />
        </div>

        <h1 className="mt-7 max-w-4xl text-center text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] font-bold tracking-[-0.035em] text-balance text-white">
          Find Your Dream Job Today
        </h1>

        <p className="mt-5 max-w-152.5 text-center text-[15px] leading-7 text-white/55 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form action="/jobs" className="mt-8 w-full max-w-125">
          <div className="flex flex-col rounded-2xl border border-white/10 bg-surface-muted p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:h-14.5 sm:flex-row sm:items-center sm:gap-0 sm:p-1.5">
            <label className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-xl px-2.5 sm:h-full sm:px-3">
              <Search
                className="size-4 shrink-0 text-white/55"
                aria-hidden="true"
              />
              <span className="sr-only">Job title, skill, or company</span>
              <input
                name="q"
                type="search"
                placeholder="Job title, skill, or company"
                className="h-full w-full min-w-0 bg-transparent text-[13px] text-white outline-none placeholder:text-white/45"
              />
            </label>

            <span
              aria-hidden="true"
              className="mx-2 h-px bg-white/10 sm:mx-0 sm:h-6 sm:w-px"
            />

            <label className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-xl px-2.5 sm:h-full sm:px-3">
              <MapPin
                className="size-4 shrink-0 text-white/55"
                aria-hidden="true"
              />
              <span className="sr-only">Location or Remote</span>
              <input
                name="location"
                type="text"
                placeholder="Location or Remote"
                className="h-full w-full min-w-0 bg-transparent text-[13px] text-white outline-none placeholder:text-white/45"
              />
            </label>

            <Button
              type="submit"
              aria-label="Search jobs"
              className="mt-2 h-11 w-full shrink-0 rounded-xl bg-brand text-white hover:bg-brand-hover sm:mt-0 sm:ml-2 sm:h-10 sm:w-10"
            >
              <Search className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-xs text-white/45">Trending Position</span>
          {trendingRoles.map((role, index) => (
            <Link
              key={role}
              href={`/jobs?q=${encodeURIComponent(role)}`}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11px] transition-colors",
                index === 0
                  ? "border-white/15 bg-[#242424] text-white/80"
                  : "border-white/10 bg-surface-muted text-white/55 hover:bg-white/10 hover:text-white/80"
              )}
            >
              {role}
            </Link>
          ))}
        </div>

        <p className="mt-24 max-w-162.5 text-center text-[clamp(1.35rem,3vw,2rem)] leading-[1.2] font-medium tracking-[-0.02em] text-balance text-white/75 sm:mt-28">
          Assisting over 15,000 job seekers
          <br />
          find their dream positions.
        </p>

        <div className="mt-16 grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-lg border border-white/10 bg-[#0a0a0a] p-4 sm:p-5"
            >
              <Icon
                className="size-5 text-white/70"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div className="mt-7 text-4xl leading-none font-semibold tracking-tight text-white sm:text-[2.5rem]">
                {value}
              </div>
              <p className="mt-2 text-xs text-white/55 sm:text-[13px]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
