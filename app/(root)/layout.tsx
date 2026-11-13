import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toast"
import React from "react"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Toaster />
    </div>
  )
}

export default RootLayout
