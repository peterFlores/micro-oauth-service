import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { ClientService } from './client.service';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private clientService: ClientService) {}

  

    async validateUser(email: string, pass: string, type: string): Promise<boolean> {
      const valid =  await this.clientService.validatePassword(email, pass, type);
      return await lastValueFrom(valid);
    }

    async generateAccessToken(email: string, type: string) {
      const user = await this.clientService.findByEmail(email, type);
      const user2 = await lastValueFrom(user);
      Logger.log(user2);
      const payload: JWTPayload = { 
        userId: user2._id,
        userMail: user2.email, 
        userName: `${user2.first_name} ${user2.last_name}`,
        menu: (type === 'USER') ? user2.menu : [],
        type_user: type
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}
