import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findMe(@Req() req) {
    return this.usersService.findMe(req.user.userId);
  }

  @Patch('me')
  update(@Req() req, @Body() dto: UpdateUserDto) {
    return this.usersService.update(req.user.userId, dto);
  }

  @Delete('me')
  remove(@Req() req) {
    return this.usersService.remove(req.user.userId);
  }
}
