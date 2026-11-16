import { getUser } from "@/lib/api/user"
import React from "react"

const AdminUsersPage = async () => {
  const users = await getUser()
  console.log("User", users)
  return (
    <div>
      <h2>Admin users page</h2>
    </div>
  )
}

export default AdminUsersPage
