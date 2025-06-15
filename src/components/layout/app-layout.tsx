
'use client';

import React from 'react';
import TopbarNav, { MobileNav } from './topbar-nav';
import Link from 'next/link';
import { Stethoscope, LogOut, Settings, UserCircle, PanelLeft, LogIn, ShoppingCart } from 'lucide-react'; // Added ShoppingCart
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext'; 
import { useCart } from '@/contexts/CartContext'; // Added useCart
import { Badge } from '@/components/ui/badge'; // Added Badge

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden flex-shrink-0">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-sidebar">
                <div className="p-4 border-b border-sidebar-border">
                  <Link href="/" className="flex items-center gap-2">
                    <Stethoscope className="h-7 w-7 text-sidebar-primary" />
                    <h1 className="text-xl font-headline font-semibold text-sidebar-primary">MediMate</h1>
                  </Link>
                </div>
                <MobileNav />
            </SheetContent>
          </Sheet>

          <Link href="/" className="hidden md:flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-headline font-semibold text-primary">MediMate</h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <TopbarNav /> 
          <CartButton /> 
          <UserMenu />
        </div>
      </header>
      <main className="flex-1 pt-28 p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

function CartButton() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Button variant="ghost" size="icon" asChild className="relative flex-shrink-0">
      <Link href="/profile/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 min-w-[1.25rem] p-0 flex items-center justify-center rounded-full text-xs"
          >
            {totalItems > 9 ? '9+' : totalItems}
          </Badge>
        )}
        <span className="sr-only">View Cart</span>
      </Link>
    </Button>
  );
}


function UserMenu() {
  const { user, signOut, isLoading } = useAuth(); 

  if (isLoading) {
    return (
      <Button variant="ghost" className="relative h-10 w-10 rounded-full flex-shrink-0" disabled>
        <Avatar className="h-9 w-9">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  const displayName = user?.user_metadata?.username || user?.email?.split('@')[0] || "User";
  const fallbackChar = displayName.charAt(0).toUpperCase();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full flex-shrink-0">
          <Avatar className="h-9 w-9">
            {user ? (
              <AvatarImage src="https://placehold.co/100x100.png" alt={displayName} data-ai-hint="user avatar" />
            ) : null}
            <AvatarFallback>{user ? fallbackChar : <UserCircle className="h-6 w-6"/>}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {user ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                {user.email && (
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/cart">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  <span>My Cart</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Log In / Sign Up</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
