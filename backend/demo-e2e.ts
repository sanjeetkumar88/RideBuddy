import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
const cookieParser = require('cookie-parser');

// Real locations in New York City
const TIMES_SQUARE = { lat: 40.7580, lng: -73.9855 }; // Rider Pickup
const EMPIRE_STATE = { lat: 40.7484, lng: -73.9857 }; // Rider Dropoff
const CENTRAL_PARK_SOUTH = { lat: 40.7644, lng: -73.9730 }; // Driver Location (~1.8km from Times Square)

async function runDemo() {
  console.log('🚀 Booting up temporary API instance on port 3003 for demo...');
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3003);
  const API_URL = 'http://localhost:3003';

  console.log('🗽 Starting End-to-End Vybe Cabs API Demo in New York City...');

  // 1. Create Rider
  console.log('\\n[1] Registering Rider...');
  const riderEmail = `rider_${Date.now()}@nyc.com`;
  const riderRes = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: riderEmail, password: 'password123', role: 'RIDER' })
  });
  const riderData = await riderRes.json();
  if (!riderRes.ok) {
    console.error(`❌ Rider Creation Failed:`, riderData);
    return;
  }
  const riderCookies = riderRes.headers.get('set-cookie');
  const riderTokenMatch = riderCookies?.match(/access_token=([^;]+)/);
  const riderToken = riderTokenMatch ? riderTokenMatch[1] : '';
  console.log(`✅ Rider Created. Token: ${riderToken.substring(0, 20)}...`);

  // 2. Create Driver
  console.log('\\n[2] Registering Driver...');
  const driverEmail = `driver_${Date.now()}@nyc.com`;
  const driverRes = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      email: driverEmail, 
      password: 'password123', 
      role: 'DRIVER',
      vehicleModel: 'Toyota Camry',
      vehiclePlate: 'NYC-TAXI',
      vehicleColor: 'Yellow'
    })
  });
  const driverData = await driverRes.json();
  if (!driverRes.ok) {
    console.error(`❌ Driver Creation Failed:`, driverData);
    return;
  }
  const driverCookies = driverRes.headers.get('set-cookie');
  const driverTokenMatch = driverCookies?.match(/access_token=([^;]+)/);
  const driverToken = driverTokenMatch ? driverTokenMatch[1] : '';
  console.log(`✅ Driver Created. Token: ${driverToken.substring(0, 20)}...`);

  // 3. Driver Updates Location (Central Park South)
  console.log('\\n[3] Driver updating location to Central Park South...');
  const locRes = await fetch(`${API_URL}/rides/driver/location`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': `access_token=${driverToken}`
    },
    body: JSON.stringify({ lat: CENTRAL_PARK_SOUTH.lat, lng: CENTRAL_PARK_SOUTH.lng })
  });
  console.log(`✅ Location Updated: `, await locRes.json());

  // 4. Rider Requests a Ride (From Times Square)
  console.log('\\n[4] Rider requesting ride from Times Square to Empire State Building...');
  const reqRes = await fetch(`${API_URL}/rides/request`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': `access_token=${riderToken}`
    },
    body: JSON.stringify({ 
      pickupLat: TIMES_SQUARE.lat, 
      pickupLng: TIMES_SQUARE.lng,
      dropLat: EMPIRE_STATE.lat,
      dropLng: EMPIRE_STATE.lng
    })
  });
  const ride = await reqRes.json();
  console.log(`✅ Ride Requested. ID: ${ride.id}, Status: ${ride.status}`);

  // Wait 1.5 seconds for backend to process geo-search and notify drivers
  await new Promise(res => setTimeout(res, 1500));

  // 5. Driver Accepts the Ride
  console.log(`\n[5] Driver accepts the ride...`);
  const acceptRes = await fetch(`${API_URL}/rides/${ride.id}/accept`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': `access_token=${driverToken}`
    }
  });
  
  if (acceptRes.ok) {
    console.log(`✅ Ride SUCCESSFULLY assigned to driver!`, await acceptRes.json());
  } else {
    console.log(`❌ Failed to accept ride:`, await acceptRes.json());
  }
  
  console.log('\\n🎉 End-to-End flow completed successfully!');
  await app.close();
}

runDemo().catch(console.error);
