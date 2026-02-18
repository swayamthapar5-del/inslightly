import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/guards/roles.decorator";
import { SurveysService } from "./surveys.service";

@Controller("surveys")
export class SurveysController {
  constructor(private surveysService: SurveysService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":campaignId")
  getSurvey(
    @CurrentUser() user: { userId: string; role: Role },
    @Param("campaignId") campaignId: string
  ) {
    return this.surveysService.getQuestions(user, campaignId);
  }
}
