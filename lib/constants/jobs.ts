import type { JobFormData, JobType } from "@/types"

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Infrastructure",
  "Quality",
] as const

export const JOB_TYPES: readonly JobType[] = [
  "full-time",
  "part-time",
  "contract",
  "internship",
]

export const SALARY_FREQUENCIES = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
] as const

export const EMPTY_JOB_FORM: JobFormData = {
  title: "",
  companyName: "",
  category: "",
  jobType: "full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  salaryFrequency: "per hour",
  responsibilities: "",
  requirements: "",
  applicants: 0,
  status: "active",
}
