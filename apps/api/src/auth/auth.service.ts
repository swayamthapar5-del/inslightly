import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../database/prisma.service";
import bcrypt from "bcrypt";
import crypto from "crypto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(email: string, password: string, name: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        wallet: { create: { balance: 0, currency: "USD" } },
        consents: { create: { policyVersion: "2026.01" } },
        interests: []
      }
    });
    return this.issueTokens(user.id, user.role, user.email);
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user?.passwordHash) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return this.issueTokens(user.id, user.role, user.email);
  }

  async googleLogin(googleProfile: { email: string; name: string }) {
    let user = await this.prisma.user.findUnique({ where: { email: googleProfile.email } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: googleProfile.email,
          name: googleProfile.name,
          wallet: { create: { balance: 0, currency: "USD" } },
          consents: { create: { policyVersion: "2026.01" } },
          interests: []
        }
      });
    }
    return this.issueTokens(user.id, user.role, user.email);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || "change_me"
      }) as { sub: string; role: string; email: string };

      const tokenHash = this.hashToken(refreshToken);
      const stored = await this.prisma.refreshToken.findFirst({
        where: { userId: payload.sub, tokenHash }
      });

      if (!stored || stored.expiresAt < new Date()) {
        throw new UnauthorizedException("Refresh token expired");
      }

      return this.issueTokens(payload.sub, payload.role, payload.email);
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async revokeRefreshToken(userId: string, refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);
    await this.prisma.refreshToken.deleteMany({ where: { userId, tokenHash } });
    return { status: "revoked" };
  }

  private async issueTokens(userId: string, role: string, email: string) {
    const payload = { sub: userId, role, email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || "change_me",
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "14d"
    });

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: this.hashToken(refreshToken),
        expiresAt: this.getExpiryDate(process.env.JWT_REFRESH_EXPIRES_IN || "14d")
      }
    });

    return {
      accessToken,
      refreshToken
    };
  }

  private hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  private getExpiryDate(ttl: string) {
    const match = /^(\d+)([dhm])$/.exec(ttl);
    if (!match) {
      return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    }
    const value = Number(match[1]);
    const unit = match[2];
    const multipliers: Record<string, number> = {
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000
    };
    return new Date(Date.now() + value * multipliers[unit]);
  }
}
