"use client"

import { useState } from "react"

import { ApplicationStatusBadge } from "@/components/shared/application-status-badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { updateApplicationStatus } from "@/lib/actions/applications"
import { formatAppliedAt } from "@/lib/format"
import { cn } from "@/lib/utils"
import { surfaceClass, tableCellClass, tableHeadingClass } from "@/lib/styles"
import type { ApplicationStatus, JobApplication } from "@/types"

// Columns collapse away on smaller screens instead of squashing the table.
const cellVis = {
  email: "hidden md:table-cell",
  applied: "hidden sm:table-cell",
} satisfies Record<string, string>

/** Review stages a recruiter can move an application between. */
const REVIEW_STATUSES: readonly ApplicationStatus[] = [
  "applied",
  "review",
  "interview",
  "shortlisted",
  "rejected",
]

type ApplicationsTableProps = {
  applications: JobApplication[]
  className?: string
}

/** Review table shared by the per-job applications view. */
export function ApplicationsTable({
  applications,
  className,
}: ApplicationsTableProps) {
  // Optimistic status overrides keyed by application id.
  const [statuses, setStatuses] = useState<Record<string, ApplicationStatus>>(
    {}
  )
  const [savingId, setSavingId] = useState<string | null>(null)

  const changeStatus = async (
    application: JobApplication,
    next: ApplicationStatus
  ) => {
    const previous =
      statuses[application._id] ?? application.status ?? "applied"

    setStatuses((current) => ({ ...current, [application._id]: next }))
    setSavingId(application._id)

    try {
      await updateApplicationStatus(application._id, next)
      toast.add({
        title: "Status updated",
        description: `${application.email} moved to ${next}.`,
      })
    } catch {
      setStatuses((current) => ({ ...current, [application._id]: previous }))
      toast.add({
        title: "Could not update status",
        description: "Please try again.",
      })
    } finally {
      setSavingId(null)
    }
  }

  return (
    <section className={cn(surfaceClass, "overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-140 text-left text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th scope="col" className={cn(tableHeadingClass, "px-5")}>
                Applicant
              </th>
              <th
                scope="col"
                className={cn(tableHeadingClass, cellVis.email, "md:w-[28%]")}
              >
                Email
              </th>
              <th
                scope="col"
                className={cn(tableHeadingClass, cellVis.applied, "sm:w-[16%]")}
              >
                Applied
              </th>
              <th scope="col" className={cn(tableHeadingClass, "sm:w-[16%]")}>
                Status
              </th>
              <th
                scope="col"
                className={cn(tableHeadingClass, "px-5 text-right sm:w-[20%]")}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => {
              const name =
                application.applicantName?.trim() ||
                application.email.split("@")[0] ||
                "Applicant"
              const status =
                statuses[application._id] ?? application.status ?? "applied"

              return (
                <tr
                  key={application._id}
                  className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/3"
                >
                  {/* Applicant */}
                  <td className={cn(tableCellClass, "px-5")}>
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand-soft"
                      >
                        {name.charAt(0).toUpperCase()}
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate font-medium text-ink">
                          {name}
                        </span>
                        <span className="truncate text-xs text-white/50 md:hidden">
                          {application.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className={cn(tableCellClass, cellVis.email)}>
                    <span className="block truncate text-white/80">
                      {application.email}
                    </span>
                  </td>

                  {/* Applied */}
                  <td
                    className={cn(
                      tableCellClass,
                      cellVis.applied,
                      "whitespace-nowrap text-white/70"
                    )}
                  >
                    {formatAppliedAt(application)}
                  </td>

                  {/* Status */}
                  <td className={tableCellClass}>
                    <ApplicationStatusBadge status={status} />
                  </td>

                  {/* Action */}
                  <td className={cn(tableCellClass, "px-5 text-right")}>
                    <div className="flex justify-end">
                      <Select
                        value={status}
                        onValueChange={(next) => {
                          if (next) {
                            void changeStatus(
                              application,
                              next as ApplicationStatus
                            )
                          }
                        }}
                        disabled={savingId === application._id}
                      >
                        <SelectTrigger
                          size="sm"
                          aria-label={`Change status for ${name}`}
                          className="w-32 justify-between border-white/10 bg-surface-raised text-white/80 capitalize"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {REVIEW_STATUSES.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="capitalize"
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
