import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard  } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() input: { username: string; password: string }): Promise<any> {
        return this.authService.authenticate(input);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getProfile(@Request() request) {
        return request.user;
    }
}
