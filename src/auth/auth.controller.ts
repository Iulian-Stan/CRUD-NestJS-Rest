import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthDto, JwtTokenDto } from './model';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'Authentication token', type: JwtTokenDto })
  login(@Body() authDto: AuthDto): Promise<JwtTokenDto> {
    return this.authService.login(authDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  @ApiOperation({ summary: 'Test authorisation' })
  @ApiResponse({ status: 200, description: 'Authorized', type: String })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(): string {
    return "Pass";
  }
}