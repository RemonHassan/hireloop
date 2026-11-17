"use client"

import { useState } from "react"

import { RoleToggle } from "@/components/admin/role-toggle"
import { RoleBadge } from "@/components/shared/role-badge"
import { formatJoinedDate } from "@/lib/format"
import { cn } from "@/lib/utils"
import { surfaceClass, tableCellClass, tableHeadingClass } from "@/lib/styles"
import type { UserSummary } from "@/lib/api/user"
import type { UserRole } from "@/types"
import { updateUserRole } from "@/lib/actions/users"

// Columns collapse away on smaller screens instead of squashing the table.
const cellVis = {
  joined: "hidden lg:table-cell",
  verified: "hidden md:table-cell",
} satisfies Record<string, string>

type UsersTableProps = {
  users: UserSummary[]
  className?: string
}

/** Directory table with a role switch per account. */
export function UsersTable({ users, className }: UsersTableProps) {
  // Optimistic role overrides keyed by user id.
  const [roles, setRoles] = useState<Record<string, UserRole>>({})

  const handleRoleChange = async (userId: string, role: UserRole) => {
    // TODO: persist the new role once the update endpoint exists
    // (e.g. authClient.admin.updateUser, then notify the parent).

    setRoles((current) => ({ ...current, [userId]: role }))
    const res = await updateUserRole(userId, role)
    console.log("Response after update", res)
  }

  return (
    <section className={cn(surfaceClass, "overflow-hidden", className)}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-5">
        <div>
          <h2 className="text-xl font-semibold text-white">All Users</h2>
          <p className="mt-0.5 text-sm text-white/50">
            Every registered account and its current access level.
          </p>
        </div>
        <span className="text-sm text-white/50">
          {users.length} {users.length === 1 ? "account" : "accounts"}
        </span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-left text-sm">
          <caption className="sr-only">
            Registered users and their roles
          </caption>
          <thead>
            <tr className="border-b border-white/10">
              <th scope="col" className={cn(tableHeadingClass, "px-5")}>
                User
              </th>
              <th
                scope="col"
                className={cn(tableHeadingClass, cellVis.joined, "lg:w-[15%]")}
              >
                Joined
              </th>
              <th
                scope="col"
                className={cn(
                  tableHeadingClass,
                  cellVis.verified,
                  "md:w-[12%]"
                )}
              >
                Verified
              </th>
              <th scope="col" className={cn(tableHeadingClass, "sm:w-[12%]")}>
                Role
              </th>
              <th
                scope="col"
                className={cn(tableHeadingClass, "px-5 sm:w-[26%]")}
              >
                Change role
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const name = user.name?.trim() || user.email || "Unnamed user"
              const role = roles[user.id] ?? user.role ?? "seeker"
              const verified = user.emailVerified ?? false

              return (
                <tr
                  key={user.id}
                  className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/3"
                >
                  {/* User */}
                  <td className={cn(tableCellClass, "px-5")}>
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand-soft"
                      >
                        {name.charAt(0).toUpperCase()}
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate font-medium text-ink">
                          {name}
                        </span>
                        <span className="truncate text-xs text-white/50">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Joined */}
                  <td
                    className={cn(
                      tableCellClass,
                      cellVis.joined,
                      "whitespace-nowrap text-white/70"
                    )}
                  >
                    {formatJoinedDate(user.createdAt)}
                  </td>

                  {/* Verified */}
                  <td className={cn(tableCellClass, cellVis.verified)}>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 text-xs",
                        verified ? "text-emerald-300" : "text-amber-300"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "size-1.5 rounded-full",
                          verified ? "bg-emerald-400" : "bg-amber-400"
                        )}
                      />
                      {verified ? "Verified" : "Pending"}
                    </span>
                  </td>

                  {/* Role */}
                  <td className={tableCellClass}>
                    <RoleBadge role={role} />
                  </td>

                  {/* Change role */}
                  <td className={cn(tableCellClass, "px-5")}>
                    <RoleToggle
                      value={role}
                      onChange={(next) => handleRoleChange(user.id, next)}
                      label={`Change role for ${name}`}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
