import { Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis | null = null;
  private get redis(): Redis | null {
    if (this.client) return this.client;
    try {
      this.client = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        retryStrategy: () => null
      });
      return this.client;
    } catch {
      return null;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return this.redis ? await this.redis.get(key) : null;
    } catch {
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds = 30): Promise<void> {
    try {
      if (this.redis) await this.redis.set(key, value, "EX", ttlSeconds);
    } catch {
      // no-op when Redis unavailable
    }
  }

  async onModuleDestroy() {
    if (this.client) await this.client.quit().catch(() => {});
  }
}
