"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Briefcase, Calendar, MapPin } from "lucide-react"

import { FormSection } from "@/components/shared/form-section"
import {
  SelectField,
  TextareaField,
  TextField,
} from "@/components/shared/form-fields"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/toast"
import { createJob } from "@/lib/actions/jobs"
import {
  EMPTY_JOB_FORM,
  JOB_CATEGORIES,
  JOB_TYPES,
  SALARY_FREQUENCIES,
} from "@/lib/constants/jobs"
import { brandButtonClass } from "@/lib/styles"
import { cn } from "@/lib/utils"
import type { JobFormData, JobType } from "@/types"

export default function NewJobPage() {
  const [form, setForm] = useState<JobFormData>(() => ({ ...EMPTY_JOB_FORM }))
  const router = useRouter()

  const set =
    <K extends keyof JobFormData>(key: K) =>
    (value: JobFormData[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const jobData: JobFormData = { ...form }
    const result = await createJob(jobData)

    if (result.insertedId) {
      toast.add({
        title: `New Job Created`,
        description: "CREATED!!!!",
      })
      router.push(`/dashboard/recruiter/jobs`)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <PageHeader
        eyebrow="Create New Listing"
        title="Post a New Job"
        description="Fill in the position specifications to attract qualified talent across our network."
      />

      <form
        id="new-job-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <FormSection step={1} title="Basic Information">
          <div className="flex flex-col gap-5">
            <TextField
              id="title"
              name="title"
              label="Job title"
              required
              minLength={3}
              maxLength={80}
              value={form.title}
              onChange={(e) => set("title")(e.target.value)}
              placeholder="e.g. Senior Product Designer"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="companyName"
                name="companyName"
                label="Company name"
                required
                value={form.companyName}
                onChange={(e) => set("companyName")(e.target.value)}
                placeholder="Acme Inc."
                startIcon={<Briefcase />}
              />
              <SelectField
                id="category"
                label="Job category"
                value={form.category}
                onValueChange={set("category")}
                items={JOB_CATEGORIES}
                placeholder="Select a category"
              />
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm text-ink/80">Job type</legend>
              <RadioGroup
                value={form.jobType}
                onValueChange={(value) => set("jobType")(value as JobType)}
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                {JOB_TYPES.map((type) => {
                  const selected = form.jobType === type

                  return (
                    <Label
                      key={type}
                      htmlFor={`job-type-${type}`}
                      className={cn(
                        "flex h-11 cursor-pointer items-center justify-center rounded-lg border text-sm capitalize transition-colors has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-brand/60",
                        selected
                          ? "border-brand bg-brand/15 text-white"
                          : "border-white/10 bg-surface-raised text-white/70 hover:border-white/25 hover:text-white"
                      )}
                    >
                      <RadioGroupItem
                        value={type}
                        id={`job-type-${type}`}
                        className="sr-only"
                      />
                      {type}
                    </Label>
                  )
                })}
              </RadioGroup>
            </fieldset>
          </div>
        </FormSection>

        <FormSection step={2} title="Location, Compensation & Timeline">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-surface-raised p-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="isRemote" className="text-white/90">
                  Remote work allowed
                </Label>
                <p className="text-xs text-white/50">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
              <Switch
                id="isRemote"
                checked={form.isRemote}
                onCheckedChange={(checked) => set("isRemote")(checked)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="location"
                name="location"
                label={
                  <>
                    Job location <span className="text-destructive/70">*</span>
                  </>
                }
                required={!form.isRemote}
                value={form.location}
                onChange={(e) => set("location")(e.target.value)}
                placeholder="e.g. New York, USA"
                startIcon={<MapPin />}
                hint="Required"
              />
              <TextField
                id="deadline"
                name="deadline"
                type="date"
                label="Application deadline"
                value={form.deadline}
                onChange={(e) => set("deadline")(e.target.value)}
                endIcon={<Calendar />}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-[1fr_1fr_auto] sm:items-start">
              <TextField
                id="minSalary"
                name="minSalary"
                type="number"
                min={0}
                required
                placeholder="25"
                label="Min salary / rate"
                value={form.minSalary}
                onChange={(e) => set("minSalary")(e.target.value)}
              />
              <TextField
                id="maxSalary"
                name="maxSalary"
                type="number"
                min={0}
                required
                placeholder="40"
                label="Max salary / rate"
                value={form.maxSalary}
                onChange={(e) => set("maxSalary")(e.target.value)}
              />
              <SelectField
                id="salaryFrequency"
                label="Frequency"
                value={form.salaryFrequency}
                onValueChange={set("salaryFrequency")}
                items={SALARY_FREQUENCIES}
              />
            </div>
          </div>
        </FormSection>

        <FormSection step={3} title="Responsibilities & Requirements">
          <div className="flex flex-col gap-5">
            <TextareaField
              id="responsibilities"
              name="responsibilities"
              label="Key responsibilities"
              required
              rows={5}
              maxLength={2000}
              placeholder="Describe the key responsibilities of the role…"
              value={form.responsibilities}
              onChange={(e) => set("responsibilities")(e.target.value)}
            />
            <TextareaField
              id="requirements"
              name="requirements"
              label="Qualifications & requirements"
              required
              rows={5}
              maxLength={2000}
              placeholder={
                "• 3+ years of experience with…\n• Solid understanding of…"
              }
              value={form.requirements}
              onChange={(e) => set("requirements")(e.target.value)}
            />
          </div>
        </FormSection>

        <section>
          <Button
            type="submit"
            form="new-job-form"
            className={brandButtonClass}
          >
            <Briefcase aria-hidden />
            Publish Job
          </Button>
        </section>
      </form>
    </div>
  )
}
