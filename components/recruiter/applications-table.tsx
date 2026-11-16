import { Button } from "@/components/ui/button"
import { ApplicationStatusBadge } from "@/components/shared/application-status-badge"
import { formatAppliedAt } from "@/lib/format"
import { cn } from "@/lib/utils"
import { surfaceClass, tableCellClass, tableHeadingClass } from "@/lib/styles"
import type { JobApplication } from "@/types"

// Columns collapse away on smaller screens instead of squashing the table.
const cellVis = {
  email: "hidden md:table-cell",
  applied: "hidden sm:table-cell",
} satisfies Record<string, string>

const SOON = "Status updates are not wired up yet"

type ApplicationsTableProps = {
  applications: JobApplication[]
  className?: string
}

/** Read-only review table shared by the per-job applications view. */
export function ApplicationsTable({
  applications,
  className,
}: ApplicationsTableProps) {
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
                    <ApplicationStatusBadge status={application.status} />
                  </td>

                  {/* Action — persistence lands with the status API */}
                  <td className={cn(tableCellClass, "px-5 text-right")}>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled
                      title={SOON}
                    >
                      Update status
                    </Button>
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
