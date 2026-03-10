import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.subscriptionPlan.upsert({
    where: { name: "Bronze" },
    update: {},
    create: { name: "Bronze", cupsPerMonth: 10, priceMinor: 1200 }
  });
  await prisma.subscriptionPlan.upsert({
    where: { name: "Gold" },
    update: {},
    create: { name: "Gold", cupsPerMonth: 20, priceMinor: 2000 }
  });
  await prisma.subscriptionPlan.upsert({
    where: { name: "Platinum" },
    update: {},
    create: { name: "Platinum", cupsPerMonth: 40, priceMinor: 3200 }
  });

  const adminPassword = await bcrypt.hash("ChangeMe123!", 12);
  await prisma.user.upsert({
    where: { email: "admin@bigcupclub.com" },
    update: {},
    create: {
      email: "admin@bigcupclub.com",
      fullName: "Platform Admin",
      passwordHash: adminPassword,
      role: "ADMIN"
    }
  });

  const ownerPassword = await bcrypt.hash("ChangeMe123!", 12);
  const owner = await prisma.user.upsert({
    where: { email: "owner@bigcupclub.com" },
    update: {},
    create: {
      email: "owner@bigcupclub.com",
      fullName: "Coffee Shop Owner",
      passwordHash: ownerPassword,
      role: "OWNER"
    }
  });

  await prisma.coffeeShop.upsert({
    where: { id: "seed-shop-1" },
    update: {},
    create: {
      id: "seed-shop-1",
      name: "Big Cup Soho",
      ownerId: owner.id,
      status: "APPROVED",
      address: "12 Soho Street, London"
    }
  });
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
