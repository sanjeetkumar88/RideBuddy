"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Loader2, LogOut, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

type Prediction = {
  place_id: string;
  description: string;
};

export default function RiderDashboard() {
  const router = useRouter();
  
  // State for Pick-up
  const [pickupInput, setPickupInput] = useState('');
  const [pickupPredictions, setPickupPredictions] = useState<Prediction[]>([]);
  const [pickupCoords, setPickupCoords] = useState<{lat: number, lng: number} | null>(null);

  // State for Drop-off
  const [dropoffInput, setDropoffInput] = useState('');
  const [dropoffPredictions, setDropoffPredictions] = useState<Prediction[]>([]);
  const [dropoffCoords, setDropoffCoords] = useState<{lat: number, lng: number} | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [rideStatus, setRideStatus] = useState<'idle' | 'searching' | 'assigned' | 'timeout'>('idle');

  // Debounced search for Autocomplete
  useEffect(() => {
    const fetchPredictions = async (input: string, setter: (data: Prediction[]) => void) => {
      if (input.length < 3) {
        setter([]);
        return;
      }
      try {
        const res = await api.get(`/maps/autocomplete?input=${encodeURIComponent(input)}`);
        if (res.data && res.data.predictions) {
          setter(res.data.predictions);
        }
      } catch (err) {
        console.error('Error fetching predictions:', err);
      }
    };

    const timeout1 = setTimeout(() => fetchPredictions(pickupInput, setPickupPredictions), 500);
    return () => clearTimeout(timeout1);
  }, [pickupInput]);

  useEffect(() => {
    const fetchPredictions = async (input: string, setter: (data: Prediction[]) => void) => {
      if (input.length < 3) {
        setter([]);
        return;
      }
      try {
        const res = await api.get(`/maps/autocomplete?input=${encodeURIComponent(input)}`);
        if (res.data && res.data.predictions) {
          setter(res.data.predictions);
        }
      } catch (err) {
        console.error('Error fetching predictions:', err);
      }
    };

    const timeout2 = setTimeout(() => fetchPredictions(dropoffInput, setDropoffPredictions), 500);
    return () => clearTimeout(timeout2);
  }, [dropoffInput]);

  const selectPlace = async (placeId: string, description: string, type: 'pickup' | 'dropoff') => {
    try {
      const res = await api.get(`/maps/coordinates?placeId=${placeId}`);
      if (type === 'pickup') {
        setPickupInput(description);
        setPickupPredictions([]);
        setPickupCoords(res.data);
      } else {
        setDropoffInput(description);
        setDropoffPredictions([]);
        setDropoffCoords(res.data);
      }
    } catch (err) {
      console.error('Failed to get coordinates', err);
    }
  };

  const handleRequestRide = async () => {
    if (!pickupCoords || !dropoffCoords) return;
    setIsLoading(true);
    setRideStatus('searching');

    try {
      await api.post('/rides/request', {
        pickupLat: pickupCoords.lat,
        pickupLng: pickupCoords.lng,
        dropLat: dropoffCoords.lat,
        dropLng: dropoffCoords.lng,
      });
      // In a real app, we'd listen via WebSockets for the rider too to know when it's accepted.
      // For this demo, we simulate it or just let the driver side show it.
      setTimeout(() => {
        setIsLoading(false);
        setRideStatus('assigned');
      }, 3000);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setRideStatus('idle');
      alert('Failed to request ride');
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-6 text-slate-200">
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Vybe Cabs
        </h1>
        <Button variant="ghost" size="sm" onClick={logout} className="text-slate-400 hover:text-white hover:bg-slate-800">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-6">Where to?</h2>

        <div className="space-y-4">
          {/* Pickup Input */}
          <div className="relative">
            <div className="absolute left-3 top-3.5 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            </div>
            <Input 
              value={pickupInput}
              onChange={(e) => setPickupInput(e.target.value)}
              placeholder="Enter pickup location" 
              className="pl-10 bg-slate-950/50 border-slate-800 focus:border-blue-500/50 h-12"
            />
            {pickupPredictions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                {pickupPredictions.map(p => (
                  <button
                    key={p.place_id}
                    className="w-full text-left px-4 py-3 hover:bg-slate-700 text-sm border-b border-slate-700/50 last:border-0 transition-colors"
                    onClick={() => selectPlace(p.place_id, p.description, 'pickup')}
                  >
                    {p.description}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pl-4 border-l-2 border-dashed border-slate-700 h-6 ml-3 my-1"></div>

          {/* Dropoff Input */}
          <div className="relative">
            <div className="absolute left-3 top-3.5 flex items-center justify-center">
              <Navigation className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
            <Input 
              value={dropoffInput}
              onChange={(e) => setDropoffInput(e.target.value)}
              placeholder="Enter drop-off destination" 
              className="pl-10 bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 h-12"
            />
            {dropoffPredictions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                {dropoffPredictions.map(p => (
                  <button
                    key={p.place_id}
                    className="w-full text-left px-4 py-3 hover:bg-slate-700 text-sm border-b border-slate-700/50 last:border-0 transition-colors"
                    onClick={() => selectPlace(p.place_id, p.description, 'dropoff')}
                  >
                    {p.description}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          {rideStatus === 'idle' && (
            <Button 
              className="w-full h-12 text-lg font-medium shadow-lg shadow-blue-500/25 bg-blue-600 hover:bg-blue-700 transition-all"
              disabled={!pickupCoords || !dropoffCoords || isLoading}
              onClick={handleRequestRide}
            >
              Request Ride
            </Button>
          )}

          {rideStatus === 'searching' && (
            <div className="flex flex-col items-center justify-center py-6 bg-slate-950/50 rounded-xl border border-slate-800 animate-pulse">
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/30 animate-ping"></div>
                <div className="relative bg-slate-900 p-4 rounded-full border border-slate-700">
                  <MapPin className="w-8 h-8 text-blue-400 animate-bounce" />
                </div>
              </div>
              <p className="text-slate-300 font-medium">Finding nearby drivers...</p>
            </div>
          )}

          {rideStatus === 'assigned' && (
            <div className="flex flex-col items-center justify-center py-6 bg-emerald-950/30 rounded-xl border border-emerald-900/50">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-2" />
              <p className="text-emerald-300 font-medium text-lg">Driver is on the way!</p>
              <p className="text-slate-400 text-sm mt-1">Your ride has been accepted.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
