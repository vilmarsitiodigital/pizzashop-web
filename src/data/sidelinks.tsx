import { Home, UtensilsCrossed } from 'lucide-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <Home size={18} />,
  },
  {
    title: 'Pedidos',
    label: '',
    href: '/orders',
    icon: <UtensilsCrossed size={18} />,
  },
]
