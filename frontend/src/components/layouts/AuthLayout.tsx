import React from 'react';
import { Car } from 'lucide-react';
import Link from 'next/link';
import { cn } from '../../lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  role: 'rider' | 'partner';
  links: {
    label: string;
    href: string;
  }[];
}

export function AuthLayout({ children, title, subtitle, role, links }: AuthLayoutProps) {
  const isPartner = role === 'partner';
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated background blobs */}
        <div className={cn(
          "absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40 animate-pulse",
          isPartner ? "bg-[var(--accent)]" : "bg-[var(--primary)]"
        )} style={{ animationDuration: '8s' }} />
        <div className={cn(
          "absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40 animate-pulse",
          isPartner ? "bg-[var(--primary)]" : "bg-[var(--accent)]"
        )} style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <Link href="/">
                <div className={cn(
                  "p-3 rounded-xl shadow-lg transition-transform hover:scale-105",
                  isPartner ? "bg-[var(--accent)]" : "bg-[var(--primary)]"
                )}>
                  <Car className="w-8 h-8 text-white" />
                </div>
              </Link>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-2 tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-center opacity-70 mb-8">
              {subtitle}
            </p>

            {children}
            
            <div className="mt-8 flex flex-col gap-2 text-center text-sm">
              {links.map((link, i) => (
                <p key={i} className="opacity-70">
                  {link.label.split('|')[0]}{' '}
                  <Link 
                    href={link.href} 
                    className={cn(
                      "font-semibold hover:underline transition-all",
                      isPartner ? "text-[var(--accent)]" : "text-[var(--primary)]"
                    )}
                  >
                    {link.label.split('|')[1]}
                  </Link>
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-black/5 dark:bg-white/5 p-4 text-center text-xs opacity-60">
            {isPartner ? 'RideBuddy Partner Portal' : 'RideBuddy User Portal'}
          </div>
        </div>
      </div>
    </div>
  );
}
