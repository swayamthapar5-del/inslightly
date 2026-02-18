import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class PrivacyService {
  constructor(private prisma: PrismaService) {}

  async deleteAccount(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date(), email: `deleted-${userId}@example.com` }
    });
    return { status: "queued" };
  }
}
