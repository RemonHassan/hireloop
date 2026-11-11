import { SearchX } from "lucide-react"

import { JobCard } from "@/components/browse-jobs/job-card"
import { JobFilters } from "@/components/browse-jobs/job-filters"
import { JobSearchForm } from "@/components/browse-jobs/job-search-form"
import { JobSortSelect } from "@/components/browse-jobs/job-sort-select"
import { EmptyState } from "@/components/shared/empty-state"
import { getJobs } from "@/lib/api/jobs"
import { JOB_TYPES } from "@/lib/constants/jobs"
import { formatJobType } from "@/lib/format"
import type { JobFilterOption, JobRow } from "@/types"
type BrowseJobsSearchParams = {
  [key: string]: string | string[] | undefined
}

/** Search params can be repeated; the UI only needs the first value. */
function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

/** Preserve every URL param when forwarding the request to the jobs API. */
function toQueryString(params: BrowseJobsSearchParams) {
  const search = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((item) => search.append(key, item))
    } else if (value !== undefined) {
      search.set(key, value)
    }
  }

  return search.toString()
}

/**
 * Build single-select filter options and counts from the fetched jobs.
 * `knownValues` are always listed, even when the current results don't use them.
 */
function buildFilterOptions<T extends string>(
  jobs: JobRow[],
  getValue: (job: JobRow) => T,
  getLabel: (value: T) => string = (value) => value,
  knownValues: readonly T[] = []
): JobFilterOption[] {
  const counts = new Map<T, number>()

  for (const value of knownValues) {
    counts.set(value, 0)
  }

  for (const job of jobs) {
    const value = getValue(job)
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  return Array.from(counts, ([value, count]) => ({
    value,
    label: getLabel(value),
    count,
  })).sort((a, b) => a.label.localeCompare(b.label))
}

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<BrowseJobsSearchParams>
}) => {
  const params = await searchParams
  const jobs = await getJobs(toQueryString(params))

  const jobTypeOptions = buildFilterOptions(
    jobs,
    (job) => job.jobType,
    formatJobType,
    JOB_TYPES
  )
  const categoryOptions = buildFilterOptions(jobs, (job) => job.category)

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
      <JobSearchForm defaultValue={firstParam(params.q) ?? ""} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <JobFilters
          jobTypeOptions={jobTypeOptions}
          categoryOptions={categoryOptions}
          defaultJobType={firstParam(params.jobType) ?? ""}
          defaultCategory={firstParam(params.category) ?? ""}
        />

        <section aria-labelledby="results-heading">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h1
              id="results-heading"
              className="text-xl font-semibold text-white"
            >
              Found {jobs.length.toLocaleString("en-US")} Professional{" "}
              {jobs.length === 1 ? "Job" : "Jobs"}
            </h1>

            <div className="flex items-center gap-2 text-sm text-white/45">
              <span>Sort by:</span>
              <JobSortSelect />
            </div>
          </div>

          {jobs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<SearchX />}
              title="No jobs found"
              description="Try a different search term or adjust your filters."
            />
          )}
        </section>
      </div>
    </main>
  )
}

export default BrowseJobsPage
