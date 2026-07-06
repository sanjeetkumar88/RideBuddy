"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const cookieParser = require('cookie-parser');
const TIMES_SQUARE = { lat: 40.7580, lng: -73.9855 };
const EMPIRE_STATE = { lat: 40.7484, lng: -73.9857 };
const CENTRAL_PARK_SOUTH = { lat: 40.7644, lng: -73.9730 };
async function runDemo() {
    console.log('🚀 Booting up temporary API instance on port 3003 for demo...');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    await app.listen(3003);
    const API_URL = 'http://localhost:3003';
    console.log('🗽 Starting End-to-End Vybe Cabs API Demo in New York City...');
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
    await new Promise(res => setTimeout(res, 1500));
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
    }
    else {
        console.log(`❌ Failed to accept ride:`, await acceptRes.json());
    }
    console.log('\\n🎉 End-to-End flow completed successfully!');
    await app.close();
}
runDemo().catch(console.error);
//# sourceMappingURL=demo-e2e.js.map