import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ResponsesService } from "./responses.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/guards/roles.decorator";

@Controller("responses")
export class ResponsesController {
  constructor(private responsesService: ResponsesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  submit(@CurrentUser() user: any, @Body() body: any) {
    return this.responsesService.submitResponse(user.userId, body);
  }
}
