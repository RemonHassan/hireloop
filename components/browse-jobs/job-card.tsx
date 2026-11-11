"use client"
import { Bookmark, Building2, Clock, MapPin, Tag, Wallet } from "lucide-react"

import { MetaPill } from "@/components/shared/meta-pill"
import {
  formatCompensation,
  formatJobLocation,
  formatJobType,
} from "@/lib/format"
import { surfaceClass } from "@/lib/styles"
import { cn } from "@/lib/utils"
import type { JobRow } from "@/types"
import { useRouter } from "next/navigation"

export function JobCard({ job }: { job: JobRow }) {
  const router = useRouter()
  const handleViewJobDetail = (jobId: string) => {
    router.push(`/browse-jobs/${jobId}`)
  }
  return (
    <article
      onClick={() => handleViewJobDetail(job._id)}
      className={cn(
        surfaceClass,
        "p-5 transition-colors hover:border-white/20 sm:p-6"
      )}
    >
      <div className="flex gap-4">
        <div
          aria-hidden
          className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-surface-raised text-white/30"
        >
          <Building2 className="size-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-white sm:text-xl">
                {job.title}
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-white/45">
                <span className="truncate">{job.companyName}</span>
                <span aria-hidden>•</span>
                <span>{formatJobLocation(job)}</span>
              </p>
            </div>

            <button
              type="button"
              aria-label={`Save ${job.title}`}
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Bookmark className="size-5" aria-hidden />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <MetaPill icon={<Wallet />}>{formatCompensation(job)}</MetaPill>
            <MetaPill icon={<Clock />}>{formatJobType(job.jobType)}</MetaPill>
            <MetaPill icon={<MapPin />}>
              {job.isRemote ? "Remote" : "On-site"}
            </MetaPill>
            <MetaPill icon={<Tag />}>{job.category}</MetaPill>
          </div>
        </div>
      </div>
    </article>
  )
}
