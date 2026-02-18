import { Body, Controller, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/guards/roles.decorator";
import type { Request } from "express";

@Controller("payments")
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("payout")
  createPayout(@CurrentUser() user: any, @Body() body: { amount: number; currency?: string }) {
    return this.paymentsService.createPayout(user.userId, body.amount, body.currency || "usd");
  }

  @Post("webhook")
  handleWebhook(@Req() req: Request, @Headers("stripe-signature") signature?: string) {
    return this.paymentsService.handleWebhook(req.body as Buffer, signature);
  }
}
