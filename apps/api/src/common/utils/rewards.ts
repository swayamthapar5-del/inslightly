export function calculateRewardCents(budgetPerResponse: number, qualityScore = 1) {
  const base = budgetPerResponse;
  const multiplier = Math.max(0.7, Math.min(qualityScore, 1.3));
  return Math.round(base * multiplier);
}
