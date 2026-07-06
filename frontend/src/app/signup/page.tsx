"use client";

import React, { useState } from 'react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Loader2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

import api from '@/lib/api';

export default function RiderSignup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    try {
      await api.post('/auth/register', { email, password, name, role: 'RIDER' });
      // Redirect to the rider dashboard after successful registration (auto-login happens behind the scenes as backend returns cookies)
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up to start riding with us"
      role="rider"
      links={[
        { label: "Already have an account? |Sign in", href: "/login" },
        { label: "Want to drive with us? |Partner Signup", href: "/partner/signup" }
      ]}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 opacity-50" />
            <Input 
              name="name" 
              type="text" 
              placeholder="Full name" 
              className="pl-9" 
              required 
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 opacity-50" />
            <Input 
              name="email" 
              type="email" 
              placeholder="Email address" 
              className="pl-9" 
              required 
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 opacity-50" />
            <Input 
              name="password" 
              type="password" 
              placeholder="Password" 
              className="pl-9" 
              required 
              minLength={6}
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full h-11 text-base shadow-lg shadow-blue-500/25" 
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
        </Button>
      </form>
    </AuthLayout>
  );
}
