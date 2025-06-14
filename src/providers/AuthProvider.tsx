
'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import type { Session, User, AuthError, SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const getSession = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        setError(sessionError);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = async (credentials: SignInWithPasswordCredentials) => {
    setIsLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword(credentials);
    if (signInError) setError(signInError);
    setIsLoading(false);
    return { error: signInError };
  };

  const signUp = async (credentials: SignUpWithPasswordCredentials) => {
    setIsLoading(true);
    setError(null);
    // Supabase's signUp might automatically sign in the user or require email confirmation
    // based on your Supabase project settings.
    const { data, error: signUpError } = await supabase.auth.signUp(credentials);
     if (signUpError) setError(signUpError);
    setIsLoading(false);
    return { error: signUpError };
  };

  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError(signOutError);
    setUser(null);
    setSession(null);
    setIsLoading(false);
    router.push('/'); // Redirect to home page after logout
    return { error: signOutError };
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    const { error: googleSignInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/profile` // Or wherever you want them to land after Google auth
      }
    });
    if (googleSignInError) setError(googleSignInError);
    setIsLoading(false);
    return { error: googleSignInError };
  };

  const clearError = () => {
    setError(null);
  };
  
  const value = {
    user,
    session,
    isLoading,
    error,
    signInWithPassword,
    signUp,
    signOut,
    signInWithGoogle,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
