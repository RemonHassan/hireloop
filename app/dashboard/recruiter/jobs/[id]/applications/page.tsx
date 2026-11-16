import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeft, Inbox } from "lucide-react"

import { ApplicationsTable } from "@/components/recruiter/applications-table"
import { EmptyState } from "@/components/shared/empty-state"
import { JobStatusBadge, JobTypePill } from "@/components/shared/job-badges"
import { PageHeader } from "@/components/shared/page-header"
import { buttonVariants } from "@/components/ui/button"
import { getApplications } from "@/lib/actions/applications"
import { getJobById } from "@/lib/api/jobs"
import { getUsers } from "@/lib/api/user"
import { getSession } from "@/lib/core/server"
import {
  formatCompensation,
  formatDeadline,
  formatJobLocation,
} from "@/lib/format"
import { cn } from "@/lib/utils"
import type { JobApplication } from "@/types"

type JobApplicationsPageProps = {
  params: Promise<{ id: string }>
}

export default async function JobApplicationsPage({
  params,
}: JobApplicationsPageProps) {
  const { id } = await params
  const [session, job] = await Promise.all([getSession(), getJobById(id)])

  if (!job) notFound()
  if (!session?.user.id) redirect("/sign-in")
  // Only the recruiter who owns the post may review its applicants.
  if (job.recruiterId && job.recruiterId !== session.user.id) notFound()

  const [applications, users] = await Promise.all([
    getApplications(`jobId=${encodeURIComponent(id)}`),
    getUsers().catch(() => []),
  ])

  const namesById = new Map(users.map((user) => [user.id, user.name]))
  const rows: JobApplication[] = applications.map((application) => ({
    ...application,
    applicantName: namesById.get(application.userId),
  }))

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/dashboard/recruiter/jobs"
          className="text-white/50 transition-colors hover:text-white"
        >
          Manage Jobs
        </Link>
        <span aria-hidden className="text-white/30">
          /
        </span>
        <span className="max-w-50 truncate text-white/70">{job.title}</span>
        <span aria-hidden className="text-white/30">
          /
        </span>
        <span className="text-white/90">Applications</span>
      </nav>

      <PageHeader
        eyebrow="Applicant review"
        title={job.title}
        description={`${job.companyName} · ${formatJobLocation(job)}`}
        actions={
          <Link
            href="/dashboard/recruiter/jobs"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <ArrowLeft aria-hidden />
            Back to jobs
          </Link>
        }
      />

      {/* Job snapshot */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <JobStatusBadge status={job.status} />
        <JobTypePill type={job.jobType} />
        <span className="text-sm text-white/60">{formatCompensation(job)}</span>
        <span className="text-sm text-white/60">
          Closes {formatDeadline(job.deadline)}
        </span>
      </div>

      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-white/80">Applicants</h2>
        <span className="text-sm text-white/50">
          {rows.length} {rows.length === 1 ? "application" : "applications"}
        </span>
      </div>

      {rows.length > 0 ? (
        <ApplicationsTable applications={rows} />
      ) : (
        <EmptyState
          icon={<Inbox />}
          title="No applications yet"
          description="Candidates who apply to this posting will show up here for review."
        />
      )}
    </div>
  )
}
