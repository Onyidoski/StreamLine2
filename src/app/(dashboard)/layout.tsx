import { Navbar } from "@/components/dashboard/navbar"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full relative">
      {/* Desktop Sidebar */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-zinc-950">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <main className="md:pl-72 h-full bg-gray-50">
        <Navbar />
        <div className="h-full p-8">
            {children}
        </div>
      </main>
    </div>
  )
}