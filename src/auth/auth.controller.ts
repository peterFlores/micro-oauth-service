import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async login(@Body() auth: Auth): Promise<{ access_token: string }> {
        const { email, password, type } = auth;
        const valid = await this.authService.validateUser(email, password, type);
        if (!valid) {
        throw new UnauthorizedException();
        }
        return await this.authService.generateAccessToken(email, type);
    }
}
