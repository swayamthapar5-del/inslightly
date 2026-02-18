import { Controller, Get, UseGuards } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/guards/roles.decorator";

@Controller("wallet")
export class WalletController {
  constructor(private walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getWallet(@CurrentUser() user: any) {
    return this.walletService.getWallet(user.userId);
  }
}
