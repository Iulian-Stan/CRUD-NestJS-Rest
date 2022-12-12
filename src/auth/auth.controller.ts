import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto, RegisterDto, JwtTokenDto } from './model';
import { ExceptionsFilter } from '../exceptions/exceptions.filter';

@UseFilters(ExceptionsFilter)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 201, description: 'Users was registered' })
  @ApiResponse({ status: 400, description: 'Could not register' })
  register(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and get access token' })
  @ApiResponse({ status: 201, description: 'Authentication token', type: JwtTokenDto })
  login(@Body() loginDto: LoginDto): Promise<JwtTokenDto> {
    return this.authService.login(loginDto);
  }
}