import type { ReactNode } from "react"
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  CloudCog,
  CodeXml,
  Database,
  Download,
  PenTool,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { getApplications } from "@/lib/actions/applications"
import type { ApplicationRow } from "@/types"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const statusStyles = {
  applied: "border-white/10 bg-white/10 text-white/80",
  review: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  interview: "border-violet-500/40 bg-violet-500/10 text-violet-300",
  shortlisted: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  rejected: "border-red-500/40 bg-red-500/10 text-red-300",
  offered: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
}

type ApplicationStatus = keyof typeof statusStyles

type Application = ApplicationRow & {
  jobType?: string
  workMode?: string
  applied?: string
  status?: ApplicationStatus
}

function getApplicationIcon(title: string): ReactNode {
  const value = title.toLowerCase()

  if (value.includes("design")) return <PenTool className="size-5" />
  if (value.includes("data")) return <Database className="size-5" />
  if (value.includes("cloud")) return <CloudCog className="size-5" />
  if (value.includes("ai") || value.includes("machine")) {
    return <Bot className="size-5" />
  }

  return <CodeXml className="size-5" />
}

const ApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const applications: Application[] = await getApplications(
    `applicantId=${session?.user.id}`
  )

  const total = applications.length
  const shortlisted = applications.filter(
    (application) => application.status === "shortlisted"
  ).length
  const interviews = applications.filter(
    (application) => application.status === "interview"
  ).length
  const offered = applications.filter(
    (application) => application.status === "offered"
  ).length
  const successRate = total > 0 ? Math.round((offered / total) * 100) : 0

  const stats = [
    { label: "Total Applied", value: total },
    { label: "Shortlisted", value: shortlisted },
    { label: "Interviews", value: interviews, accent: "text-amber-400" },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      accent: "text-emerald-400",
    },
  ]
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-bold tracking-[-0.02em] text-white">
            My Applications
          </h1>
          <p className="mt-1 text-[15px] text-white/60">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tabs */}
          <div className="flex rounded-xl border border-white/10 bg-surface p-1.5">
            <button
              type="button"
              className="rounded-lg bg-white/10 px-5 py-2 text-sm font-medium text-white"
            >
              Active
            </button>
            <button
              type="button"
              className="rounded-lg px-5 py-2 text-sm font-medium text-white/50"
            >
              Archived
            </button>
          </div>

          {/* Export */}
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            <Download className="size-4" />
            Export PDF
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-surface px-7 py-6"
          >
            <p className="text-[15px] text-white/60">{stat.label}</p>
            <p
              className={cn(
                "mt-4 text-[30px] font-semibold text-white",
                stat.accent
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      {/* Applications table */}
      <section className="mt-7 overflow-hidden rounded-xl border border-white/10 bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-205 text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/2">
                <th className="px-6 py-4 font-normal text-white/45">
                  Job Title
                </th>
                <th className="px-6 py-4 font-normal text-white/45">Company</th>
                <th className="px-6 py-4 font-normal text-white/45">Applied</th>
                <th className="px-6 py-4 font-normal text-white/45">Status</th>
                <th className="px-6 py-4 text-right font-normal text-white/45">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => {
                const status = application.status ?? "applied"

                return (
                  <tr
                    key={application._id}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    {/* Job title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <span
                          className={cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10",
                            status === "rejected"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-white/6 text-white/70"
                          )}
                        >
                          {getApplicationIcon(application.jobTitle)}
                        </span>
                        <div>
                          <p className="font-medium text-white">
                            {application.jobTitle}
                          </p>
                          <p className="mt-0.5 text-xs text-white/45">
                            {application.jobType ?? "Application"}
                            {application.workMode
                              ? ` • ${application.workMode}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-6 py-4 text-white/80">
                      {application.companyName}
                    </td>

                    {/* Applied */}
                    <td className="px-6 py-4 whitespace-nowrap text-white/60">
                      {application.applied ?? "Recently"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex min-w-20 justify-center rounded-full border px-3 py-1 text-xs font-medium capitalize",
                          statusStyles[status]
                        )}
                      >
                        {status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
          <p className="text-sm text-white/50">
            Showing 1-{applications.length} of {applications.length}{" "}
            applications
          </p>

          <nav aria-label="Pagination" className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous page"
              className="flex size-9 items-center justify-center rounded-lg text-white/50"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-current="page"
              className="flex size-9 items-center justify-center rounded-lg bg-white text-sm font-medium text-black"
            >
              1
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-lg text-sm text-white/50"
            >
              2
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-lg text-sm text-white/50"
            >
              3
            </button>
            <button
              type="button"
              aria-label="Next page"
              className="flex size-9 items-center justify-center rounded-lg text-white/50"
            >
              <ChevronRight className="size-4" />
            </button>
          </nav>
        </footer>
      </section>
    </div>
  )
}

export default ApplicationsPage
