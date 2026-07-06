"use client";

import React, { useState } from 'react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function PartnerLogin() {
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
      router.push('/partner/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Partner Portal"
      subtitle="Sign in to start driving and earning"
      role="driver"
      links={[
        { label: "New driver? |Apply here", href: "/partner/signup" },
        { label: "Looking for a ride? |Rider Login", href: "/login" }
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
          className="w-full h-11 text-base shadow-lg bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25" 
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In as Driver'}
        </Button>
      </form>
    </AuthLayout>
  );
}
