
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bot, 
  Pill, 
  CalendarDays, 
  PlaySquare, 
  Siren,
  LayoutDashboard, 
  UserCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/health-analysis', label: 'AI Analysis', icon: Bot },
  { href: '/medicines', label: 'Medicines', icon: Pill },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/reels', label: 'Reels', icon: PlaySquare },
  { href: '/emergency', label: 'Emergency', icon: Siren },
];

export default function TopbarNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="ghost"
          className={cn(
            "px-3 py-2 text-sm font-medium h-auto", 
            (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/'))
              ? "bg-accent text-accent-foreground"
              : "text-foreground hover:bg-accent/10 hover:text-primary"
          )}
        >
          <Link href={item.href} className="flex items-center gap-1.5">
            <item.icon className="h-4 w-4 flex-shrink-0" />
            <span>{item.label}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  // Explicit Dashboard and Profile links for mobile, combined with iterated items
  const mobileNavItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard, fullLabel: 'Dashboard' },
    ...navItems.map(item => ({
      ...item,
      fullLabel: item.label === 'AI Analysis' ? 'AI Health Analysis' : 
                 item.label === 'Reels' ? 'Health Reels' : 
                 item.label === 'Emergency' ? 'Emergency Aid' : item.label,
    })),
    { href: '/profile', label: 'My Profile', icon: UserCircle, fullLabel: 'My Profile' },
  ];

  return (
    <nav className="flex flex-col space-y-1 p-4">
      {mobileNavItems.map((item) => (
        <Link key={item.href} href={item.href} className="block">
          <div 
            className={cn(
              "flex items-center space-x-3 p-3 rounded-md text-base font-medium transition-colors",
              (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/'))
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.fullLabel}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}

