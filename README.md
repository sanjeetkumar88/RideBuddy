# RideBuddy

RideBuddy is a full-stack application.

# Vybe Cabs

Vybe Cabs is a comprehensive real-time ride-hailing backend system built with NestJS, Prisma, PostgreSQL, and Redis. It solves the critical engineering problem of preventing race conditions when multiple drivers try to accept the same ride request simultaneously.

## Core Architecture

```mermaid
graph TD
    Rider[Rider App] -->|1. Request Ride| API[NestJS API]
    Driver1[Driver 1] -->|SSE Stream| API
    Driver2[Driver 2] -->|SSE Stream| API
    
    API -->|2. GEOSEARCH Drivers| Redis[(Redis)]
    API -->|3. Create Ride| DB[(PostgreSQL)]
    
    API -.->|4. Stream to Drivers| Driver1
    API -.->|4. Stream to Drivers| Driver2
    
    Driver1 -->|5. Accept Ride| API
    Driver2 -->|5. Accept Ride| API
    
    API -->|6. Atomic Lock (Lua)| Redis
    Redis -->|Success: 1| API
    Redis -->|Fail: 0| API
```

## Setup Instructions

1. **Clone & Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**
   Configure environment variables (`backend/.env`):
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ridebuddy?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="super-secret-key-change-me"
JWT_REFRESH_SECRET="super-refresh-secret-change-me"

# Note: If you do not have a Google Maps API Key, leave this blank!
# The backend will automatically run in "DEMO MODE" and return mock NYC locations.
GOOGLE_MAPS_API_KEY=""
```

3. **Database Migration**
   ```bash
   npx prisma migrate dev
   ```

4. **Start Application**
   ```bash
   npm run start:dev
   ```

> [!WARNING]
> If you started the backend server *before* setting up the `.env` file correctly, you must **restart the server** for the new environment variables to take effect. Otherwise, API calls will return `500 Internal Server Error`.

## API End-to-End Walkthrough (cURL)

Below are the cURL commands to test the full End-to-End flow using real locations in **New York City**.

### 1. Register a Rider
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"rider1@nyc.com", "password":"password123", "role":"RIDER"}' \
  -v
```
*(Look in the response headers for `Set-Cookie: access_token=...`)*

### 2. Register a Driver
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"driver1@nyc.com", "password":"password123", "role":"DRIVER", "vehicleModel":"Toyota", "vehiclePlate":"NYC-1", "vehicleColor":"Yellow"}' \
  -v
```
*(Grab the driver's `access_token` cookie)*

### 3. Update Driver Location (Central Park South)
Simulate the driver being located near Central Park.
```bash
curl -X POST http://localhost:3001/rides/driver/location \
  -H "Content-Type: application/json" \
  -H "Cookie: access_token=YOUR_DRIVER_TOKEN_HERE" \
  -d '{"lat":40.7644, "lng":-73.9730}'
```

### 🧪 3. Running the Verification Scripts (Evaluation Criteria)

As per the evaluation criteria, we have included automated scripts that simulate real-world usage and concurrency. 
You can run these scripts to verify the concurrency locks and the complete E2E flow.

### A. Concurrency Verification Script (Requirement 6)
This script simulates **5 drivers simultaneously accepting the same ride** at the exact same millisecond. 
It proves that only **ONE** driver successfully acquires the Redis lock, and the other 4 fail gracefully.

```bash
cd backend
npm run test:concurrency
```

### B. Full End-to-End Demo Script
This script programmatically simulates the entire user journey: creating a rider, creating a driver, updating the driver's GEO location, requesting a ride, triggering the BullMQ processor, and completing the ride assignment via atomic locks.

```bash
cd backend
npm run test:demo
```

---

## 💻 4. Testing Endpoints via cURL (Requirement 7)

### 4. Rider Requests a Ride (Times Square to Empire State)
The rider is in Times Square (~1.8km from the driver).
```bash
curl -X POST http://localhost:3001/rides/request \
  -H "Content-Type: application/json" \
  -H "Cookie: access_token=YOUR_RIDER_TOKEN_HERE" \
  -d '{"pickupLat":40.7580, "pickupLng":-73.9855, "dropLat":40.7484, "dropLng":-73.9857}'
```
*(This returns a JSON object containing the new `ride.id`)*

### 5. Driver Accepts Ride
Use the `id` from the previous step.
```bash
curl -X POST http://localhost:3001/rides/YOUR_RIDE_ID_HERE/accept \
  -H "Content-Type: application/json" \
  -H "Cookie: access_token=YOUR_DRIVER_TOKEN_HERE"
```
