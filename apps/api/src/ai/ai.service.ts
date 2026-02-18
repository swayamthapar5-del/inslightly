import { Injectable } from "@nestjs/common";

@Injectable()
export class AiService {
  async summarize(text: string) {
    return `Summary placeholder for: ${text.slice(0, 120)}`;
  }

  async sentiment(text: string) {
    if (!text) return 0;
    const lower = text.toLowerCase();
    if (lower.includes("love") || lower.includes("great")) return 0.8;
    if (lower.includes("bad") || lower.includes("hate")) return -0.6;
    return 0.1;
  }
}
