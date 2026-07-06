"use client";

import React, { useState } from 'react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import api from '@/lib/api';

export default function RiderLogin() {
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

    try {
      await api.post('/auth/login', { email, password });
      // Redirect to the rider dashboard after successful login
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your details to access your rider account"
      role="rider"
      links={[
        { label: "Don't have an account? |Sign up", href: "/signup" },
        { label: "Are you a driver? |Partner Login", href: "/partner/login" }
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
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full h-11 text-base shadow-lg shadow-blue-500/25" 
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
        </Button>
      </form>
    </AuthLayout>
  );
}
