import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2023-10-16"
  });

  constructor(private prisma: PrismaService) {}

  async createPayout(userId: string, amount: number, currency = "usd") {
    const payout = await this.stripe.payouts.create({ amount, currency });

    await this.prisma.payout.create({
      data: {
        userId,
        amount,
        status: "PENDING",
        provider: "stripe",
        providerRef: payout.id
      }
    });

    return payout;
  }

  async handleWebhook(rawBody: Buffer, signature?: string) {
    const secret = process.env.STRIPE_WEBHOOK_SECRET || "";
    const event = this.stripe.webhooks.constructEvent(rawBody, signature || "", secret);

    const existing = await this.prisma.webhookEvent.findUnique({ where: { eventId: event.id } });
    if (existing) {
      return { received: true, duplicate: true };
    }

    await this.prisma.webhookEvent.create({
      data: {
        provider: "stripe",
        eventId: event.id,
        eventType: event.type,
        payload: event as unknown as Record<string, any>
      }
    });

    if (event.type === "payout.paid") {
      const payout = event.data.object as Stripe.Payout;
      await this.prisma.payout.updateMany({
        where: { providerRef: payout.id },
        data: { status: "COMPLETED" }
      });
    }

    if (event.type === "payout.failed") {
      const payout = event.data.object as Stripe.Payout;
      await this.prisma.payout.updateMany({
        where: { providerRef: payout.id },
        data: { status: "FAILED" }
      });
    }

    return { received: true };
  }
}
