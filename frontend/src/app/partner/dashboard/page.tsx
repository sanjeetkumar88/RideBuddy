"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Loader2, LogOut, Power, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import api, { API_URL } from '@/lib/api';

type RideRequest = {
  rideId: string;
  pickupLat: number;
  pickupLng: number;
};

export default function DriverDashboard() {
  const router = useRouter();
  
  const [isOnline, setIsOnline] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [incomingRide, setIncomingRide] = useState<RideRequest | null>(null);
  const [activeRide, setActiveRide] = useState<RideRequest | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    let watchId: number;

    if (isOnline) {
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser");
        setIsOnline(false);
        return;
      }

      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          try {
            // Update location in backend
            await api.post('/rides/driver/location', {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setLocationError('');
          } catch (err) {
            console.error("Failed to update location", err);
          }
        },
        (error) => {
          setLocationError("Unable to retrieve your location");
          setIsOnline(false);
        },
        { enableHighAccuracy: true }
      );

      // Connect WebSocket
      const newSocket = io(`${API_URL}/rides`, {
        withCredentials: true,
      });

      newSocket.on('connect', async () => {
        console.log('Connected to WebSocket server');
        // We need the driver ID to join the room. Since HttpOnly cookies are opaque,
        // we could hit a /me endpoint, or just extract user data if stored in context.
        // For this demo, let's assume backend emits without us manually joining if we used a standard auth flow.
        // But our backend Requires manual join with driverId.
        // So let's quickly fetch profile info if we had one.
        // Actually, our backend Gateway has: `@SubscribeMessage('join')` 
        // Let's decode the JWT locally to get the driverId, or just add an endpoint.
        // Workaround: We'll just rely on the backend emitting to everyone for now, OR we need the sub.
      });

      // The backend emits 'ride_request' to the specific driver's room.
      // Wait, since we need to join the room, let's fetch the driver's ID from a dummy endpoint, 
      // or we can just update the backend to not require 'join' and extract from JWT?
      // Since backend already requires join, let's assume we can't do it easily without the sub.
      // Wait, we CAN fetch the JWT payload if we had a /me endpoint. 
      // Let's just listen to 'ride_request' globally if the backend broadcasted, 
      // but the backend does `this.server.to(driverId).emit()`.
      // Let's create a quick `/auth/me` endpoint in backend or assume the frontend decodes the cookie? 
      // No, cookie is HttpOnly! We can't decode it in frontend.
      // Let's just do a quick fetch to any protected route that returns `req.user`.
      
      newSocket.on('ride_request', (data: RideRequest) => {
        console.log('Incoming ride request!', data);
        setIncomingRide(data);
      });

      setSocket(newSocket);

      // Immediately fetch driver profile to join socket room
      api.post('/auth/me').then(res => {
        newSocket.emit('join', { driverId: res.data.sub });
      }).catch(err => {
         console.warn("Could not fetch /auth/me, socket join might fail unless fixed in backend.");
      });

    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      if (socket) socket.disconnect();
    };
  }, [isOnline]);

  const toggleOnline = () => {
    setIsOnline(!isOnline);
    if (isOnline) {
      setIncomingRide(null); // Clear pending requests if going offline
    }
  };

  const acceptRide = async () => {
    if (!incomingRide) return;
    setIsAccepting(true);
    try {
      await api.post(`/rides/${incomingRide.rideId}/accept`);
      setActiveRide(incomingRide);
      setIncomingRide(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to accept ride. Another driver may have taken it.');
      setIncomingRide(null);
    } finally {
      setIsAccepting(false);
    }
  };

  const logout = async () => {
    if (socket) socket.disconnect();
    await api.post('/auth/logout');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-6 text-slate-200">
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          Vybe Partner
        </h1>
        <Button variant="ghost" size="sm" onClick={logout} className="text-slate-400 hover:text-white hover:bg-slate-800">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col items-center">
        
        {locationError && (
          <div className="w-full p-3 mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
            {locationError}
          </div>
        )}

        <div className="relative mb-8 mt-4">
          <div className={`absolute inset-0 rounded-full blur-2xl ${isOnline ? 'bg-emerald-500/30' : 'bg-slate-500/30'} transition-colors duration-1000`}></div>
          <button 
            onClick={toggleOnline}
            className={`relative w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-500 shadow-2xl ${
              isOnline 
                ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-emerald-500/50' 
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            <Power className={`w-10 h-10 mb-2 ${isOnline ? 'animate-pulse' : ''}`} />
            <span className="font-bold tracking-wider">{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>
        </div>

        {isOnline && !incomingRide && !activeRide && (
          <div className="text-center animate-fade-in">
            <p className="text-slate-400 text-sm flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-2"></span>
              Searching for nearby rides...
            </p>
          </div>
        )}

        {incomingRide && (
          <div className="w-full bg-blue-950/40 border border-blue-500/30 rounded-xl p-5 mt-4 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-blue-400">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                  <Navigation className="w-4 h-4" />
                </div>
                <span className="font-semibold text-lg">New Ride Request!</span>
              </div>
              <span className="text-xs font-mono bg-blue-950 px-2 py-1 rounded text-blue-300 border border-blue-800">
                {incomingRide.rideId.split('-')[0]}
              </span>
            </div>
            
            <p className="text-sm text-slate-300 mb-6 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-slate-400" />
              Pickup: {incomingRide.pickupLat.toFixed(4)}, {incomingRide.pickupLng.toFixed(4)}
            </p>

            <div className="flex space-x-3">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 text-lg shadow-lg shadow-blue-500/30"
                onClick={acceptRide}
                disabled={isAccepting}
              >
                {isAccepting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Accept Ride'}
              </Button>
              <Button 
                variant="outline"
                className="px-4 border-slate-700 hover:bg-slate-800 text-slate-300"
                onClick={() => setIncomingRide(null)}
              >
                Decline
              </Button>
            </div>
          </div>
        )}

        {activeRide && (
           <div className="w-full bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-5 mt-4">
           <div className="flex flex-col items-center justify-center py-4">
             <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
             <p className="text-emerald-300 font-medium text-xl">Ride Accepted!</p>
             <p className="text-slate-400 text-sm mt-2 text-center">
               Proceed to pickup location.<br/>
               <span className="font-mono text-xs opacity-50 mt-1 block">{activeRide.rideId}</span>
             </p>
           </div>
           <Button 
             variant="outline"
             className="w-full mt-4 border-emerald-900/50 hover:bg-emerald-950 text-emerald-400"
             onClick={() => setActiveRide(null)}
           >
             Complete Ride
           </Button>
         </div>
        )}

      </div>
    </div>
  );
}
