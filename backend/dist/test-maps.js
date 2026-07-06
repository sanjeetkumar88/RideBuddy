"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
async function testMaps() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3004);
    const API_URL = 'http://localhost:3004';
    console.log('Testing Google Maps endpoints...');
    console.log('\\n--- Autocomplete: "Times Square" ---');
    const autocompleteRes = await fetch(`${API_URL}/maps/autocomplete?input=Times%20Square`);
    const autocompleteData = await autocompleteRes.json();
    console.log('Response:', autocompleteData);
    if (autocompleteData.status === 'OK' && autocompleteData.predictions.length > 0) {
        const placeId = autocompleteData.predictions[0].place_id;
        console.log('\\n--- Coordinates for placeId:', placeId, '---');
        const coordRes = await fetch(`${API_URL}/maps/coordinates?placeId=${placeId}`);
        const coordData = await coordRes.json();
        console.log('Coordinates Response:', coordData);
    }
    await app.close();
}
testMaps().catch(console.error);
//# sourceMappingURL=test-maps.js.map