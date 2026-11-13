"use client"
import Link from "next/link"
import {
  BadgeCheck,
  BarChart3,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock,
  Clock3,
  Code2,
  Cpu,
  MapPin,
  Monitor,
  PenTool,
  Users,
  Wallet,
} from "lucide-react"

import { MetaPill } from "@/components/shared/meta-pill"
import { Button } from "@/components/ui/button"
import {
  formatCompactCount,
  formatCompensation,
  formatDeadline,
  formatJobLocation,
  formatJobType,
} from "@/lib/format"
import { surfaceClass } from "@/lib/styles"
import { cn } from "@/lib/utils"
import type { JobRow } from "@/types"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import {
  createApplication,
  getApplicationsCount,
} from "@/lib/actions/applications"
import { toast } from "../ui/toast"
import { getUserPremiumById } from "@/lib/api/user"

const REQUIREMENT_ICONS = [Code2, Cpu, PenTool, Monitor]

/** Split free-form textarea content into individual bullet points. */
function splitIntoItems(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
  const rawItems = lines.length > 1 ? lines : text.split(/[,;]/)

  return rawItems
    .map((item) =>
      item
        .replace(/^[-•*]\s*/, "")
        .replace(/^\d+[.)]\s*/, "")
        .replace(/^and\s+/i, "")
        .trim()
    )
    .filter(Boolean)
}

/** Short requirement entries read better as skill pills than as bullets. */
function areShortItems(items: string[]) {
  return items.length > 0 && items.every((item) => item.length <= 32)
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-xl font-semibold tracking-[-0.01em] text-white">
      {children}
    </h2>
  )
}

function BulletList({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) {
    return <p className="text-sm leading-relaxed text-white/45">{empty}</p>
  }

  return (
    <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-white/50 marker:text-white/35">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  )
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/70">
        <Icon className="size-4.5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="mt-0.5 text-xs text-white/45">{value}</p>
      </div>
    </div>
  )
}

