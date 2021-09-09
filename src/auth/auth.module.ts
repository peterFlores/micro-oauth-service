import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientService } from './client.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: 'prueba123',
      signOptions: { expiresIn: '60s'}
    })
  ],
  providers: [AuthService, ClientService],
  controllers: [AuthController]
})
export class AuthModule {}
