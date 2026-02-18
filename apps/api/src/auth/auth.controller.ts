import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/guards/roles.decorator";
import type { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  register(@Body() body: { email: string; password: string; name: string }) {
    return this.authService.register(body.email, body.password, body.name);
  }

  @Post("login")
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post("google")
  google(@Body() body: { email: string; name: string }) {
    return this.authService.googleLogin(body);
  }

  @UseGuards(AuthGuard("google"))
  @Get("google/redirect")
  googleRedirect() {
    return { status: "redirecting" };
  }

  @UseGuards(AuthGuard("google"))
  @Get("google/callback")
  async googleCallback(@Req() req: Request) {
    const profile = req.user as { email: string; name: string };
    return this.authService.googleLogin(profile);
  }

  @Post("refresh")
  refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(@CurrentUser() user: any, @Body() body: { refreshToken: string }) {
    return this.authService.revokeRefreshToken(user.userId, body.refreshToken);
  }
}
