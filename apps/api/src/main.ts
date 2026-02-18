import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { raw } from "express";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({ origin: true, credentials: true });

  app.use("/payments/webhook", raw({ type: "application/json" }));

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true })
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
}

bootstrap();
