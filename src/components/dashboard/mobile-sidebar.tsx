'use client'

import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button' 
import { useState, useEffect } from 'react'

export const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-zinc-950 border-r-zinc-800">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}