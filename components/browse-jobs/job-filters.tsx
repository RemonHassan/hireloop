"use client"

import { useState } from "react"

import { FilterGroup } from "@/components/shared/filter-group"
import { surfaceClass } from "@/lib/styles"
import { cn } from "@/lib/utils"
import type { JobFilterField, JobFilterOption } from "@/types"

type JobFiltersProps = {
  jobTypeOptions: readonly JobFilterOption[]
  categoryOptions: readonly JobFilterOption[]
  defaultJobType?: string
  defaultCategory?: string
  onFilterChange?: (field: JobFilterField, value: string) => void
  className?: string
}

/**
 * Browse-jobs filter sidebar. Selections are local only — this component
 * intentionally does not update the URL or search query. Wire `onFilterChange`
 * when URL-backed filtering is ready.
 */
export function JobFilters({
  jobTypeOptions,
  categoryOptions,
  defaultJobType = "",
  defaultCategory = "",
  onFilterChange,
  className,
}: JobFiltersProps) {
  const [jobType, setJobType] = useState(defaultJobType)
  const [category, setCategory] = useState(defaultCategory)

  const handleJobTypeChange = (value: string) => {
    setJobType(value)
    onFilterChange?.("jobType", value)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    onFilterChange?.("category", value)
  }

  return (
    <aside className={cn(surfaceClass, "h-fit p-6", className)}>
      <h2 className="text-xl font-semibold text-white">Filters</h2>

      <div className="mt-6 flex flex-col gap-6">
        <FilterGroup
          title="Job Types"
          name="jobType"
          options={jobTypeOptions}
          value={jobType}
          onValueChange={handleJobTypeChange}
        />
        <FilterGroup
          title="Job Category"
          name="category"
          options={categoryOptions}
          value={category}
          onValueChange={handleCategoryChange}
          listClassName="max-h-64 overflow-y-auto pr-1"
        />
      </div>
    </aside>
  )
}
