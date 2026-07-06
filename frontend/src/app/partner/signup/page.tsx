"use client";

import React, { useState } from 'react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Loader2, User, Car } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function PartnerSignup() {
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
    const vehicleModel = formData.get('vehicleModel');

    try {
      await api.post('/auth/register', { 
        email, 
        password, 
        name, 
        role: 'DRIVER',
        vehicleModel
      });
      router.push('/partner/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Become a Partner"
      subtitle="Join our network of premium drivers"
      role="driver"
      links={[
        { label: "Already a partner? |Sign in", href: "/partner/login" },
        { label: "Looking for a ride? |Rider Signup", href: "/signup" }
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
            <Car className="absolute left-3 top-3 h-4 w-4 opacity-50" />
            <Input 
              name="vehicleModel" 
              type="text" 
              placeholder="Vehicle Model (e.g. Toyota Camry)" 
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
          className="w-full h-11 text-base shadow-lg bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25" 
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Apply Now'}
        </Button>
      </form>
    </AuthLayout>
  );
}
