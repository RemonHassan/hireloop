import type { ReactNode } from "react"

import { Navbar } from "@/components/navbar"

export default function BrowseJobsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
