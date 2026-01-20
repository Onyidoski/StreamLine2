import { createClient } from "@/lib/supabase/server"
import { UserButton } from "@/components/dashboard/user-button"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"

export const Navbar = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex items-center p-4 border-b h-16 bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserButton user={user} />
      </div>
    </div>
  )
}