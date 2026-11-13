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

export type CreateApplicationResult = {
  insertedId?: string
  acknowledged?: boolean
}

/** An application as returned by the applications API. */
export type ApplicationRow = ApplicationFormData & {
  _id: string
}
