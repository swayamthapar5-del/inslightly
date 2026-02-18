import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getWallet(userId: string) {
    return this.prisma.wallet.findUnique({
      where: { userId },
      include: { transactions: { orderBy: { createdAt: "desc" } } }
    });
  }

  async credit(userId: string, amount: number, metadata: any) {
    const wallet = await this.prisma.wallet.upsert({
      where: { userId },
      create: { userId, balance: amount, currency: "USD" },
      update: { balance: { increment: amount } }
    });

    await this.prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: "EARN",
        amount,
        status: "COMPLETED",
        metadata
      }
    });

    return wallet;
  }
}
