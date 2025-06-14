
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bot, 
  Pill, 
  Hospital, 
  CalendarDays, 
  PlaySquare, 
  Siren,
  LayoutDashboard, // Keep for explicit mobile link if ever needed, but not in main navItems
  UserCircle // Keep for explicit mobile link if ever needed
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Main navigation items, excluding Dashboard and Profile
const navItems = [
  { href: '/health-analysis', label: 'AI Analysis', icon: Bot },
  { href: '/medicines', label: 'Medicines', icon: Pill },
  { href: '/hospitals', label: 'Hospitals', icon: Hospital },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/reels', label: 'Reels', icon: PlaySquare },
  { href: '/emergency', label: 'Emergency', icon: Siren },
];

// Desktop Navigation
export default function TopbarNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5"> {/* Adjusted spacing for text */}
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="ghost"
          className={cn(
            "px-3 py-2 text-sm font-medium h-auto", // Ensure button height accommodates text
            (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/'))
              ? "bg-accent text-accent-foreground"
              : "text-foreground hover:bg-accent/10 hover:text-primary"
          )}
        >
          <Link href={item.href} className="flex items-center gap-1.5"> {/* Reduced gap slightly */}
            <item.icon className="h-4 w-4 flex-shrink-0" /> {/* Slightly smaller icon for balance */}
            <span>{item.label}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );
}

// Mobile Navigation (to be used inside a Sheet)
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1 p-4">
      {/* Explicit Dashboard link for mobile convenience */}
      <Link href="/" className="block">
          <div 
            className={cn(
              "flex items-center space-x-3 p-3 rounded-md text-base font-medium transition-colors",
              (pathname === '/')
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </div>
        </Link>

      {navItems.map((item) => (
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
            {/* Mobile nav can use the full label from navItems if desired, or a more descriptive one */}
            <span>{item.label === 'AI Analysis' ? 'AI Health Analysis' : item.label === 'Reels' ? 'Health Reels' : item.label === 'Emergency' ? 'Emergency Aid' : item.label}</span>
          </div>
        </Link>
      ))}
      
      {/* Explicit Profile link for mobile convenience */}
      <Link href="/profile" className="block">
        <div
          className={cn(
            "flex items-center space-x-3 p-3 rounded-md text-base font-medium transition-colors",
            (pathname === '/profile')
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <UserCircle className="h-5 w-5" />
          <span>My Profile</span>
        </div>
      </Link>
    </nav>
  );
}
