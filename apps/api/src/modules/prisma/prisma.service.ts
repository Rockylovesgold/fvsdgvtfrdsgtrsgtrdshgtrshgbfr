import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      // Allow API to start without DB (e.g. Docker not running); first DB request will fail
      console.warn("Prisma $connect failed (is Postgres running?):", (err as Error).message);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    (this as unknown as { $on(event: string, cb: () => Promise<void>): void }).$on("beforeExit", async () => {
      await app.close();
    });
  }
}
