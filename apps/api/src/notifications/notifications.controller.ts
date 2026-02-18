import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/guards/roles.decorator";

@Controller("notifications")
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@CurrentUser() user: any) {
    return this.notificationsService.list(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id/read")
  markRead(@CurrentUser() user: any, @Param("id") id: string) {
    return this.notificationsService.markRead(user.userId, id);
  }
}
