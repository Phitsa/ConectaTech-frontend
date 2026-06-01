import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

type SidebarLinkProps = {
  to: string
  icon: LucideIcon
  label: string
  active: boolean
  onNavigate?: () => void
}

export function SidebarLink({ to, icon: Icon, label, active, onNavigate }: SidebarLinkProps) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={`flex items-center gap-3 rounded-lg px-4 py-3 font-body font-semibold transition ${
        active ? 'bg-unp-blue/10 text-unp-blue shadow-sm' : 'text-slate-700 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} className="flex-shrink-0" />
      <span>{label}</span>
      {active && <div className="ml-auto h-2 w-2 rounded-full bg-unp-blue" />}
    </Link>
  )
}
