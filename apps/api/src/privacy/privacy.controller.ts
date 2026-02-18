import { Controller, Delete, UseGuards } from "@nestjs/common";
import { PrivacyService } from "./privacy.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/guards/roles.decorator";

@Controller("privacy")
export class PrivacyController {
  constructor(private privacyService: PrivacyService) {}

  @UseGuards(JwtAuthGuard)
  @Delete("account")
  deleteAccount(@CurrentUser() user: any) {
    return this.privacyService.deleteAccount(user.userId);
  }
}
