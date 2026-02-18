import { PrismaClient, Role, CampaignStatus, QuestionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "user@demo.com",
      name: "Avery Chen",
      role: Role.USER,
      interests: ["fintech", "travel", "shopping"],
      wallet: { create: { balance: 12500, currency: "USD" } },
      consents: { create: { policyVersion: "2026.01" } }
    }
  });

  const companyOwner = await prisma.user.create({
    data: {
      email: "owner@demo.com",
      name: "Morgan Lee",
      role: Role.COMPANY,
      interests: ["research", "product"],
      wallet: { create: { balance: 0, currency: "USD" } }
    }
  });

  const company = await prisma.company.create({
    data: {
      name: "Northstar Labs",
      domain: "northstarlabs.com",
      plan: "growth",
      members: { create: [{ userId: companyOwner.id, role: "owner" }] }
    }
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
