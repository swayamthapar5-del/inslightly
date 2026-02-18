import { Body, Controller, Get, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CurrentUser } from "../common/guards/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getMe(@CurrentUser() user: any) {
    return this.usersService.getById(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me")
  updateMe(@CurrentUser() user: any, @Body() body: any) {
    return this.usersService.updateProfile(user.userId, body);
  }
}
