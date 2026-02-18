import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  markRead(userId: string, id: string) {
    return this.prisma.notification.update({
      where: { id, userId },
      data: { readAt: new Date() }
    });
  }
}
