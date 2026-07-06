import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { AuthService } from './src/auth/auth.service';

async function debug() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);
  try {
    const res = await authService.register({
      email: `test_${Date.now()}@test.com`,
      password: 'password123',
      role: 'RIDER' as any
    });
    console.log('Success:', res);
  } catch (err: any) {
    console.error('Error in authService.register:', err);
  }
  await app.close();
}
debug();
