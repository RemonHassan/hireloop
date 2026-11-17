const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"
export const updateUserRole = async (
  userId: string,
  role: "seeker" | "recruiter" | "admin"
) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  })

  if (!response.ok) {
    throw new Error(`Failed to update role: ${response.status}`)
  }

  return await response.json()
}
