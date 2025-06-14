
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
    router.push('/'); 
    return { error: signOutError };
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    const { error: googleSignInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/profile`
      }
    });
    if (googleSignInError) setError(googleSignInError);
    setIsLoading(false);
    return { error: googleSignInError };
  };

  const updateUserMetadata = async (metadata: { [key: string]: any; }) => {
    setIsLoading(true);
    setError(null);
    const { data, error: updateError } = await supabase.auth.updateUser({ data: metadata });
    if (updateError) {
      setError(updateError);
    } else if (data.user) {
      // Supabase onAuthStateChange should pick this up, but we can explicitly set user if needed
      // setUser(data.user); // This might be redundant if onAuthStateChange is quick
    }
    setIsLoading(false);
    return { error: updateError };
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
    updateUserMetadata,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
