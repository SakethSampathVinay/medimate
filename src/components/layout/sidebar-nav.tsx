'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Bot, 
  Pill, 
  Hospital, 
  CalendarDays, 
  PlaySquare, 
  Siren, 
  UserCircle 
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/health-analysis', label: 'AI Health Analysis', icon: Bot },
  { href: '/medicines', label: 'Medicine Info', icon: Pill },
  { href: '/hospitals', label: 'Hospital Locator', icon: Hospital },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/reels', label: 'Health Reels', icon: PlaySquare },
  { href: '/emergency', label: 'Emergency Aid', icon: Siren },
  { href: '/profile', label: 'My Profile', icon: UserCircle },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')}
              tooltip={item.label}
              asChild={false}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
