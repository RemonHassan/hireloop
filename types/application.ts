/**
 * Flat application payload shared by the apply action and the backend.
 * Keys mirror the backend fields (jobId, userId, ...).
 */
export type ApplicationFormData = {
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
}

/** Review stage of an application, as shown in the dashboards. */
export type ApplicationStatus =
  "applied" | "review" | "interview" | "shortlisted" | "offered" | "rejected"

export type CreateApplicationResult = {
  insertedId?: string
  acknowledged?: boolean
}

/** An application as returned by the applications API. */
export type ApplicationRow = ApplicationFormData & {
  _id: string
  /** Missing on older records; treat as `applied`. */
  status?: ApplicationStatus
  /** ISO timestamp, when the backend stored one. */
  createdAt?: string
}

/** An application prepared for the recruiter review table. */
export type JobApplication = ApplicationRow & {
  /** Display name resolved from the users collection, when available. */
  applicantName?: string
}
