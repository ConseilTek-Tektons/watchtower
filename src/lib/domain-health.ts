export function assessDomainHealth(openExceptions: number, overdueActions: number, completionPercent: number) {
  const exceptionPressure = Math.max(0, openExceptions) * 5;
  const overduePressure = Math.max(0, overdueActions) * 9;
  const completionPressure = Math.max(0, 90 - completionPercent);
  const risk = Math.min(100, Math.round(exceptionPressure + overduePressure + completionPressure));
  return { risk, level: risk >= 70 ? "critical" : risk >= 35 ? "watch" : "healthy" } as const;
}
