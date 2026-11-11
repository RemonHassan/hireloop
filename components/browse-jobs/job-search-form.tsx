"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { surfaceClass } from "@/lib/styles"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

type JobSearchFormProps = {
  defaultValue?: string
  onSearch?: (query: string) => void
  className?: string
}

export function JobSearchForm({
  defaultValue = "",
  onSearch,
  className,
}: JobSearchFormProps) {
  const router = useRouter()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const query = new FormData(event.currentTarget).get("q")
    // onSearch?.(String(query ?? ""))
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const search = data.searchFeild

    const params = new URLSearchParams()
    params.set("search", search as string)
    router.push(`/browse-jobs?${params.toString()}`)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        surfaceClass,
        "flex flex-col gap-3 bg-surface-deep p-3 sm:flex-row sm:items-center sm:p-4",
        className
      )}
    >
      <div className="relative flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/40"
        />
        <Input
          name="searchFeild"
          type="search"
          defaultValue={defaultValue}
          placeholder="Search by job title, keywords..."
          aria-label="Search by job title, keywords"
          className="h-12 rounded-xl border-white/10 bg-surface pl-11 text-sm text-white placeholder:text-white/35 focus-visible:border-brand/60 focus-visible:ring-brand/30 dark:bg-surface"
        />
      </div>

      <Button
        type="submit"
        className="h-12 shrink-0 rounded-xl bg-white px-7 text-sm font-semibold text-black hover:bg-white/90"
      >
        Search Jobs
      </Button>
    </form>
  )
}
