import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    const clientID = process.env.GOOGLE_CLIENT_ID || "disabled-google-client-id";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "disabled-google-client-secret";
    const callbackURL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:4000/auth/google/callback";

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ["profile", "email"]
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName || "Google User";
    return { email, name };
  }
}
