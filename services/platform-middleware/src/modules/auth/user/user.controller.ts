import {
  Body,
  Get,
  Param,
  Put,
  Post,
  UseGuards,
  Query,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import {
  Permissions,
  PermissionGuard,
  FirebaseAuthGuard,
} from '@tymlez/backend-libs';
import type {
  IFindResult,
  IMutationResult,
  IUser,
} from '@tymlez/platform-api-interfaces';
import { PERMISSION_SET } from '@tymlez/common-libs';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(FirebaseAuthGuard, PermissionGuard)
export class UserController {
  constructor(private usersService: UserService) {}

  @Permissions(...PERMISSION_SET.USER_MANAGEMENT)
  @Get('/')
  async getUsers(
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<IFindResult<IUser>> {
    return await this.usersService.getUsers(pageSize, page);
  }

  @Permissions(...PERMISSION_SET.USER_MANAGEMENT)
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  @Permissions(...PERMISSION_SET.USER_WRITE_MANAGEMENT)
  @Post('/')
  async createUser(@Body() newUser: CreateUserDto): Promise<IMutationResult> {
    return await this.usersService.createUser(newUser);
  }

  @Permissions(...PERMISSION_SET.USER_WRITE_MANAGEMENT)
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<IMutationResult> {
    return await this.usersService.updateUser(id, updatedUser);
  }

  @Permissions(...PERMISSION_SET.USER_WRITE_MANAGEMENT)
  @Delete('/:id')
  async deleteUsers(@Param('id') id: string): Promise<IMutationResult> {
    return await this.usersService.deleteUser(id);
  }
}
