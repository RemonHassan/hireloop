import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JobDetail } from "@/components/browse-jobs/job-detail"
import { getJob } from "@/lib/api/jobs"

type JobDetailsPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: JobDetailsPageProps): Promise<Metadata> {
  const { id } = await params
  const job = await getJob(id)

  if (!job) {
    return { title: "Job not found | HireLoop" }
  }

  return {
    title: `${job.title} at ${job.companyName} | HireLoop`,
    description: `${job.companyName} is hiring a ${job.title}. View the full role, requirements, and compensation details.`,
  }
}

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params
  const job = await getJob(id)

  if (!job) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-300 px-5 py-8 sm:px-8">
      <JobDetail job={job} />
    </main>
  )
}

export default JobDetailsPage
