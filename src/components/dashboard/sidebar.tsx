'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  CheckSquare,
  Settings,
} from 'lucide-react'

const routes = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Leads (CRM)',
    icon: Users,
    href: '/dashboard/leads',
  },
  {
    label: 'Payments',
    icon: CreditCard,
    href: '/dashboard/payments',
  },
  {
    label: 'Schedule',
    icon: Calendar,
    href: '/dashboard/schedule',
  },
  {
    label: 'Capture Pages',
    icon: FileText,
    href: '/dashboard/capture',
  },
  {
    label: 'Email System',
    icon: Mail,
    href: '/dashboard/email',
  },
  {
    label: 'Team Chat',
    icon: MessageSquare,
    href: '/dashboard/chat',
  },
  {
    label: 'Tasks',
    icon: CheckSquare,
    href: '/dashboard/tasks',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-zinc-950 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
             {/* Logo SVG - White/Monochrome */}
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">
            StreamLine
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div className="px-3 py-2">
         <Link
            href="/dashboard/settings"
            className={cn(
              "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400"
            )}
          >
            <div className="flex items-center flex-1">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </div>
          </Link>
      </div>
    </div>
  )
}