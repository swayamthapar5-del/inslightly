import { Injectable, NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";

@Injectable()
export class BotDetectionMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const userAgent = req.headers["user-agent"] || "";
    if (userAgent.toLowerCase().includes("bot")) {
      req.headers["x-bot-score"] = "0.9";
    } else {
      req.headers["x-bot-score"] = "0.1";
    }
    next();
  }
}
