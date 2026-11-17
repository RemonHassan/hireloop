"use client"

import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { UserSummary } from "@/lib/api/user"

/** Downloads the current directory as CSV, mirroring the dashboard's export CTA. */
export function ExportUsersButton({ users }: { users: UserSummary[] }) {
  const handleExport = () => {
    const header = ["Name", "Email", "Role", "Joined", "Verified"]
    const rows = users.map((user) => [
      user.name,
      user.email,
      user.role ?? "seeker",
      user.createdAt ?? "",
      user.emailVerified ? "Yes" : "No",
    ])

    const csv = [header, ...rows]
      .map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
      )
      .join("\n")

    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    )
    const link = document.createElement("a")
    link.href = url
    link.download = "hireloop-users.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      type="button"
      onClick={handleExport}
      className="bg-white text-black hover:bg-white/90"
    >
      <Download aria-hidden />
      Export Report
    </Button>
  )
}
