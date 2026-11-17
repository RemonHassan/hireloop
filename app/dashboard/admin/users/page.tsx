import type { ReactNode } from "react"
import { Briefcase, ShieldCheck, UserRound, Users } from "lucide-react"

import { ExportUsersButton } from "@/components/admin/export-users-button"
import { UsersTable } from "@/components/admin/users-table"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { getUsers } from "@/lib/api/user"
import type { UserRole } from "@/types"

const roleCards: readonly {
  role: UserRole
  label: string
  icon: ReactNode
}[] = [
  { role: "seeker", label: "Seekers", icon: <UserRound /> },
  { role: "recruiter", label: "Recruiters", icon: <Briefcase /> },
  { role: "admin", label: "Admins", icon: <ShieldCheck /> },
]

export default async function AdminUsersPage() {
  const users = await getUsers()

  // Accounts created before roles existed default to the signup role.
  const counts: Record<UserRole, number> = { seeker: 0, recruiter: 0, admin: 0 }
  for (const user of users) {
    counts[user.role ?? "seeker"] += 1
  }

  const total = users.length
  const verified = users.filter((user) => user.emailVerified).length
  const share = (count: number) =>
    total === 0 ? "0%" : `${Math.round((count / total) * 100)}%`

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <PageHeader
        eyebrow="Admin"
        title="User Management"
        description="Review every account on the platform and assign access levels."
        actions={<ExportUsersButton users={users} />}
      />

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Users"
          value={total}
          icon={<Users />}
          hint={`${verified} verified`}
        />
        {roleCards.map((card) => (
          <StatCard
            key={card.role}
            label={card.label}
            value={counts[card.role]}
            icon={card.icon}
            hint={share(counts[card.role])}
          />
        ))}
      </section>

      <UsersTable users={users} className="mt-7" />
    </div>
  )
}
