import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { PrismaService } from './src/prisma/prisma.service';
import { RedisService } from './src/redis/redis.service';
import { RidesService } from './src/rides/rides.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const prisma = app.get(PrismaService);
  const redis = app.get(RedisService);
  const ridesService = app.get(RidesService);

  console.log('--- Starting Concurrency Simulation ---');

  // 1. Setup mock data
  const rider = await prisma.user.create({
    data: { email: `rider_${Date.now()}@test.com`, password: 'pass', roles: ['RIDER'] }
  });

  const drivers = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: { email: `driver${i}_${Date.now()}@test.com`, password: 'pass', roles: ['DRIVER'] }
    });
    const profile = await prisma.driverProfile.create({
      data: { userId: user.id, vehicleModel: 'Test', vehicleColor: 'Red', vehiclePlate: 'TEST-123' }
    });
    drivers.push(profile);
    
    // Add driver location to Redis so they are discoverable
    await ridesService.updateDriverLocation(user.id, { lat: 12.9717, lng: 77.5947 });
  }

  // 2. Request a ride
  const ride = await ridesService.requestRide(rider.id, {
    pickupLat: 12.9716,
    pickupLng: 77.5946,
    dropLat: 12.9719,
    dropLng: 77.5949
  });
  console.log(`✅ Ride Requested: ${ride.id}`);

  // Wait 1 second to ensure searching state is registered
  await new Promise(res => setTimeout(res, 1000));

  // 3. Simulate 5 drivers hitting "accept" AT THE EXACT SAME TIME
  console.log('🚀 5 Drivers attempting to accept simultaneously...');
  
  const promises = drivers.map(async (driver, index) => {
    try {
      const result = await ridesService.acceptRide(driver.userId, ride.id);
      return `[Driver ${index}] Success: ${JSON.stringify(result)}`;
    } catch (e: any) {
      return `[Driver ${index}] Failed: ${e.message}`;
    }
  });

  const results = await Promise.all(promises);
  
  console.log('\\n--- Results ---');
  results.forEach(res => console.log(res));

  const finalRide = await prisma.ride.findUnique({ where: { id: ride.id } });
  console.log(`\\nFinal Ride State in DB: ${finalRide?.status}`);
  console.log(`Assigned Driver ID: ${finalRide?.driverId}`);

  console.log('\\nClosing context...');
  await app.close();
}

bootstrap();
