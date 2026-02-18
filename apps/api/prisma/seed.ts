import { PrismaClient, Role, CampaignStatus, QuestionType } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const demoPasswordHash = await bcrypt.hash("Pass1234!", 10);

  const user = await prisma.user.upsert({
    where: { email: "user@demo.com" },
    update: {
      name: "Avery Chen",
      role: Role.USER,
      interests: ["fintech", "travel", "shopping"],
      passwordHash: demoPasswordHash
    },
    create: {
      email: "user@demo.com",
      name: "Avery Chen",
      role: Role.USER,
      interests: ["fintech", "travel", "shopping"],
      passwordHash: demoPasswordHash
    }
  });

  await prisma.wallet.upsert({
    where: { userId: user.id },
    update: { balance: 12500, currency: "USD" },
    create: { userId: user.id, balance: 12500, currency: "USD" }
  });

  await prisma.consent.create({
    data: { userId: user.id, policyVersion: "2026.01" }
  });

  const companyOwner = await prisma.user.upsert({
    where: { email: "owner@demo.com" },
    update: {
      name: "Morgan Lee",
      role: Role.COMPANY,
      interests: ["research", "product"],
      passwordHash: demoPasswordHash
    },
    create: {
      email: "owner@demo.com",
      name: "Morgan Lee",
      role: Role.COMPANY,
      interests: ["research", "product"],
      passwordHash: demoPasswordHash
    }
  });

  await prisma.wallet.upsert({
    where: { userId: companyOwner.id },
    update: { balance: 0, currency: "USD" },
    create: { userId: companyOwner.id, balance: 0, currency: "USD" }
  });

  let company = await prisma.company.findFirst({ where: { domain: "northstarlabs.com" } });
  if (!company) {
    company = await prisma.company.create({
      data: {
        name: "Northstar Labs",
        domain: "northstarlabs.com",
        plan: "growth"
      }
    });
  }

  await prisma.companyMember.upsert({
    where: {
      companyId_userId: {
        companyId: company.id,
        userId: companyOwner.id
      }
    },
    update: { role: "owner" },
    create: { companyId: company.id, userId: companyOwner.id, role: "owner" }
  });

  const campaign = await prisma.campaign.create({
    data: {
      companyId: company.id,
      title: "Mobile banking trust signals",
      description: "Understand what builds trust for new users",
      status: CampaignStatus.ACTIVE,
      budgetTotal: 150000,
      budgetPerResponse: 500,
      targetFilters: {
        ageRange: "25-40",
        regions: ["US", "CA"],
        interests: ["fintech"]
      },
      questions: {
        create: [
          {
            type: QuestionType.MCQ,
            prompt: "What convinced you to try a new banking app?",
            options: ["Cashback", "Security", "Friend referral", "Design"],
            order: 1
          },
          {
            type: QuestionType.RATING,
            prompt: "Rate the importance of security badges",
            options: [1, 2, 3, 4, 5],
            order: 2
          },
          {
            type: QuestionType.TEXT,
            prompt: "What would you change about onboarding?",
            order: 3
          }
        ]
      }
    }
  });

  await prisma.notification.create({
    data: {
      userId: user.id,
      type: "campaign",
      title: "New feedback opportunity",
      body: `Earn $5 for "${campaign.title}" today.`
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
