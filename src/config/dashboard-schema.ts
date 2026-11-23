export type DashboardItem = { id: number; primary: string; secondary: string; tertiary: string; status: string; accent: "lime" | "violet" | "cyan" };

export type DashboardConfig = {
  eyebrow: string; heading: string; summary: string; primaryAction: string; secondaryAction: string; secondaryNotice: string;
  managePermission: string; metricLabel: string;
  metrics: { label: string; value: string; change: string; context: string; tone: "positive" | "warning"; progress: string }[];
  trend: { label: string; value: number }[]; listTitle: string; workspaceAction: string; items: DashboardItem[];
  sideTitle: string; sideSubtitle: string; sideItems: { title: string; detail: string; value: string; warning?: boolean }[];
  insightTitle: string; insightBody: string; insightNotice: string; itemNoun: string; modalEyebrow: string; modalTitle: string;
  formFields: { name: string; label: string; placeholder: string }[]; defaultSecondary: string; defaultTertiary: string;
  newItemStatus: string; policyPreview: string; submitLabel: string;
};
