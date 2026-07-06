"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const auth_service_1 = require("./src/auth/auth.service");
async function debug() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const authService = app.get(auth_service_1.AuthService);
    try {
        const res = await authService.register({
            email: `test_${Date.now()}@test.com`,
            password: 'password123',
            role: 'RIDER'
        });
        console.log('Success:', res);
    }
    catch (err) {
        console.error('Error in authService.register:', err);
    }
    await app.close();
}
debug();
//# sourceMappingURL=debug-500.js.map