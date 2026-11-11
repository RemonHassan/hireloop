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

const statusStyles = {
  applied: "border-white/10 bg-white/10 text-white/80",
  review: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  shortlisted: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  rejected: "border-red-500/40 bg-red-500/10 text-red-300",
  offered: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
}

type ApplicationStatus = keyof typeof statusStyles

type Application = {
  id: number
  title: string
  company: string
  jobType: string
  workMode: string
  applied: string
  status: ApplicationStatus
  icon: ReactNode
}

const applications: Application[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Stark Industries",
    jobType: "Full-time",
    workMode: "Remote",
    applied: "2 hours ago",
    status: "applied",
    icon: <CodeXml className="size-5" />,
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Cyberdyne Systems",
    jobType: "Contract",
    workMode: "Hybrid",
    applied: "1 day ago",
    status: "review",
    icon: <PenTool className="size-5" />,
  },
  {
    id: 3,
    title: "Lead Data Scientist",
    company: "Wayne Enterprises",
    jobType: "Full-time",
    workMode: "On-site",
    applied: "4 days ago",
    status: "shortlisted",
    icon: <Database className="size-5" />,
  },
  {
    id: 4,
    title: "Cloud Architect",
    company: "Oscorp Tech",
    jobType: "Full-time",
    workMode: "Remote",
    applied: "1 week ago",
    status: "rejected",
    icon: <CloudCog className="size-5" />,
  },
  {
    id: 5,
    title: "AI Research Engineer",
    company: "Hooli Corp",
    jobType: "Full-time",
    workMode: "Hybrid",
    applied: "2 weeks ago",
    status: "offered",
    icon: <Bot className="size-5" />,
  },
]

const stats = [
  { label: "Total Applied", value: "24" },
  { label: "Shortlisted", value: "8" },
  { label: "Interviews", value: "3", accent: "text-amber-400" },
  { label: "Success Rate", value: "12%", accent: "text-emerald-400" },
]

const ApplicationsPage = () => {
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
              {applications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b border-white/5 last:border-b-0"
                >
                  {/* Job title */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10",
                          application.status === "rejected"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-white/6 text-white/70"
                        )}
                      >
                        {application.icon}
                      </span>
                      <div>
                        <p className="font-medium text-white">
                          {application.title}
                        </p>
                        <p className="mt-0.5 text-xs text-white/45">
                          {application.jobType} <span aria-hidden>•</span>{" "}
                          {application.workMode}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-6 py-4 text-white/80">
                    {application.company}
                  </td>

                  {/* Applied */}
                  <td className="px-6 py-4 whitespace-nowrap text-white/60">
                    {application.applied}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex min-w-20 justify-center rounded-full border px-3 py-1 text-xs font-medium capitalize",
                        statusStyles[application.status]
                      )}
                    >
                      {application.status}
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
          <p className="text-sm text-white/50">
            Showing 1-5 of 24 applications
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
