import * as assert from "node:assert/strict";
import { ForbiddenException } from "@nestjs/common";
import { CampaignStatus, Role } from "@prisma/client";
import { AnalyticsService } from "../src/analytics/analytics.service";
import { CampaignsService } from "../src/campaigns/campaigns.service";
import { SurveysService } from "../src/surveys/surveys.service";

type MockFn<TArgs extends unknown[] = unknown[], TResult = unknown> = ((...args: TArgs) => TResult) & {
  calls: TArgs[];
};

function mockFn<TArgs extends unknown[] = unknown[], TResult = unknown>(
  impl: (...args: TArgs) => TResult
): MockFn<TArgs, TResult> {
  const fn = ((...args: TArgs) => {
    fn.calls.push(args);
    return impl(...args);
  }) as MockFn<TArgs, TResult>;
  fn.calls = [];
  return fn;
}

async function run() {
  await testCampaignsListForUserFiltersActive();
  await testCampaignCreateRequiresCompanyMembership();
  await testCampaignCreateAllowsAdmin();
  await testAnalyticsRejectsNonMemberCompanyUser();
  await testSurveyRejectsInactiveCampaignForUser();
  await testSurveyAllowsCompanyMember();
  console.log("authorization tests passed");
}

async function testCampaignsListForUserFiltersActive() {
  const findMany = mockFn(async (args: unknown) => args);
  const prisma = {
    campaign: { findMany }
  } as any;
  const service = new CampaignsService(prisma);

  await service.list({ userId: "u1", role: Role.USER });

  assert.equal(findMany.calls.length, 1);
  const [query] = findMany.calls[0];
  assert.deepEqual(query, {
    where: { status: CampaignStatus.ACTIVE },
    include: { questions: true }
  });
}

async function testCampaignCreateRequiresCompanyMembership() {
  const prisma = {
    companyMember: { findUnique: mockFn(async () => null) },
    campaign: { create: mockFn(async () => ({ id: "c1" })) }
  } as any;
  const service = new CampaignsService(prisma);

  await assert.rejects(
    () => service.create({ userId: "company-user", role: Role.COMPANY }, { companyId: "co1", title: "x" }),
    (error: unknown) => error instanceof ForbiddenException
  );
}

async function testCampaignCreateAllowsAdmin() {
  const create = mockFn(async () => ({ id: "c1" }));
  const prisma = {
    companyMember: { findUnique: mockFn(async () => null) },
    campaign: { create }
  } as any;
  const service = new CampaignsService(prisma);

  await service.create({ userId: "admin", role: Role.ADMIN }, { companyId: "co1", title: "x" });

  assert.equal(create.calls.length, 1);
}

async function testAnalyticsRejectsNonMemberCompanyUser() {
  const prisma = {
    campaign: { findUnique: mockFn(async () => ({ id: "c1", companyId: "co1" })) },
    companyMember: { findUnique: mockFn(async () => null) },
    response: { findMany: mockFn(async () => []) }
  } as any;
  const service = new AnalyticsService(prisma);

  await assert.rejects(
    () => service.campaignSummary({ userId: "company-user", role: Role.COMPANY }, "c1"),
    (error: unknown) => error instanceof ForbiddenException
  );
}

async function testSurveyRejectsInactiveCampaignForUser() {
  const prisma = {
    campaign: {
      findUnique: mockFn(async () => ({ id: "c1", companyId: "co1", status: CampaignStatus.DRAFT }))
    },
    surveyQuestion: { findMany: mockFn(async () => []) }
  } as any;
  const service = new SurveysService(prisma);

  await assert.rejects(
    () => service.getQuestions({ userId: "user-1", role: Role.USER }, "c1"),
    (error: unknown) => error instanceof ForbiddenException
  );
}

async function testSurveyAllowsCompanyMember() {
  const findMany = mockFn(async () => [{ id: "q1" }]);
  const prisma = {
    campaign: {
      findUnique: mockFn(async () => ({ id: "c1", companyId: "co1", status: CampaignStatus.DRAFT }))
    },
    companyMember: {
      findUnique: mockFn(async () => ({ id: "member-1" }))
    },
    surveyQuestion: { findMany }
  } as any;
  const service = new SurveysService(prisma);

  const result = await service.getQuestions({ userId: "company-user", role: Role.COMPANY }, "c1");
  assert.equal(result.length, 1);
  assert.equal(findMany.calls.length, 1);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
