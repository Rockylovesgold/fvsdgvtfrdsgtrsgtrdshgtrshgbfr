import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { randomUUID } from "crypto";
import type { Request, Response } from "express";
import { PrismaExceptionFilter } from "./common/filters/prisma-exception.filter";
import { assertSecureSecret } from "./common/security";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  validateRequiredEnvironment();
  app.enableCors({
    origin: [
      "http://localhost:3000", "http://localhost:3001", "http://localhost:3002",
      "http://localhost:3100", "http://localhost:3200",
      "http://127.0.0.1:3000", "http://127.0.0.1:3001", "http://127.0.0.1:3002",
      "http://127.0.0.1:3100", "http://127.0.0.1:3200"
    ],
    credentials: true
  });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.use((req: Request, res: Response, next: () => void) => {
    const requestId = (req.headers["x-request-id"] as string | undefined) ?? randomUUID();
    res.setHeader("x-request-id", requestId);
    const startedAt = Date.now();
    res.on("finish", () => {
      const elapsed = Date.now() - startedAt;
      console.info(
        JSON.stringify({
          requestId,
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode,
          elapsedMs: elapsed
        })
      );
    });
    next();
  });
  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();

function validateRequiredEnvironment() {
  const isProduction = process.env.NODE_ENV === "production";
  const requiredEnv = [
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET"
  ] as const;

  for (const key of requiredEnv) {
    try {
      assertSecureSecret(key, process.env[key]);
    } catch {
      if (isProduction) throw new Error(`Missing or insecure env: ${key}. Set secure values before deploying.`);
      console.warn(`[dev] ${key} is missing or insecure. API will start but some features may fail.`);
    }
  }
}
