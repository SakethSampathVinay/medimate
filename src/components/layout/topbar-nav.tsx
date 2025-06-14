'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

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

// Desktop Navigation
export default function TopbarNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-1">
      <TooltipProvider delayDuration={100}>
        {navItems.map((item) => (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9",
                  (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/'))
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </nav>
  );
}

// Mobile Navigation (to be used inside a Sheet)
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1 p-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="block">
          <div
            className={cn(
              "flex items-center space-x-3 p-3 rounded-md text-base font-medium transition-colors",
              (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/'))
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}