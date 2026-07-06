import Link from "next/link";
import { Car, MapPin, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[var(--primary)] blur-[150px] opacity-20 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[var(--accent)] blur-[150px] opacity-20 animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <header className="relative z-10 p-6 glass border-b border-b-[var(--card-border)] rounded-none">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[var(--primary)] rounded-lg shadow-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">RideBuddy</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/login" className="hover:text-[var(--primary)] transition-colors">
              User Login
            </Link>
            <Link href="/partner/login" className="px-4 py-2 bg-[var(--accent)] text-white rounded-full shadow hover:opacity-90 transition-all">
              Driver Partner
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
            Go anywhere with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
              RideBuddy
            </span>
          </h1>
          
          <p className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto">
            The smartest way to move around the city. Whether you need a ride or want to earn on your own schedule, we've got you covered.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            {/* Rider CTA */}
            <div className="glass p-8 rounded-3xl text-left w-full sm:w-[320px] shadow-xl transition-transform hover:-translate-y-2 group">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Need a ride?</h3>
              <p className="text-sm opacity-70 mb-6 min-h-[60px]">
                Request a ride, hop in, and go. Fast pickups and low prices.
              </p>
              <Link href="/signup" className="flex items-center gap-2 text-[var(--primary)] font-semibold group-hover:gap-4 transition-all">
                Sign up to ride <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Partner CTA */}
            <div className="glass p-8 rounded-3xl text-left w-full sm:w-[320px] shadow-xl transition-transform hover:-translate-y-2 group border-[var(--accent)]/30">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-6">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Want to drive?</h3>
              <p className="text-sm opacity-70 mb-6 min-h-[60px]">
                Be your own boss. Drive when you want, earn what you need.
              </p>
              <Link href="/partner/signup" className="flex items-center gap-2 text-[var(--accent)] font-semibold group-hover:gap-4 transition-all">
                Become a partner <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 rounded-full bg-black/5 dark:bg-white/5">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-lg">Fast Pickups</h4>
            <p className="text-sm opacity-70">Average pickup time of less than 5 minutes anywhere in the city.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 rounded-full bg-black/5 dark:bg-white/5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-lg">Safe & Secure</h4>
            <p className="text-sm opacity-70">All our partners undergo rigorous background checks for your safety.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 rounded-full bg-black/5 dark:bg-white/5">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-lg">Everywhere</h4>
            <p className="text-sm opacity-70">Operating in over 500 cities worldwide and constantly expanding.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-sm opacity-50 mt-16">
        &copy; {new Date().getFullYear()} RideBuddy Technologies Inc.
      </footer>
    </div>
  );
}