export function JobDetail({ job }: { job: JobRow }) {
  const requirementItems = splitIntoItems(job.requirements)
  const responsibilityItems = splitIntoItems(job.responsibilities)
  const showRequirementPills = areShortItems(requirementItems)

  const isFullyRemote =
    job.isRemote && (!job.location || job.location.toLowerCase() === "remote")
  const workArrangement = isFullyRemote
    ? "is fully remote"
    : `is based in ${formatJobLocation(job)}`

  const description = [
    `${job.companyName} is hiring a ${job.title} to join the ${job.category || "core"} team.`,
    `This ${formatJobType(job.jobType).toLowerCase()} role ${workArrangement}.`,
    job.deadline
      ? `Applications are open until ${formatDeadline(job.deadline)}.`
      : null,
  ]
    .filter(Boolean)
    .join(" ")

  const stats = [
    {
      icon: Wallet,
      label: "Salary Range",
      value: formatCompensation(job),
    },
    { icon: MapPin, label: "Location", value: formatJobLocation(job) },
    { icon: Clock, label: "Job Type", value: formatJobType(job.jobType) },
    {
      icon: BarChart3,
      label: "Category",
      value: job.category || "General",
    },
  ]

  const details = [
    {
      icon: CalendarDays,
      label: "Application deadline",
      value: job.deadline ? formatDeadline(job.deadline) : "Open until filled",
    },
    {
      icon: Users,
      label: "Applicants",
      value: `${formatCompactCount(job.applicants)} candidates so far`,
    },
    {
      icon: Clock3,
      label: "Posted",
      value: job.posted?.replace(/^Posted\s+/i, "") || "Recently",
    },
    {
      icon: BriefcaseBusiness,
      label: "Status",
      value: job.status === "active" ? "Accepting applications" : "Closed",
    },
  ]
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user
  const handleApplyNow = async () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    } else if (user.role === "seeker") {
      // is premium user
      const premiumResult = await getUserPremiumById(user.id)
      // number of jobs applied by this user
      const countResult = await getApplicationsCount(`applicantId=${user?.id}`)
      if (!premiumResult.premium && countResult.count >= 2) {
        router.push(`/payment`)
        return
      } else {
        const application = {
          jobId: job._id,
          userId: user.id,
          email: user.email,
          jobTitle: job.title,
          companyName: job.companyName,
        }
        const result = await createApplication(application)
        if (result.insertedId) {
          console.log("Application successfull")
          router.push(`/browse-jobs`)
        }
      }
      // console.log("Save the application to database..")
    } else {
      console.log("user is not a job seeker")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <section
        className={cn(
          surfaceClass,
          "flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
        )}
      >
        <div className="flex min-w-0 items-center gap-5">
          <div
            aria-hidden
            className="flex size-18 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-surface-raised text-white/30"
          >
            <Building2 className="size-7" />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
              {job.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-base text-white/50 sm:text-lg">
              <span>{job.companyName}</span>
              <span aria-hidden>•</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                <BadgeCheck className="size-4" aria-hidden />
                Verified Employer
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label={`Save ${job.title}`}
            className="flex size-11 items-center justify-center rounded-lg border border-white/10 bg-surface-raised text-white/60 transition-colors hover:border-white/25 hover:text-white"
          >
            <Bookmark className="size-5" aria-hidden />
          </button>
          <Button
            onClick={handleApplyNow}
            type="button"
            className="h-11 rounded-lg bg-white px-6 text-sm font-semibold text-black hover:bg-white/90"
          >
            Apply Now
          </Button>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className={cn(
              surfaceClass,
              "flex flex-col gap-3 px-5 py-4 sm:px-6 sm:py-5"
            )}
          >
            <Icon className="size-5 text-white/45" aria-hidden />
            <div>
              <p className="text-[11px] font-medium tracking-[0.08em] text-white/40 uppercase">
                {label}
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-white">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
        <article className={cn(surfaceClass, "px-6 py-7 sm:px-8 sm:py-8")}>
          <section>
            <SectionHeading>Job Description</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              {description}
            </p>
          </section>

          <hr className="my-7 border-white/10" />

          <section>
            <SectionHeading>Responsibilities</SectionHeading>
            <div className="mt-4">
              <BulletList
                items={responsibilityItems}
                empty="No responsibilities were provided for this role."
              />
            </div>
          </section>

          <hr className="my-7 border-white/10" />

          <section>
            <SectionHeading>Requirements</SectionHeading>

            {showRequirementPills ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {requirementItems.map((item, index) => {
                  const Icon =
                    REQUIREMENT_ICONS[index % REQUIREMENT_ICONS.length]

                  return (
                    <MetaPill
                      key={`${item}-${index}`}
                      icon={<Icon />}
                      className="px-3 py-1.5 text-xs text-white/80"
                    >
                      {item}
                    </MetaPill>
                  )
                })}
              </div>
            ) : (
              <div className="mt-4">
                <BulletList
                  items={requirementItems}
                  empty="No requirements were provided for this role."
                />
              </div>
            )}
          </section>

          <hr className="my-7 border-white/10" />

          <section>
            <SectionHeading>Job Details</SectionHeading>
            <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {details.map((item) => (
                <DetailItem key={item.label} {...item} />
              ))}
            </div>
          </section>
        </article>

        <aside className="h-fit">
          <section className={cn(surfaceClass, "p-6")}>
            <h2 className="text-xl font-semibold tracking-[-0.01em] text-white">
              Company Overview
            </h2>

            <div className="relative mt-5 flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-surface-raised">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(92,83,254,0.35),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(255,255,255,0.12),transparent_55%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[28px_28px] opacity-25"
              />
              <div className="relative flex flex-col items-center gap-3 text-white/70">
                <span className="flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
                  <Building2 className="size-7" aria-hidden />
                </span>
                <span className="max-w-[85%] truncate text-sm font-medium">
                  {job.companyName}
                </span>
              </div>
            </div>

            <dl className="mt-6 space-y-5 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[11px] font-medium tracking-[0.08em] text-white/40 uppercase">
                  Company
                </dt>
                <dd className="text-right text-white">{job.companyName}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[11px] font-medium tracking-[0.08em] text-white/40 uppercase">
                  Industry
                </dt>
                <dd className="text-right text-white">
                  {job.category || "General"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[11px] font-medium tracking-[0.08em] text-white/40 uppercase">
                  Location
                </dt>
                <dd className="text-right text-white">
                  {formatJobLocation(job)}
                </dd>
              </div>
            </dl>

            <Button
              nativeButton={false}
              variant="outline"
              render={
                <Link
                  href={`/browse-jobs?search=${encodeURIComponent(job.companyName)}`}
                />
              }
              className="mt-6 h-11 w-full rounded-lg border-white/10 bg-white/8 text-sm font-medium text-white hover:border-white/20 hover:bg-white/12 hover:text-white"
            >
              View Company Jobs
            </Button>
          </section>
        </aside>
      </div>
    </div>
  )
}
