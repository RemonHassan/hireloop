export type JobType = "full-time" | "part-time" | "contract" | "internship"

export type JobStatus = "active" | "expired"

/**
 * Flat job payload shared by the create form, the API actions, and listings.
 * Keys mirror the backend fields (isRemote, deadline, minSalary, ...).
 */
export type JobFormData = {
  title: string
  companyName: string
  category: string
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
  applicants: number
  status: JobStatus
}

/** A job as returned by the listings API. */
export type JobRow = JobFormData & {
  _id: string

  /** Relativized post date, e.g. "Posted 4d ago". */
  posted: string
}

/** Job fields that can be used to filter the browse-jobs listing. */
export type JobFilterField = Extract<keyof JobFormData, "jobType" | "category">

export type JobFilterOption = {
  /** Matches the corresponding `JobFormData[JobFilterField]` value. */
  value: string
  label: string
  count?: number
}

export type CreateJobResult = {
  insertedId?: string
  acknowledged?: boolean
}

export type DeleteJobResult = {
  deletedCount?: number
  acknowledged?: boolean
}
