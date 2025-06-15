'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Stethoscope, Loader2 } from 'lucide-react';

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.6402 9.18273C17.6402 8.56682 17.582 7.95909 17.4748 7.36364H9V10.8109H13.8443C13.6366 11.9727 13.0009 12.9455 12.0461 13.5927V15.8182H14.4559C16.4566 14.0136 17.6402 11.8036 17.6402 9.18273Z" fill="#4285F4" />
    <path d="M9.00001 18C11.4325 18 13.4675 17.1927 14.718 15.8182L12.3082 13.5927C11.5082 14.1473 10.3782 14.5091 9.00001 14.5091C6.9591 14.5091 5.22183 13.0827 4.66183 11.2364H2.15455V13.4618C3.38819 16.0182 5.99546 18 9.00001 18Z" fill="#34A853" />
    <path d="M4.66182 11.2364C4.47818 10.6773 4.36364 10.0864 4.36364 9.47727C4.36364 8.86818 4.47818 8.27727 4.66182 7.71818V5.49273H2.15455C1.45364 6.85909 1 8.13182 1 9.47727C1 10.8227 1.45364 12.0955 2.15455 13.4618L4.66182 11.2364Z" fill="#FBBC05" />
    <path d="M9.00001 4.44545C10.2227 4.44545 11.2918 4.87727 12.0718 5.62364L14.7709 2.92364C13.2145 1.49273 11.2182 0.954545 9.00001 0.954545C5.99546 0.954545 3.38819 2.93182 2.15455 5.49273L4.66182 7.71818C5.22183 5.87182 6.9591 4.44545 9.00001 4.44545Z" fill="#EA4335" />
  </svg>
);

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { signInWithPassword, signUp, signInWithGoogle, error: authError, clearError, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const redirectUrl = searchParams.get('redirect') || '/profile';

  useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  useEffect(() => {
    if (authError) {
      setFormError(authError.message);
      toast({
        title: isSignUpMode ? "Sign Up Failed" : "Login Failed",
        description: authError.message,
        variant: "destructive",
      });
      clearError();
    }
  }, [authError, isSignUpMode, toast, clearError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    let result;
    if (isSignUpMode) {
      result = await signUp({ email, password });
    } else {
      result = await signInWithPassword({ email, password });
    }

    setLoading(false);

    if (!result.error) {
      toast({
        title: isSignUpMode ? "Sign Up Successful!" : "Login Successful!",
        description: isSignUpMode ? "Please check your email if confirmation is required." : "Redirecting...",
        className: "bg-green-500 text-white dark:bg-green-600",
      });
      router.push(redirectUrl);
    }
  };

  const handleGoogleSignInClick = async () => {
    setLoading(true);
    setFormError(null);
    const { error } = await signInWithGoogle();
    setLoading(false);
    if (error) {
      toast({
        title: "Google Sign-In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Stethoscope className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">
            {isSignUpMode ? 'Create an Account' : 'Welcome Back to MediMate'}
          </CardTitle>
          <CardDescription>
            {isSignUpMode ? 'Enter your details to get started.' : 'Log in to access your health dashboard.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={isSignUpMode ? 6 : undefined}
              />
            </div>
            {formError && <p className="text-sm text-destructive">{formError}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignUpMode ? 'Sign Up' : 'Log In'}
            </Button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 flex items-center justify-center gap-2"
              onClick={handleGoogleSignInClick}
              disabled={loading}
            >
              <GoogleLogo />
              Sign in with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            onClick={() => {
              setIsSignUpMode(!isSignUpMode);
              setFormError(null);
            }}
            className="text-sm"
          >
            {isSignUpMode ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
